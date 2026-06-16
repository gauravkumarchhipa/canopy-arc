import RevealText from "../../components/RevealText";

export default function ClosingQuoteSection() {
  return (
    <section className="relative py-12 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 text-center">
        <RevealText
          as="p"
          className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight"
        >
          {`Care that listens —\nbacked by terms you can read.`}
        </RevealText>
      </div>
    </section>
  );
}
