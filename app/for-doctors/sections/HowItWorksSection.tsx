import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { STEPS } from "./for-doctors-data";

export default function HowItWorksSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <Eyebrow className="mb-5">Joining is simple</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`Four steps.\nFive working days.`}
          </RevealText>
        </div>

        <Reveal staggerChildren stagger={0.08}>
          <div>
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="grid md:grid-cols-12 gap-4 md:gap-12 py-8 md:py-12 px-4 md:px-6 -mx-4 md:-mx-6 rounded-2xl border-t border-line hover:bg-surface transition-colors"
                data-cursor="hover"
              >
                <div className="md:col-span-3 flex md:flex-col items-baseline gap-4">
                  <span className="font-display text-5xl md:text-7xl leading-none tracking-tight gradient-text">
                    {s.step}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl md:text-4xl leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base md:text-lg text-muted leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
