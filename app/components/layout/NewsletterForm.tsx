"use client";

import { useState } from "react";
import { IconSend } from "./footer/FooterIcons";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-5 flex items-stretch overflow-hidden rounded-xl border border-line-strong bg-surface"
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
        className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 items-center justify-center border-0 bg-accent px-4 text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-95"
        aria-label="Subscribe"
      >
        {done ? (
          <span className="text-[10px] font-semibold uppercase tracking-wider">OK</span>
        ) : (
          <IconSend />
        )}
      </button>
    </form>
  );
}
