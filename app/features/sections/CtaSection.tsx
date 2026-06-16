import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Button from "../../components/ui/Button";

export default function CtaSection() {
  return (
    <section className="relative py-12 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="glass rounded-3xl p-6 sm:p-10 md:p-16 text-center">
          <RevealText
            as="h3"
            className="font-display text-4xl md:text-6xl leading-[1] tracking-tight"
          >
            {`Built for the quiet days\nand the urgent moments.`}
          </RevealText>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact">
                Download SAHAI
              </Button>
              <Button href="/how-it-works" variant="ghost">
                How it works
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
