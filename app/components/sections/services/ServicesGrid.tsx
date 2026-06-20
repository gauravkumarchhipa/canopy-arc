"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { servicesGrid } from "../../../content/pages/services/grid";
import {
  filterLabelToSlug,
  resolveServiceFilter,
  SERVICE_FILTER_PARAM,
} from "../../../lib/service-filters";

function chipClass(active: boolean) {
  return `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
    active
      ? "border-foreground/20 bg-surface text-foreground"
      : "border-line bg-background text-muted hover:text-foreground hover:bg-surface"
  }`;
}

function accentGlow(accent: string) {
  const map: Record<string, string> = {
    blue: "rgba(59,130,246,0.45)",
    purple: "rgba(139,92,246,0.40)",
    emerald: "rgba(16,185,129,0.40)",
    red: "rgba(239,68,68,0.35)",
    sky: "rgba(34,211,238,0.35)",
    pink: "rgba(236,72,153,0.35)",
    amber: "rgba(245,158,11,0.35)",
    teal: "rgba(20,184,166,0.35)",
    violet: "rgba(124,58,237,0.32)",
    orange: "rgba(249,115,22,0.34)",
    indigo: "rgba(99,102,241,0.34)",
    slate: "rgba(148,163,184,0.28)",
    lime: "rgba(132,204,22,0.30)",
    cyan: "rgba(6,182,212,0.30)",
    green: "rgba(34,197,94,0.30)",
  };
  return map[accent] ?? "rgba(59,130,246,0.35)";
}

export default function ServicesGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = servicesGrid.filters;

  const filterParam = searchParams.get(SERVICE_FILTER_PARAM);
  const { active, cards } = useMemo(
    () => resolveServiceFilter(filterParam),
    [filterParam]
  );

  const setFilter = useCallback(
    (label: string) => {
      const slug = filterLabelToSlug(label);
      const params = new URLSearchParams(searchParams.toString());

      if (slug === "all") {
        params.delete(SERVICE_FILTER_PARAM);
      } else {
        params.set(SERVICE_FILTER_PARAM, slug);
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <section className="mx-auto max-w-350 px-6 lg:px-10 pb-18 sm:pb-24">
      <div className="flex flex-wrap items-center gap-3">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={chipClass(active === f)}
            onClick={() => setFilter(f)}
            aria-pressed={active === f}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={`/services?${SERVICE_FILTER_PARAM}=${card.id}`}
            className="group relative rounded-2xl border border-line bg-surface p-5 overflow-hidden transition-transform hover:-translate-y-1"
          >
            <div
              className="absolute -top-24 -right-24 h-56 w-56 rounded-full blur-[40px] opacity-70"
              style={{
                background: `radial-gradient(circle at center, ${accentGlow(card.accent)}, transparent 70%)`,
              }}
            />

            <div className="relative flex items-start justify-between gap-4">
              <div className="h-12 w-12 rounded-2xl border border-line bg-background grid place-items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3b82f6] opacity-90" />
              </div>
              <span className="text-xs text-muted rounded-full border border-line px-3 py-1 bg-background/60">
                {card.projects} Projects
              </span>
            </div>

            <h3 className="relative mt-5 font-medium tracking-tight text-foreground">
              {card.title}
            </h3>
            <p className="relative mt-2 text-sm text-muted leading-relaxed">
              {card.subtitle}
            </p>

            <div className="relative mt-5 flex items-center justify-between text-sm">
              <span className="text-muted">{card.tag}</span>
              <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {cards.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">
          No services found for this filter.
        </p>
      ) : null}
    </section>
  );
}
