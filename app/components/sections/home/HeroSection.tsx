import Link from "next/link";
import dynamic from "next/dynamic";
import { homeHero } from "../../../content/pages/home/hero";
import { tw } from "../../../lib/tw";
import HeroSectionAnimations from "./hero/HeroSectionAnimations";
import { ORBIT_ICONS } from "./hero/orbit-icons";
import { buildOrbitNodes } from "./hero/orbit-nodes";

const HeroEcosystem = dynamic(() => import("./HeroEcosystem"));

export default function HeroSection() {
  const hero = homeHero;
  const nodes = buildOrbitNodes(hero.orbitLabels);

  return (
    <HeroSectionAnimations>
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-18 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute inset-0 opacity-[var(--hero-grid-opacity)] ${tw.gridBg} ${tw.maskFadeBottom}`}
          />
        </div>

        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6">
              <div
                data-hero-fade
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-xs text-muted"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-3.5 w-3.5 text-accent shrink-0"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.05-2.91a2.18 2.18 0 0 0-2.91-.05z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                </svg>
                <span className="tracking-[0.08em] uppercase">{hero.eyebrow}</span>
              </div>

              <h1
                data-hero-fade
                className="mt-7 font-display text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.02] tracking-tight"
              >
                {hero.titleLines[0]}
                <br />
                {hero.titleLines[1]}{" "}
                <span className={tw.gradientText}>{hero.titleLines[2]}</span>
              </h1>

              <p
                data-hero-fade
                className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-xl"
              >
                {hero.subtitle}
              </p>

              <div
                data-hero-fade
                className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <Link
                  href={hero.primaryCta.href}
                  className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}
                >
                  {hero.primaryCta.label} →
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  className={`${tw.headerBtnBase} ${tw.headerBtnGhost} gap-2.5`}
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/30">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <HeroEcosystem nodes={nodes} icons={ORBIT_ICONS} />
            </div>
          </div>
        </div>
      </section>
    </HeroSectionAnimations>
  );
}
