import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import FeatureGridSection from "./sections/FeatureGridSection";
import DeliberateNoSection from "./sections/DeliberateNoSection";
import CtaSection from "./sections/CtaSection";

export const metadata: Metadata = {
  title: "Features — SAHAI",
  description:
    "Voice conversation, medicine reminders, family escalation, SOS, symptom logging, photos and prescriptions, doctor connection — every feature inside SAHAI.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={
          <>
            Everything inside,
            <br />
            <span className="gradient-text">designed to disappear</span>
            <br />
            into care.
          </>
        }
        blurb="Eight focused capabilities — voice, reminders, escalation, SOS, memory, records, doctors, family. Health, medicines, symptoms, family safety. Nothing else."
      />
      <FeatureGridSection />
      <DeliberateNoSection />
      <CtaSection />
    </>
  );
}
