import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { VALUES } from "./about-data";

export default function ValuesSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <Eyebrow className="mb-5">What we believe</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`Four convictions\nbehind every line of code.`}
          </RevealText>
        </div>

        <Reveal staggerChildren stagger={0.1}>
          <div className="grid md:grid-cols-2 gap-px bg-line">
            {VALUES.map((v) => (
              <div
                key={v.n}
                className="bg-background p-6 sm:p-10 md:p-14 hover:bg-surface transition-colors"
                data-cursor="hover"
              >
                <p className="font-display text-sm text-muted mb-6">{v.n}</p>
                <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-4 text-muted leading-relaxed max-w-md">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
