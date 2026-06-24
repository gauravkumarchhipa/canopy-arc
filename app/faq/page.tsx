import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import FaqList from "../components/FaqList";
import { SECTIONS } from "./sections/faq-data";
import StillCuriousSection from "./sections/StillCuriousSection";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "FAQ — Canopy Arc",
  description:
    "Common questions about working with Canopy Arc — services, process, timelines, pricing, security, and support. Answered plainly.",
};

export default function FaqPage() {
  return (
    <div className={tw.pageShellBottom}>
      <PageHero
        warmGlow={false}
        eyebrow="FAQ"
        title={
          <>
            Plain answers.
            <br />
            <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">Anything we missed —</span>
            <br />
            ask us.
          </>
        }
        blurb="Six topics, real questions clients ask before and during a build. If yours isn't here, write to us — we read every message and reply within two business days."
      />

      <FaqList sections={SECTIONS} />

      <StillCuriousSection />
    </div>
  );
}
