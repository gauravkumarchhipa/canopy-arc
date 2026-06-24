"use client";

import Image from "next/image";
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
  workCardDescription,
  workCardExternalBtn,
  workCardHighlight,
  workCardIconBox,
  workCardImage,
  workCardImageGrid,
  workCardImageIcon,
  workCardImageWash,
  workCardLiveLink,
  workCardMeta,
  workCardShell,
  workCardTitle,
} from "./work-card-styles";
import { ExternalLinkIcon } from "./work-product-icons";
import WorkProductIcon from "./WorkProductIcon";

function chipClass(active: boolean) {
  return `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
    active
      ? "border-accent/35 bg-accent/10 text-accent shadow-[0_0_0_1px_rgba(37,99,235,0.12)]"
      : "border-line bg-background text-muted hover:bg-surface hover:text-foreground"
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
        {items.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={workCardShell}
          >
            <div className={workCardImage}>
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <>
                  <div className={workCardImageWash} aria-hidden />
                  <div className={workCardImageGrid} aria-hidden />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={workCardImageIcon}>
                      <WorkProductIcon name={project.icon} />
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className={workCardBodyGlow}>
              <div className={workCardBodyGradient} aria-hidden />
              <div className={workCardBodyPattern} aria-hidden />
              <div className="flex items-start justify-between gap-3">
                <span className={workCardIconBox}>
                  <WorkProductIcon name={project.icon} />
                </span>
                <div className="flex items-center gap-2">
                  {project.highlight ? (
                    <span className={workCardHighlight}>{project.highlight}</span>
                  ) : null}
                  <span className={workCardExternalBtn} aria-hidden>
                    <ExternalLinkIcon />
                  </span>
                </div>
              </div>

              <p className={workCardMeta}>
                {project.category} • {project.year}
              </p>
              <h3 className={workCardTitle}>{project.name}</h3>
              <p className={workCardDescription}>{project.description}</p>
              <span className={workCardLiveLink}>
                Open Live Project
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
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
