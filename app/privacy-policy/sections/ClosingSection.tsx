import RevealText from "../../components/RevealText";

export default function ClosingSection() {
  return (
    <section className="relative py-12 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 text-center">
        <RevealText
          as="p"
          className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight"
        >
          {`Care that listens —\nand keeps what it hears safe.`}
        </RevealText>
      </div>
    </section>
  );
}
