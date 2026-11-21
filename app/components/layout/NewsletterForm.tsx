"use client";

import Button from "../ui/Button";
import { useState } from "react";
import { IconSend } from "./footer/FooterIcons";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="footer-subscribe-form"
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
        className="min-w-0 flex-1 border-0 bg-transparent px-0 py-4 text-sm text-foreground outline-none placeholder:text-muted"
      />
      <Button variant="unstyled"
        type="submit"
        className="inline-flex shrink-0 items-center justify-center border-0 bg-transparent px-4 text-foreground transition-transform duration-200 hover:translate-x-1"
        aria-label="Subscribe"
      >
        {done ? (
          <span className="text-[10px] font-semibold uppercase tracking-wider">OK</span>
        ) : (
          <IconSend />
        )}
      </Button>
    </form>
  );
}
