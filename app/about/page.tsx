import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "../components/layout/PageIntro";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import { teamStatLabel, teamStatValue } from "../components/sections/team/team-card-styles";
import { aboutHero } from "../content/pages/about/hero";
import { tw } from "../lib/tw";
import AboutPillarsSection from "./sections/AboutPillarsSection";
import CapabilitiesSection from "./sections/CapabilitiesSection";
import CtaSection from "./sections/CtaSection";
import PeoplePreviewSection from "./sections/PeoplePreviewSection";
import PrincipleQuoteSection from "./sections/PrincipleQuoteSection";
import TimelineSection from "./sections/TimelineSection";
import ValuesSection from "./sections/ValuesSection";
import WhySection from "./sections/WhySection";

export const metadata: Metadata = {
  title: "About Us — Canopy Arc",
  description:
    "Canopy Arc is a global team of engineers, designers, and strategists delivering enterprise-grade web, mobile, cloud, and AI solutions with performance, security, and great UX.",
};

export default function AboutPage() {
  const hero = aboutHero;

  return (
    <div className={tw.pageShell}>
      <PageIntro
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleAccent={hero.titleAccent}
        subtitle={hero.subtitle}
        eyebrowPill
      >
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link href="/work" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}>
            View Our Work →
          </Link>
          <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}>
            Let&apos;s Talk
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 overflow-visible p-1 md:grid-cols-4">
          {hero.stats.map((stat) => (
            <GlowHoverCard key={stat.label} className="rounded-2xl px-5 py-4">
              <AnimatedCounter value={stat.value} className={teamStatValue} />
              <p className={teamStatLabel}>{stat.label}</p>
            </GlowHoverCard>
          ))}
        </div>
      </PageIntro>

      <AboutPillarsSection />
      <WhySection />
      <ValuesSection />
      <CapabilitiesSection />
      <TimelineSection />
      <PrincipleQuoteSection />
      <PeoplePreviewSection />
      <CtaSection />
    </div>
  );
}
