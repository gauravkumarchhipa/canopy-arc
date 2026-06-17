import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import SummarySection from "./sections/SummarySection";
import SectionsSection from "./sections/SectionsSection";
import MetaSection from "./sections/MetaSection";
import ClosingSection from "./sections/ClosingSection";

export const metadata: Metadata = {
  title: "Privacy policy — SAHAI",
  description:
    "How SAHAI collects, stores, and protects health information. Privacy is absolute — every health detail is encrypted, every access audited.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy policy"
        title={
          <>
            Privacy here is
            <br />
            <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">absolute,</span>
            <br />
            not a setting.
          </>
        }
        blurb="A short, plainly-written summary of what we collect, how we use it, and what we will never do — followed by the longer policy."
      />

      <SummarySection />

      {/* SECTIONS */}
      <SectionsSection />

      {/* META */}
      <MetaSection />

      <ClosingSection />
    </>
  );
}
