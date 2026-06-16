"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "../../components/Reveal";
import { PLANS } from "./pricing-data";

const initialSelected =
  PLANS.find((p) => p.highlight)?.name ?? PLANS[0].name;

export default function PlanGridSection() {
  const [selected, setSelected] = useState(initialSelected);

  return (
    <section className="relative pb-12 sm:pb-20 md:pb-28">
      <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
        <Reveal staggerChildren stagger={0.08}>
          <div
            className="grid gap-6 sm:gap-5 md:grid-cols-2 xl:grid-cols-4 pt-6 md:pt-3"
            role="radiogroup"
            aria-label="Choose a plan"
          >
            {PLANS.map((plan) => {
              const isSelected = selected === plan.name;
              return (
                <article
                  key={plan.name}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => setSelected(plan.name)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      setSelected(plan.name);
                    }
                  }}
                  className={`relative flex flex-col rounded-3xl p-6 sm:p-8 cursor-pointer outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent ${
                    isSelected
                      ? "bg-surface-strong border-2 border-accent shadow-[0_30px_60px_-25px_rgba(43,179,163,0.35)] md:scale-[1.02] md:z-10"
                      : "border border-line bg-surface hover:border-line-strong hover:bg-surface-strong hover:-translate-y-1"
                  }`}
                  data-cursor="hover"
                >
                  {plan.highlight && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-[#f2994a] via-[#2bb3a3] to-[#2a2f6b] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-[#14161a] whitespace-nowrap shadow-[0_8px_20px_-8px_rgba(43,179,163,0.6)]"
                      aria-hidden
                    >
                      {plan.tag}
                    </span>
                  )}
                  {!plan.highlight && (
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-4">
                      {plan.tag}
                    </span>
                  )}

                  <h3 className="font-display text-3xl md:text-4xl tracking-tight">
                    {plan.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl md:text-5xl tracking-tight">
                      {plan.price.in}
                    </span>
                    <span className="text-xs text-muted">
                      / {plan.price.period}
                    </span>
                  </div>
                  {plan.price.nri && (
                    <p className="mt-1 text-xs text-muted font-mono">
                      or {plan.price.nri} for international billing
                    </p>
                  )}

                  <p className="mt-5 text-sm text-muted leading-relaxed">
                    {plan.blurb}
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-foreground/85"
                      >
                        <span className="mt-1.5 h-1 w-3 shrink-0 bg-linear-to-r from-[#f2994a] to-[#2a2f6b]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.cta.href}
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-all ${
                      isSelected
                        ? "btn-primary"
                        : "border border-line-strong hover:border-foreground"
                    }`}
                  >
                    {plan.cta.label}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-10 text-center text-xs text-muted tracking-[0.2em] uppercase">
            All prices include 18% GST · Cancel anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}
