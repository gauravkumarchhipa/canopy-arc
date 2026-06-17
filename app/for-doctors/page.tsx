import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import BenefitsSection from "./sections/BenefitsSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import SpecialtiesSection from "./sections/SpecialtiesSection";
import SocialProofSection from "./sections/SocialProofSection";
import CtaSection from "./sections/CtaSection";

export const metadata: Metadata = {
  title: "For doctors — SAHAI",
  description:
    "Join the SAHAI verified doctor network. Voice and video consultations, full patient context, digital prescriptions — all in one place.",
};

export default function ForDoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For doctors"
        title={
          <>
            Care, with
            <br />
            <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">continuity</span>
            <br />
            built in.
          </>
        }
        blurb="Join the SAHAI verified doctor network. Voice and video consultations from your phone, full patient context before every call, and digital prescriptions that actually get followed."
      />
      <BenefitsSection />
      <HowItWorksSection />
      <SpecialtiesSection />
      <SocialProofSection />
      <CtaSection />
    </>
  );
}
