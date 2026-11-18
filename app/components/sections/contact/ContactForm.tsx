"use client";

import { useState } from "react";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export default function ContactForm({ email }: { email: string }) {
  const [draftPrepared, setDraftPrepared] = useState(false);

  return (
    <form
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      className="contact-panel contact-form"
      aria-label="Project inquiry"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? ""),
        };
        const parsed = Schema.safeParse(payload);
        if (!parsed.success) return;
        const { name, email: replyTo, message } = parsed.data;
        const subject = encodeURIComponent("Canopy Arc project inquiry");
        const body = encodeURIComponent(`Name: ${name}\r\nEmail: ${replyTo}\r\n\r\n${message}`);
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        setDraftPrepared(true);
      }}
    >
      <div className="contact-form-fields">
        <label>
          <span>Name</span>
          <input
            name="name"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Your name"
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="contact-message">
        <span>Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Tell us what you want to build…"
        />
      </label>

      <div className="contact-form-footer">
        <button type="submit" className="contact-submit">
          Open email draft <span aria-hidden="true">→</span>
        </button>
        <p role="status">
          {draftPrepared ? "Review and send the draft in your email app." : "Send the inquiry from your email app."}
        </p>
      </div>
    </form>
  );
}
