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
import {
  serviceCard,
  serviceCardArrow,
  serviceCardArrowIcon,
  serviceCardGradient,
  serviceCardHeaderAction,
  serviceCardIconBox,
  serviceCardIndex,
  serviceCardMeta,
  serviceCardMetaLink,
  serviceCardPattern,
  serviceCardSubtitle,
  serviceCardTag,
  serviceCardTechTag,
  serviceCardTechTags,
  serviceCardTitle,
} from "./service-card-styles";
import ServiceIcon from "./ServiceIcon";

function formatCardIndex(index: number, total: number) {
  return `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

function formatTechTags(subDomains: string[]) {
  const visible = subDomains.slice(0, 4);
  const remaining = subDomains.length - visible.length;
  return remaining > 0 ? [...visible, `+${remaining} more`] : visible;
}

function ServiceArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={serviceCardArrowIcon}
      aria-hidden
    >
      <path d="M7 17L17 7" strokeLinecap="round" />
      <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ServicesGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = servicesGrid.filters;

  const filterParam = searchParams.get(SERVICE_FILTER_PARAM);
  const totalCards = servicesGrid.cards.length;
  const cardIndexById = useMemo(() => {
    const map = new Map<string, number>();
    servicesGrid.cards.forEach((card, index) => map.set(card.id, index + 1));
    return map;
  }, []);

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
    <section className="mx-auto max-w-350 px-6 lg:px-10">
      <div className="flex flex-wrap items-center gap-3">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className="service-filter-chip"
            onClick={() => setFilter(f)}
            aria-pressed={active === f}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 overflow-visible px-1 pb-2 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.id} href={`/services/${card.id}`} className={serviceCard}>
            <div className={serviceCardGradient} aria-hidden />
            <div className={serviceCardPattern} aria-hidden />
            <div className="relative z-1 flex items-start justify-between gap-3">
              <span className={serviceCardTag}>{card.tag}</span>
              <div className={serviceCardHeaderAction}>
                <span className={serviceCardIndex}>
                  {formatCardIndex(cardIndexById.get(card.id) ?? 1, totalCards)}
                </span>
                <span className={serviceCardArrow} aria-hidden>
                  <ServiceArrowIcon />
                </span>
              </div>
            </div>

            <span className={serviceCardIconBox} aria-hidden>
              <ServiceIcon name={card.icon} />
            </span>
            <h3 className={serviceCardTitle}>{card.title}</h3>
            <p className={serviceCardSubtitle}>{card.subtitle}</p>

            {card.subDomains.length > 0 ? (
              <div className={serviceCardTechTags}>
                {formatTechTags(card.subDomains).map((tag) => (
                  <span key={tag} className={serviceCardTechTag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={serviceCardMeta}>
              <span>{card.projects} Projects</span>
              <span className={serviceCardMetaLink}>
                View service
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
