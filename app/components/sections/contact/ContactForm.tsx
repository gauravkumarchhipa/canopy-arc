"use client";

import { useState } from "react";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <form
      className="rounded-3xl border border-line bg-surface p-6 sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? "")
        };
        const ok = Schema.safeParse(payload).success;
        if (!ok) return;
        setStatus("sent");
        setTimeout(() => setStatus("idle"), 3500);
        (e.currentTarget as HTMLFormElement).reset();
      }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs tracking-[0.2em] uppercase text-muted">
            Name
          </span>
          <input
            name="name"
            required
            minLength={2}
            className="mt-2 w-full rounded-2xl border border-line bg-background/60 px-4 py-3 text-sm outline-none focus:border-foreground/30"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-[0.2em] uppercase text-muted">
            Email
          </span>
          <input
            name="email"
            required
            type="email"
            className="mt-2 w-full rounded-2xl border border-line bg-background/60 px-4 py-3 text-sm outline-none focus:border-foreground/30"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="block mt-4">
        <span className="text-xs tracking-[0.2em] uppercase text-muted">
          Message
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          className="mt-2 w-full rounded-2xl border border-line bg-background/60 px-4 py-3 text-sm outline-none focus:border-foreground/30 resize-y"
          placeholder="Tell us what you want to build…"
        />
      </label>

      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button type="submit" className="btn-primary text-sm">
          {status === "sent" ? "Sent ✓" : "Send Message →"}
        </button>
        <p className="text-xs text-muted">
          We reply within 2 working days.
        </p>
      </div>
    </form>
  );
}

