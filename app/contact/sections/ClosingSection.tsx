import RevealText from "../../components/RevealText";

export default function ClosingSection() {
  return (
    <section className="relative py-12 sm:py-24 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 text-center">
        <RevealText
          as="p"
          className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight"
        >
          {`Voice. Care.\nPeace of mind.`}
        </RevealText>
      </div>
    </section>
  );
}
