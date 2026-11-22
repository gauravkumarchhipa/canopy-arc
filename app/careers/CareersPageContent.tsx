import { CareersHero, CareersSidebar } from "./CareersSections";
import CareersOpenings from "./CareersOpenings";
import PageAmbientGlow from "../components/layout/PageAmbientGlow";
import type { FooterContact } from "../lib/footer/types";
import { tw } from "../lib/tw";

type Props = {
  contact: FooterContact;
};

export default function CareersPageContent({ contact }: Props) {
  return (
    <div className={`${tw.pageShellBottom} relative overflow-hidden`}>
      <PageAmbientGlow />

      <CareersHero />

      <section className="relative mx-auto mt-12 grid max-w-350 gap-6 px-6 sm:mt-14 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <CareersOpenings />

        <CareersSidebar contact={contact} />
      </section>
    </div>
  );
}
