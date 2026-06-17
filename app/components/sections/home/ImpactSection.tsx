import type { ReactNode } from "react";
import { siteData } from "../../../content/site-data";
import { tw } from "../../../lib/tw";

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

const statCard =
  "flex min-h-[9.5rem] flex-col rounded-2xl border border-[rgba(37,99,235,0.12)] bg-[rgba(255,255,255,0.92)] p-[1.15rem_1.1rem_1.25rem] shadow-[0_18px_50px_-32px_rgba(37,99,235,0.28)] backdrop-blur-[10px] [html[data-theme=dark]_&]:border-[rgba(248,250,252,0.1)] [html[data-theme=dark]_&]:bg-[rgba(248,250,252,0.04)] [html[data-theme=dark]_&]:shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)]";

function ImpactIcon({ name, className }: { name: string; className?: string }) {
  return <span className={className}>{ICONS[name]}</span>;
}

export default function ImpactSection() {
  const impact = siteData.home.impact;

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-0 opacity-45 ${tw.gridBg} ${tw.maskFadeBottom}`} />
        <div
          className="absolute top-1/2 -left-32 h-88 w-88 -translate-y-1/2 rounded-full bg-[rgba(37,99,235,0.18)] opacity-35 blur-[80px]"
          aria-hidden
        />
        <div
          className="absolute top-1/2 -right-32 h-88 w-88 -translate-y-1/2 rounded-full bg-[rgba(6,182,212,0.16)] opacity-35 blur-[80px]"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto w-full max-w-350 px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(37,99,235,0.18)] bg-[rgba(37,99,235,0.06)] px-3.5 py-1.75 text-[0.6875rem] font-semibold tracking-[0.14em] text-accent uppercase">
            <span
              className="h-1.75 w-1.75 rounded-full bg-accent shadow-[0_0_10px_rgba(37,99,235,0.55)]"
              aria-hidden
            />
            {impact.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-tight">
            {impact.title}{" "}
            <span className={tw.gradientText}>{impact.titleAccent}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{impact.subtitle}</p>
        </div>

        <div className="mt-12 grid items-stretch gap-4 sm:mt-14 lg:mt-16 lg:grid-cols-[0.95fr_1.35fr] lg:gap-5">
          <article className="relative flex min-h-72 flex-col justify-end overflow-hidden rounded-[1.25rem] bg-[linear-gradient(145deg,#1d4ed8_0%,#2563eb_42%,#1e40af_100%)] p-6 text-white shadow-[0_24px_60px_-28px_rgba(37,99,235,0.65)] lg:min-h-full lg:p-8">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.14),transparent_42%),repeating-radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08)_0_1px,transparent_1px_18px)] opacity-90"
              aria-hidden
            />
            <div className="relative z-1 mb-auto inline-flex h-13 w-13 items-center justify-center rounded-full border border-white/28 bg-white/12 shadow-[0_0_28px_rgba(255,255,255,0.18)] [&_svg]:h-5.5 [&_svg]:w-5.5">
              <ImpactIcon name={impact.featured.icon} />
            </div>
            <p className="relative z-1 mt-5 text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-semibold tracking-tight">
              {impact.featured.value}
            </p>
            <h3 className="relative z-1 mt-2.5 text-lg leading-tight font-semibold">
              {impact.featured.label}
            </h3>
            <span className="relative z-1 mt-4 mb-3 block h-0.5 w-10 rounded-full bg-white/55" aria-hidden />
            <p className="relative z-1 m-0 max-w-64 text-[0.8125rem] leading-snug text-white/82">
              {impact.featured.description}
            </p>
          </article>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {impact.stats.map((stat) => (
              <article key={stat.label} className={statCard}>
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[0.7rem] border border-[rgba(37,99,235,0.14)] bg-[rgba(37,99,235,0.08)] text-accent [&_svg]:h-4.5 [&_svg]:w-4.5">
                    <ImpactIcon name={stat.icon} />
                  </span>
                  <p className="m-0 text-[clamp(1.65rem,2.5vw,2rem)] leading-none font-semibold tracking-tight text-accent">
                    {stat.value}
                  </p>
                </div>
                <h3 className="mt-3.5 text-[0.9375rem] leading-snug font-semibold text-foreground">
                  {stat.label}
                </h3>
                <span
                  className="mt-2.5 mb-2 block h-0.5 w-8 rounded-full bg-[linear-gradient(90deg,var(--accent),rgba(6,182,212,0.65))]"
                  aria-hidden
                />
                <p className="m-0 text-xs leading-snug text-muted">{stat.description}</p>
              </article>
            ))}
          </div>
        </div>

        <article
          className={`mt-8 flex flex-col gap-6 rounded-[1.15rem] p-5 sm:mt-10 lg:flex-row lg:items-center lg:gap-8 lg:p-6 ${statCard}`}
        >
          <div className="flex min-w-0 items-start gap-4 lg:flex-[0_0_34%] lg:border-r lg:border-line lg:pr-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.8rem] border border-[rgba(37,99,235,0.16)] bg-[rgba(37,99,235,0.08)] text-accent [&_svg]:h-5 [&_svg]:w-5">
              <ImpactIcon name="star" />
            </span>
            <div>
              <h3 className="m-0 text-[1.05rem] font-semibold text-foreground">
                {impact.commitment.title}
              </h3>
              <p className="mt-1.75 text-[0.8125rem] leading-snug text-muted">
                {impact.commitment.description}
              </p>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-4">
            {impact.commitment.pillars.map((pillar) => (
              <div key={pillar.title} className="min-w-0">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[0.65rem] border border-[rgba(37,99,235,0.14)] bg-[rgba(37,99,235,0.06)] text-accent [&_svg]:h-4 [&_svg]:w-4">
                  <ImpactIcon name={pillar.icon} />
                </span>
                <h4 className="mt-2.5 text-[0.8125rem] font-semibold text-foreground">
                  {pillar.title}
                </h4>
                <p className="mt-1 text-[0.6875rem] leading-snug text-muted">{pillar.description}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
