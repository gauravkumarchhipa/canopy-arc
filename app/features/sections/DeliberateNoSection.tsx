import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";

export default function DeliberateNoSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Eyebrow className="mb-5">What SAHAI is not</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-4xl md:text-5xl leading-[1] tracking-tight"
          >
            {`The deliberate\nno-list.`}
          </RevealText>
        </div>
        <div className="lg:col-span-8 space-y-3">
          {[
            "No casual chit-chat — no weather, gold, sports, news, jokes",
            "No diagnoses — SAHAI is a companion, not a doctor",
            "No prescriptions or dosage advice — only what family / doctor entered",
            "No food orders, cab bookings, payments, shopping",
            "No general assistant features. No social feeds. No ads.",
          ].map((line, i) => (
            <Reveal key={line} delay={0.05 * i}>
              <div className="flex items-center gap-6 py-5 border-b border-line">
                <span className="font-display text-2xl text-muted/40">×</span>
                <p className="text-lg md:text-xl text-foreground/85">
                  {line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
