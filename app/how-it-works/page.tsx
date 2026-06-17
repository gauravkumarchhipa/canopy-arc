import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import FlowStepsSection from "./sections/FlowStepsSection";
import ChannelsSection from "./sections/ChannelsSection";
import ArchitectureSection from "./sections/ArchitectureSection";
import CtaSection from "./sections/CtaSection";

export const metadata: Metadata = {
  title: "How it works — SAHAI",
  description:
    "From a single voice message to a structured event, an alert, a reminder, a phone call. The SAHAI flow, end to end.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            From a sentence
            <br />
            to <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">a system</span>
            <br />
            that remembers.
          </>
        }
        blurb="Voice in, structured care out. Seven steps inside SAHAI — and the architecture behind them."
      />
      <FlowStepsSection />
      <ChannelsSection />
      <ArchitectureSection />
      <CtaSection />
    </>
  );
}
