"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { teamGrid } from "../../../content/pages/team/grid";

function chipClass(active: boolean) {
  return `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
    active
      ? "border-foreground/20 bg-surface text-foreground"
      : "border-line bg-background text-muted hover:text-foreground hover:bg-surface"
  }`;
}

export default function TeamGrid() {
  const filters = teamGrid.filters;
  const [active, setActive] = useState(filters[0]);

  const members = useMemo(() => {
    if (active === filters[0]) return teamGrid.members;
    return teamGrid.members.filter((m) => m.group === active);
  }, [active, filters]);

  return (
    <section className="mx-auto max-w-350 px-6 lg:px-10 pb-18 sm:pb-24">
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
            Sort by: Expertise
            <span className="opacity-70">▾</span>
          </button>
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {members.map((m) => (
          <Link
            key={m.id}
            href={`/team/${m.id}`}
            className="group rounded-2xl border border-line bg-surface p-5 hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-2xl border border-line bg-background grid place-items-center overflow-hidden">
                  <span className="text-sm font-semibold text-foreground/90">
                    {m.avatar}
                  </span>
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500/90 ring-2 ring-background" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground tracking-tight">
                    {m.name}
                  </p>
                  <p className="text-xs text-muted">{m.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-background">
                  in
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-background">
                  ✉
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {m.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-background/60 px-3 py-1 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-surface px-6 py-5 flex items-center justify-between gap-6">
        <div>
          <p className="text-sm text-muted">
            <span className="text-foreground/90 font-medium">
              United by passion.
            </span>{" "}
            Driven by innovation.
          </p>
          <p className="mt-1 text-xs text-muted">
            Our diverse team works together to bring your ideas to life.
          </p>
        </div>
        <a href="/careers" className="btn-primary text-sm px-5 py-2.5">
          Join Our Team →
        </a>
      </div>
    </section>
  );
}

