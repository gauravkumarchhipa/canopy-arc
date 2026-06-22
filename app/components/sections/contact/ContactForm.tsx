"use client";

import { useState } from "react";
import { z } from "zod";
import GlowHoverCard from "../../ui/GlowHoverCard";
import {
  glowHoverCardFooter,
  glowHoverCardInput,
  glowHoverCardLabel,
  glowHoverCardTextarea,
} from "../../ui/glow-card-styles";
import { tw } from "../../../lib/tw";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <GlowHoverCard
      as="form"
      className="p-6 sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? ""),
        };
        const ok = Schema.safeParse(payload).success;
        if (!ok) return;
        setStatus("sent");
        setTimeout(() => setStatus("idle"), 3500);
        (e.currentTarget as HTMLFormElement).reset();
      }}
    >
      <div className="relative z-1 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={glowHoverCardLabel}>Name</span>
          <input
            name="name"
            required
            minLength={2}
            className={glowHoverCardInput}
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className={glowHoverCardLabel}>Email</span>
          <input
            name="email"
            required
            type="email"
            className={glowHoverCardInput}
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="relative z-1 mt-6 block">
        <span className={glowHoverCardLabel}>Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className={glowHoverCardTextarea}
          placeholder="Tell us what you want to build…"
        />
      </label>

      <div className="relative z-1 mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <button type="submit" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary} text-sm`}>
          {status === "sent" ? "Sent ✓" : "Send Message →"}
        </button>
        <p className={glowHoverCardFooter}>We reply within 2 working days.</p>
      </div>
    </GlowHoverCard>
  );
}
