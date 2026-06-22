"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GlowHoverCard from "../../ui/GlowHoverCard";
import { teamGrid } from "../../../content/pages/team/grid";
import { tw } from "../../../lib/tw";
import {
  teamBannerText,
  teamBannerTitle,
  teamCardAvatar,
  teamCardAvatarText,
  teamCardName,
  teamCardRole,
  teamCardSocialBtn,
  teamCardStatusDot,
  teamCardTag,
} from "./team-card-styles";

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
            Sort by: Expertise
            <span className="opacity-70">▾</span>
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-5 overflow-visible p-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((m) => (
          <GlowHoverCard
            key={m.id}
            as={Link}
            href={`/team/${m.id}`}
            className="block rounded-2xl p-5 no-underline"
          >
            <div className="relative z-1 flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className={teamCardAvatar}>
                  <span className={teamCardAvatarText}>{m.avatar}</span>
                  <span className={teamCardStatusDot} />
                </div>
                <div className="min-w-0">
                  <p className={teamCardName}>{m.name}</p>
                  <p className={teamCardRole}>{m.role}</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className={teamCardSocialBtn}>in</span>
                <span className={teamCardSocialBtn}>✉</span>
              </div>
            </div>

            <div className="relative z-1 mt-5 flex flex-wrap gap-2">
              {m.tags.slice(0, 3).map((t) => (
                <span key={t} className={teamCardTag}>
                  {t}
                </span>
              ))}
            </div>
          </GlowHoverCard>
        ))}
      </div>

      <GlowHoverCard className="mt-12 flex items-center justify-between gap-6 rounded-2xl px-6 py-5">
        <div>
          <p className={teamBannerTitle}>United by passion. Driven by innovation.</p>
          <p className={teamBannerText}>
            Our diverse team works together to bring your ideas to life.
          </p>
        </div>
        <Link
          href="/careers"
          className={`${tw.headerBtnBase} ${tw.headerBtnPrimary} relative z-1 shrink-0`}
        >
          Join Our Team →
        </Link>
      </GlowHoverCard>
    </section>
  );
}

