import RevealText from "../../components/RevealText";
import Button from "../../components/ui/Button";

export default function CtaSection() {
  return (
    <section className="relative py-12 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="glass rounded-3xl p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <RevealText
              as="h3"
              className="font-display text-4xl md:text-5xl leading-[1] tracking-tight max-w-xl"
            >
              {`Ready when you are.`}
            </RevealText>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href="/contact">
              Download SAHAI
            </Button>
            <Button href="/features" variant="ghost">
              Browse features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
