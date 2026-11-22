import { AboutHero } from "./AboutHero";
import type { Metadata } from "next";
import AboutPillarsSection from "./sections/AboutPillarsSection";
import CapabilitiesSection from "./sections/CapabilitiesSection";
import CtaSection from "./sections/CtaSection";
import PeoplePreviewSection from "./sections/PeoplePreviewSection";
import PrincipleQuoteSection from "./sections/PrincipleQuoteSection";
import TimelineSection from "./sections/TimelineSection";
import ValuesSection from "./sections/ValuesSection";
import WhySection from "./sections/WhySection";
import "./about-overview.css";

export const metadata: Metadata = {
  title: "About Us — Canopy Arc",
  description:
    "Canopy Arc is a global team of engineers, designers, and strategists delivering enterprise-grade web, mobile, cloud, and AI solutions with performance, security, and great UX.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <AboutHero />

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
