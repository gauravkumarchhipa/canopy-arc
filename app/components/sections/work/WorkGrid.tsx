"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { workGrid } from "../../../content/pages/work/grid";
import GlowHoverCard from "../../ui/GlowHoverCard";
import { tw } from "../../../lib/tw";
import {
  teamBannerText,
  teamBannerTitle,
} from "../team/team-card-styles";
import {
  workCardBodyGlow,
  workCardBodyGradient,
  workCardBodyPattern,
  workCardCategory,
  workCardImage,
  workCardLink,
  workCardShell,
  workCardSubtitle,
  workCardTag,
  workCardTitle,
} from "./work-card-styles";

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
      </div>

      <div className="mt-10 grid gap-6 overflow-visible p-1 lg:grid-cols-2">
        {items.map((p) => (
          <Link key={p.id} href={p.href} className={workCardShell}>
            <div className={workCardImage}>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25" />
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_65%)] opacity-60 blur-[60px]" />
              <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_65%)] opacity-45 blur-[70px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid h-20 w-20 place-items-center rounded-3xl border border-line bg-background">
                  <span className="text-sm text-muted">{p.category}</span>
                </div>
              </div>
            </div>

            <div className={workCardBodyGlow}>
              <div className={workCardBodyGradient} aria-hidden />
              <div className={workCardBodyPattern} aria-hidden />
              <div className="flex items-center justify-between gap-4">
                <p className={workCardCategory}>{p.category}</p>
                <span className={workCardLink}>View Case Study →</span>
              </div>
              <h3 className={workCardTitle}>{p.title}</h3>
              <p className={workCardSubtitle}>{p.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className={workCardTag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <GlowHoverCard className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl px-6 py-5 sm:flex-row sm:items-center">
        <div>
          <p className={teamBannerTitle}>Have an idea in mind?</p>
          <p className={teamBannerText}>
            Let&apos;s turn your vision into a powerful digital solution.
          </p>
        </div>
        <Link
          href="/contact"
          className={`${tw.headerBtnBase} ${tw.headerBtnPrimary} relative z-1 shrink-0`}
        >
          Let&apos;s Build Together →
        </Link>
      </GlowHoverCard>
    </section>
  );
}
