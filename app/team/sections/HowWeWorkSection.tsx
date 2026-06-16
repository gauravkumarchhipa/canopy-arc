import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { VALUES } from "./team-data";

export default function HowWeWorkSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-20">
        <div className="lg:col-span-5">
          <Eyebrow className="mb-5">How we work</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`Small, focused,\naccountable.`}
          </RevealText>
        </div>
        <div className="lg:col-span-7">
          <Reveal staggerChildren stagger={0.1}>
            {VALUES.map((v) => (
              <div
                key={v.n}
                className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-6 px-4 -mx-4 rounded-xl border-t border-line first:border-t-0 hover:bg-surface transition-colors"
                data-cursor="hover"
              >
                <span className="font-display text-xl text-muted">{v.n}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed max-w-xl">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
