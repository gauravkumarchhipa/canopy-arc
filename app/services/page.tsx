import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ServicesGrid from "../components/sections/services/ServicesGrid";
import ServiceJourneyVisual from "../components/sections/services/ServiceJourneyVisual";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import { servicesHero } from "../content/pages/services/hero";
import impact from "../content/pages/home/impact.json";
import "./services-overview.css";

export const metadata: Metadata = {
  title: "IT Services — Canopy Arc",
  description: servicesHero.subtitle,
};

const figures = [
  { ...impact.stats[2], label: "Core Services" },
  impact.featured,
  impact.stats[0],
  impact.stats[1],
];

export default function ServicesPage() {
  const { eyebrow, title, titleAccent, subtitle } = servicesHero;
  return (
    <div className="services-overview">
      <section className="services-overview-hero" aria-labelledby="services-overview-title">
        <ServiceJourneyVisual />
        <div className="services-overview-shell services-overview-hero-inner">
          <div className="services-overview-copy">
            <p className="services-overview-label">/ {eyebrow}</p>
            <h1 id="services-overview-title">{title} <span>{titleAccent}</span></h1>
            <p className="services-overview-summary">{subtitle}</p>
            <div className="services-overview-actions">
              <Link className="services-overview-primary" href="/services#services-grid">
                Explore All Services <span aria-hidden="true">→</span>
              </Link>
              <a href="#service-journey">
                <span className="services-overview-play" aria-hidden="true" /> See Our Journey
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="services-overview-impact" aria-labelledby="services-overview-impact-title">
        <div className="services-overview-shell services-overview-impact-inner">
          <h2 className="services-overview-label" id="services-overview-impact-title">Our expertise<br />{" "}at a glance</h2>
          <dl>
            {figures.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd><AnimatedCounter value={value} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <Suspense fallback={null}>
        <ServicesGrid />
      </Suspense>
    </div>
  );
}
