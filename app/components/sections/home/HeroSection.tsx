import Link from "next/link";
import dynamic from "next/dynamic";
import EyebrowPill from "../../ui/EyebrowPill";
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
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-18 lg:pt-36">
        <div className="relative mx-auto max-w-350 px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6">
              <div data-hero-fade>
                <EyebrowPill>{hero.eyebrow}</EyebrowPill>
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
