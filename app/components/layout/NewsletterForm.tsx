"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-4 flex items-stretch rounded-full border border-line-strong overflow-hidden bg-surface focus-within:border-accent transition-colors"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
        setTimeout(() => setDone(false), 4000);
      }}
    >
      <input
        type="email"
        required
        placeholder="your email"
        aria-label="Your email"
        className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-muted/60 pl-4 pr-2 py-2.5"
      />
      <button
        type="submit"
        className="shrink-0 px-3.5 text-[10px] uppercase tracking-[0.18em] font-semibold bg-foreground text-background hover:bg-accent transition-colors"
      >
        {done ? "Thanks" : "Join"}
      </button>
    </form>
  );
}
