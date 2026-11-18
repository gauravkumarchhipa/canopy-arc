"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { servicesGrid } from "../../../content/pages/services/grid";
import ServiceIcon from "./ServiceIcon";
import {
  filterLabelToSlug,
  resolveServiceFilter,
  serviceDetailHref,
  serviceOrbitHref,
  SERVICE_FILTER_PARAM,
  SERVICE_ID_PARAM,
} from "../../../lib/service-filters";

const journeys = [
  { title: "Plan & Define", description: "Turn business goals into a clear digital roadmap.", filter: "All Services" },
  { title: "Design & Experience", description: "Create intuitive and accessible experiences.", filter: "Design" },
  { title: "Build & Integrate", description: "Develop scalable, high-performance solutions.", filter: "Development" },
  { title: "Intelligence & Data", description: "Use AI, analytics, and automation to support better decisions.", filter: "Engineering" },
  { title: "Secure & Operate", description: "Keep systems reliable, secure, and ready to scale.", filter: "Operations" },
];

const cardNumbers = new Map(servicesGrid.cards.map((card, index) => [card.id, String(index + 1).padStart(2, "0")]));
const totalCards = String(servicesGrid.cards.length).padStart(2, "0");
const visibleTagCount = 4;

export default function ServicesGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { active, cards, focusServiceId } = resolveServiceFilter(
    searchParams.get(SERVICE_FILTER_PARAM),
    searchParams.get(SERVICE_ID_PARAM),
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (cardNumbers.has(hash)) router.replace(serviceOrbitHref(hash), { scroll: false });
  }, [router]);

  const setFilter = (label: string) => {
    const slug = filterLabelToSlug(label);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(SERVICE_ID_PARAM);
    if (slug === "all") params.delete(SERVICE_FILTER_PARAM);
    else params.set(SERVICE_FILTER_PARAM, slug);

    const query = params.toString();
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="services-overview-shell services-overview-directory">
      <aside className="services-overview-journey" id="service-journey" aria-labelledby="service-journey-title">
        <h2 id="service-journey-title" className="services-overview-label">The service journey</h2>
        <ol>
          {journeys.map(({ title, description, filter }) => (
            <li key={title}>
              <button type="button" aria-pressed={active === filter && !focusServiceId} onClick={() => setFilter(filter)}>
                <span className="services-overview-step-title">{title}</span>
                <span>{description}</span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
      <section className="services-overview-catalog" id="services-grid" aria-labelledby="service-catalog-title">
        <div className="services-overview-catalog-bar">
          <div>
            <p className="services-overview-label">Our services</p>
            <h2 id="service-catalog-title">Explore Our Service Offerings.</h2>
          </div>
          <div className="services-overview-filters" role="group" aria-label="Filter services">
            {servicesGrid.filters.map((filter) => (
              <button key={filter} type="button" aria-pressed={active === filter} onClick={() => setFilter(filter)}>
                {filter}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status">{cards.length} {cards.length === 1 ? "service" : "services"} shown</p>
        <div className="services-overview-cards">
          {cards.map((card) => {
            const remainingTags = card.subDomains.length - visibleTagCount;
            return (
              <Link
                key={card.id}
                href={serviceDetailHref(card.id)}
                className="services-overview-card"
                data-focused={focusServiceId === card.id || undefined}
                prefetch={false}
              >
                <div className="services-overview-card-header">
                  <span className="services-overview-card-category">
                    <ServiceIcon name={card.icon} className="services-overview-card-icon" />
                    {card.tag}
                  </span>
                  <span className="services-overview-card-index" aria-hidden="true">
                    {cardNumbers.get(card.id)} / {totalCards}
                    <span className="services-overview-card-arrow">↗</span>
                  </span>
                </div>
                <div className="services-overview-card-body">
                  <Image
                    className="services-overview-card-art"
                    src={`/services-art/${card.id}.webp`}
                    alt=""
                    width={350}
                    height={350}
                    sizes="(max-width: 525px) 43vw, (max-width: 1130px) 23vw, 190px"
                  />
                  <div className="services-overview-card-copy">
                    <h3>{card.title}</h3>
                    <p>{card.subtitle}</p>
                  </div>
                </div>
                {card.subDomains.length > 0 && (
                  <ul className="services-overview-card-tags" aria-label="Technologies and capabilities">
                    {card.subDomains.slice(0, visibleTagCount).map((tag) => <li key={tag}>{tag}</li>)}
                    {remainingTags > 0 && <li>+{remainingTags} more</li>}
                  </ul>
                )}
                <div className="services-overview-card-meta">
                  <span>{card.projects} {card.projects === 1 ? "project" : "projects"}</span>
                  <span className="services-overview-card-link">View service</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
