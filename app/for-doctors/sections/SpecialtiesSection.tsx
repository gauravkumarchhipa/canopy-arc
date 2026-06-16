import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { SPECIALTIES } from "./for-doctors-data";

export default function SpecialtiesSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Eyebrow className="mb-5">We&apos;re recruiting</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`Specialties\nin demand.`}
          </RevealText>
        </div>
        <div className="lg:col-span-8 flex flex-wrap gap-2 content-start">
          {SPECIALTIES.map((s) => (
            <Reveal key={s}>
              <span
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm bg-surface hover:bg-surface-strong hover:border-foreground transition-colors cursor-default"
                data-cursor="hover"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {s}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
