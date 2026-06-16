import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";

export default function PrincipleQuoteSection() {
  return (
    <section className="relative py-20 sm:py-32 md:py-44 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 text-center">
        <RevealText
          as="p"
          className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight"
        >
          {`Data integrity and reliability\nare more important than\nspeed or features.`}
        </RevealText>
        <Reveal delay={0.3}>
          <p className="mt-10 text-xs tracking-[0.3em] uppercase text-muted">
            the SAHAI principle
          </p>
        </Reveal>
      </div>
    </section>
  );
}
