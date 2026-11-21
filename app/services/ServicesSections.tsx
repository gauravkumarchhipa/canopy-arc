import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import ArrowIcon from "../components/ui/ArrowIcon";
import ServiceJourneyVisual from "../components/sections/services/ServiceJourneyVisual";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import { servicesHero } from "../content/pages/services/hero";
import impact from "../content/pages/home/impact.json";

const figures = [
  { ...impact.stats[2], label: "Core Services" },
  impact.featured,
  impact.stats[0],
  impact.stats[1],
];

export function ServicesHero() {
  const { eyebrow, title, titleAccent, subtitle } = servicesHero;
  return (
    <section className="services-overview-hero" aria-labelledby="services-overview-title">
      <ServiceJourneyVisual />
      <div className="services-overview-shell services-overview-hero-inner">
        <div className="services-overview-copy">
          <p className="services-overview-label">/ {eyebrow}</p>
          <Heading level={1} id="services-overview-title">{title} <span>{titleAccent}</span></Heading>
          <p className="services-overview-summary">{subtitle}</p>
          <div className="services-overview-actions">
            <Button variant="unstyled" className="services-overview-primary" href="/services#services-grid">
              Explore All Services <span aria-hidden="true"><ArrowIcon direction="right" /></span>
            </Button>
            <a href="#service-journey">
              <span className="services-overview-play" aria-hidden="true" /> See Our Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesImpact() {
  return (
    <section className="services-overview-impact" aria-labelledby="services-overview-impact-title">
      <div className="services-overview-shell services-overview-impact-inner">
        <Heading className="services-overview-label" id="services-overview-impact-title">Our expertise<br />{" "}at a glance</Heading>
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
  );
}
