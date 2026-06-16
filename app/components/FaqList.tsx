"use client";

import { useState } from "react";
import Eyebrow from "./ui/Eyebrow";

type Item = { q: string; a: string };
type Section = { title: string; items: Item[] };

export default function FaqList({ sections }: { sections: Section[] }) {
  return (
    <section className="relative pb-12 sm:pb-20 md:pb-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="space-y-16 md:space-y-20">
          {sections.map((section) => (
            <div key={section.title}>
              <Eyebrow className="mb-6">{section.title}</Eyebrow>
              <div className="divide-y divide-line border-t border-line">
                {section.items.map((item) => (
                  <FaqItem key={item.q} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ item }: { item: Item }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
        data-cursor="hover"
      >
        <span className="font-display text-xl md:text-2xl tracking-tight">
          {item.q}
        </span>
        <span
          className={`relative shrink-0 mt-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-line-strong transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          <span className="absolute h-px w-3 bg-foreground" />
          <span className="absolute h-3 w-px bg-foreground" />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-base text-muted leading-relaxed max-w-3xl">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}
