import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import FaqList from "../components/FaqList";
import { SECTIONS } from "./sections/faq-data";
import StillCuriousSection from "./sections/StillCuriousSection";

export const metadata: Metadata = {
  title: "FAQ — SAHAI",
  description:
    "Common questions about SAHAI — voice, reminders, family, doctors, privacy, payments. Answered plainly.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Plain answers.
            <br />
            <span className="gradient-text">Anything we missed —</span>
            <br />
            ask us.
          </>
        }
        blurb="Six topics, real questions families ask. If yours isn't here, write to us — we read every message and reply within two working days."
      />

      <FaqList sections={SECTIONS} />

      <StillCuriousSection />
    </>
  );
}
