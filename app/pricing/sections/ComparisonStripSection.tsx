import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";

export default function ComparisonStripSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <Eyebrow className="mb-5">Pay-per-use</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`Need just one thing?\nBuy it once.`}
          </RevealText>
        </div>

        <Reveal staggerChildren stagger={0.08}>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                k: "₹199",
                v: "One video doctor consultation",
              },
              {
                k: "₹49",
                v: "Single prescription scan & schedule",
              },
              {
                k: "₹99",
                v: "Lab report decoded in plain language",
              },
            ].map((item) => (
              <div
                key={item.v}
                className="rounded-2xl border border-line p-6 bg-surface"
                data-cursor="hover"
              >
                <p className="font-display text-3xl md:text-4xl tracking-tight gradient-text">
                  {item.k}
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
