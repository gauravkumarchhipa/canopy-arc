import type { ReactNode } from "react";
import { siteData } from "../../../content/site-data";

const ICONS: Record<string, ReactNode> = {
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.05-2.91a2.18 2.18 0 0 0-2.91-.05z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4a2 2 0 0 0 2 2c0 1.1.9 2 2 2" />
      <path d="M17 6h3a2 2 0 0 1-2 2c0 1.1-.9 2-2 2" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  performance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z" />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l2-2" />
      <path d="M14 14l2-2a2.5 2.5 0 0 0-3.5-3.5L11 11" />
      <path d="m10 14-2 2a2.5 2.5 0 0 1-3.5-3.5L7 10" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
    </svg>
  ),
};

function ImpactIcon({ name, className }: { name: string; className?: string }) {
  return <span className={className}>{ICONS[name]}</span>;
}

export default function ImpactSection() {
  const impact = siteData.home.impact;

  return (
    <section className="impact-section relative min-h-svh flex flex-col justify-center overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg mask-fade-bottom impact-grid-overlay" />
        <div className="impact-ambient impact-ambient--left" aria-hidden />
        <div className="impact-ambient impact-ambient--right" aria-hidden />
      </div>

      <div className="relative mx-auto w-full max-w-350 px-6 lg:px-10">
        <div className="impact-header text-center max-w-3xl mx-auto">
          <p className="impact-badge">
            <span className="impact-badge-dot" aria-hidden />
            {impact.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-tight">
            {impact.title}{" "}
            <span className="gradient-text">{impact.titleAccent}</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed">
            {impact.subtitle}
          </p>
        </div>

        <div className="impact-grid mt-12 sm:mt-14 lg:mt-16">
          <article className="impact-featured">
            <div className="impact-featured-waves" aria-hidden />
            <div className="impact-featured-icon">
              <ImpactIcon name={impact.featured.icon} />
            </div>
            <p className="impact-featured-value">{impact.featured.value}</p>
            <h3 className="impact-featured-label">{impact.featured.label}</h3>
            <span className="impact-featured-line" aria-hidden />
            <p className="impact-featured-desc">{impact.featured.description}</p>
          </article>

          <div className="impact-stats-grid">
            {impact.stats.map((stat) => (
              <article key={stat.label} className="impact-stat-card">
                <div className="impact-stat-top">
                  <span className="impact-stat-icon">
                    <ImpactIcon name={stat.icon} />
                  </span>
                  <p className="impact-stat-value">{stat.value}</p>
                </div>
                <h3 className="impact-stat-label">{stat.label}</h3>
                <span className="impact-stat-line" aria-hidden />
                <p className="impact-stat-desc">{stat.description}</p>
              </article>
            ))}
          </div>
        </div>

        <article className="impact-commitment mt-8 sm:mt-10">
          <div className="impact-commitment-intro">
            <span className="impact-commitment-star">
              <ImpactIcon name="star" />
            </span>
            <div>
              <h3 className="impact-commitment-title">{impact.commitment.title}</h3>
              <p className="impact-commitment-desc">{impact.commitment.description}</p>
            </div>
          </div>
          <div className="impact-pillars">
            {impact.commitment.pillars.map((pillar) => (
              <div key={pillar.title} className="impact-pillar">
                <span className="impact-pillar-icon">
                  <ImpactIcon name={pillar.icon} />
                </span>
                <h4 className="impact-pillar-title">{pillar.title}</h4>
                <p className="impact-pillar-desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
