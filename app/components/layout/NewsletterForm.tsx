"use client";

import { useState } from "react";
import { IconSend } from "./footer/FooterIcons";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="footer-newsletter-form mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
        setTimeout(() => setDone(false), 4000);
      }}
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        aria-label="Your email"
        className="footer-newsletter-input"
      />
      <button type="submit" className="footer-newsletter-submit" aria-label="Subscribe">
        {done ? (
          <span className="text-[10px] font-semibold uppercase tracking-wider">OK</span>
        ) : (
          <IconSend />
        )}
      </button>
    </form>
  );
}
