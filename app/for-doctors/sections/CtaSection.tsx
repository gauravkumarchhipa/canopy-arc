import RevealText from "../../components/RevealText";
import Button from "../../components/ui/Button";

export default function CtaSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="glass rounded-3xl p-6 sm:p-8 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <RevealText
              as="h3"
              className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1] tracking-tight max-w-xl break-words"
            >
              {`Apply to join the\nSAHAI doctor network.`}
            </RevealText>
            <p className="mt-6 text-muted max-w-xl">
              Two minutes online. We&apos;ll get back within five working
              days.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href="mailto:support@sahai.ai">
              Apply now
            </Button>
            <Button href="/contact" variant="ghost">
              Talk to us first
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
