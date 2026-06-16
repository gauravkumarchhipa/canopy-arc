import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { TIMELINE } from "./about-data";

export default function TimelineSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <Eyebrow className="mb-5">The journey</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`From an idea\nto thousands of\nfamilies.`}
          </RevealText>
        </div>

        <Reveal staggerChildren stagger={0.08}>
          <div className="relative">
            <div className="absolute left-[7.25rem] top-2 bottom-2 w-px bg-linear-to-b from-[#f2994a]/40 via-[#2bb3a3]/40 to-[#2a2f6b]/40 hidden md:block" />
            {TIMELINE.map((t, i) => (
              <div
                key={`${t.date}-${i}`}
                className="grid md:grid-cols-[10rem_1fr] gap-4 md:gap-12 py-8 border-t border-line first:border-t-0 relative"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted pt-2">
                  {t.date}
                </p>
                <div className="md:pl-8 relative">
                  <span className="hidden md:block absolute -left-[0.45rem] top-3 h-3 w-3 rounded-full bg-foreground" />
                  <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-muted max-w-xl leading-relaxed">
                    {t.body}
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
