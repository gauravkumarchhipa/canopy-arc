import { homeImpact } from "../../../content/pages/home/impact";
import { tw } from "../../../lib/tw";
import ImpactCommitment from "./impact/ImpactCommitment";
import ImpactFeaturedCard from "./impact/ImpactFeaturedCard";
import ImpactStatsGrid from "./impact/ImpactStatsGrid";

export default function ImpactSection() {
  const impact = homeImpact;

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
          <ImpactFeaturedCard
            icon={impact.featured.icon}
            value={impact.featured.value}
            label={impact.featured.label}
            description={impact.featured.description}
          />
          <ImpactStatsGrid stats={impact.stats} />
        </div>

        <ImpactCommitment
          title={impact.commitment.title}
          description={impact.commitment.description}
          pillars={impact.commitment.pillars}
        />
      </div>
    </section>
  );
}
