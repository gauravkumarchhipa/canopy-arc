"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import type { Vacancy } from "../../../content/pages/careers/vacancies";
import GlowHoverCard from "../../ui/GlowHoverCard";
import {
  glowHoverCardEyebrow,
  glowHoverCardFooter,
  glowHoverCardHeading,
  glowHoverCardInput,
  glowHoverCardLabel,
  glowHoverCardTextarea,
} from "../../ui/glow-card-styles";
import { tw } from "../../../lib/tw";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(1),
  portfolio: z.string().optional(),
  message: z.string().min(20),
});

type Props = {
  vacancies: Vacancy[];
  selectedRoleId?: string;
};

export default function CareersApplicationForm({ vacancies, selectedRoleId }: Props) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [role, setRole] = useState(selectedRoleId ?? "");

  useEffect(() => {
    if (selectedRoleId) setRole(selectedRoleId);
  }, [selectedRoleId]);

  return (
    <GlowHoverCard
      as="form"
      id="apply"
      className="mt-6 scroll-mt-32 p-6 sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          role: String(fd.get("role") ?? ""),
          portfolio: String(fd.get("portfolio") ?? ""),
          message: String(fd.get("message") ?? ""),
        };
        if (!Schema.safeParse(payload).success) return;
        setStatus("sent");
        setTimeout(() => setStatus("idle"), 3500);
        e.currentTarget.reset();
        if (selectedRoleId) setRole(selectedRoleId);
      }}
    >
      <p className={glowHoverCardEyebrow}>Apply now</p>
      <h2 className={`${glowHoverCardHeading} mt-2`}>Send your application</h2>

      <div className="relative z-1 mt-6 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={glowHoverCardLabel}>Name</span>
          <input
            name="name"
            required
            minLength={2}
            className={glowHoverCardInput}
            placeholder="Your full name"
          />
        </label>
        <label className="block">
          <span className={glowHoverCardLabel}>Email</span>
          <input
            name="email"
            required
            type="email"
            className={glowHoverCardInput}
            placeholder="you@email.com"
          />
        </label>
      </div>

      <label className="relative z-1 mt-6 block">
        <span className={glowHoverCardLabel}>Role</span>
        <select
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`${glowHoverCardInput} cursor-pointer appearance-none`}
        >
          <option value="" disabled>
            Select an open role
          </option>
          {vacancies.map((v) => (
            <option key={v.id} value={v.id}>
              {v.title}
            </option>
          ))}
        </select>
      </label>

      <label className="relative z-1 mt-6 block">
        <span className={glowHoverCardLabel}>Portfolio / LinkedIn</span>
        <input
          name="portfolio"
          type="url"
          className={glowHoverCardInput}
          placeholder="https://linkedin.com/in/you"
        />
      </label>

      <label className="relative z-1 mt-6 block">
        <span className={glowHoverCardLabel}>Cover note</span>
        <textarea
          name="message"
          required
          minLength={20}
          rows={5}
          className={glowHoverCardTextarea}
          placeholder="Tell us about your experience and why you'd be a great fit…"
        />
      </label>

      <div className="relative z-1 mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <button type="submit" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary} text-sm`}>
          {status === "sent" ? "Application sent ✓" : "Submit Application →"}
        </button>
        <p className={glowHoverCardFooter}>We review every application within 5 working days.</p>
      </div>
    </GlowHoverCard>
  );
}
