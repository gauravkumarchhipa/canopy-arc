"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { workGrid } from "../../../content/pages/work/grid";

function chipClass(active: boolean) {
  return `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
    active
      ? "border-foreground/20 bg-surface text-foreground"
      : "border-line bg-background text-muted hover:text-foreground hover:bg-surface"
  }`;
}

export default function WorkGrid() {
  const filters = workGrid.filters;
  const [active, setActive] = useState(filters[0]);

  const items = useMemo(() => {
    if (active === filters[0]) return workGrid.projects;
    return workGrid.projects.filter((p) => p.category === active);
  }, [active, filters]);

  return (
    <section className="mx-auto max-w-350 px-6 lg:px-10">
      <div className="flex flex-wrap items-center gap-3">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={chipClass(active === f)}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-surface transition-colors"
          >
            Sort by: Latest
            <span className="opacity-70">▾</span>
          </button>
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        {items.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            className="group rounded-3xl border border-line bg-surface overflow-hidden hover:-translate-y-1 transition-transform"
          >
            <div className="relative h-52 sm:h-60 bg-background/60">
              <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px]" />
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[60px] opacity-60 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_65%)]" />
              <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-[70px] opacity-45 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_65%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-3xl border border-line bg-background grid place-items-center">
                  <span className="text-sm text-muted">{p.category}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs tracking-[0.25em] uppercase text-muted">
                  {p.category}
                </p>
                <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                  View Case Study →
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {p.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-background/60 px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-line bg-surface px-6 py-5 flex items-center justify-between gap-6">
        <div>
          <p className="text-sm text-muted">
            <span className="text-foreground/90 font-medium">
              Have an idea in mind?
            </span>{" "}
            Let&apos;s turn your vision into a powerful digital solution.
          </p>
        </div>
        <a href="/contact" className="btn-primary text-sm px-5 py-2.5">
          Let&apos;s Build Together →
        </a>
      </div>
    </section>
  );
}

