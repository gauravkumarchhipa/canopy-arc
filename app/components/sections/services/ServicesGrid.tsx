"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { servicesGrid } from "../../../content/pages/services/grid";
import {
  impactStatAccentLine,
  impactStatCard,
  impactStatIconBox,
} from "../home/impact/impact-styles";
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
            className={`group ${impactStatCard} no-underline`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={impactStatIconBox}>
                <span className="h-2.5 w-2.5 rounded-full bg-accent opacity-90" />
              </span>
              <p className="m-0 text-sm leading-none font-semibold tracking-tight text-accent">
                {card.projects} Projects
              </p>
            </div>

            <h3 className="mt-3.5 text-[0.9375rem] leading-snug font-semibold text-foreground transition-colors group-hover:text-accent">
              {card.title}
            </h3>
            <span className={impactStatAccentLine} aria-hidden />
            <p className="m-0 flex-1 text-xs leading-snug text-muted">{card.subtitle}</p>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-muted">{card.tag}</span>
              <span className="text-foreground/70 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-accent">
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
