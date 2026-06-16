import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import PlanGridSection from "./sections/PlanGridSection";
import ComparisonStripSection from "./sections/ComparisonStripSection";
import MiniFaqSection from "./sections/MiniFaqSection";
import CtaSection from "./sections/CtaSection";

export const metadata: Metadata = {
  title: "Pricing — SAHAI",
  description:
    "Free for the essentials, paid plans for unlimited care. Family Care, Premium Care, and NRI Care — pick what fits your family.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Free for the basics.
            <br />
            <span className="gradient-text">Paid for everything</span>
            <br />
            else.
          </>
        }
        blurb="No surprise charges. No hidden tiers. The free plan stays free forever — the paid plans add unlimited reminders, doctor access, and family-wide tools."
      />
      <PlanGridSection />
      <ComparisonStripSection />
      <MiniFaqSection />
      <CtaSection />
    </>
  );
}
