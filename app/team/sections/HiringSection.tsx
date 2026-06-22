import RevealText from "../../components/RevealText";
import Button from "../../components/ui/Button";
import Eyebrow from "../../components/ui/Eyebrow";

export default function HiringSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="border border-line bg-surface backdrop-blur-xl backdrop-saturate-140 rounded-3xl p-6 sm:p-8 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Eyebrow className="mb-5">We&apos;re hiring</Eyebrow>
            <RevealText
              as="h3"
              className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1] tracking-tight max-w-xl break-words"
            >
              {`If care is personal\nfor you too — talk to us.`}
            </RevealText>
            <p className="mt-6 text-muted max-w-xl">
              Senior engineering, voice/AI, mobile, and clinical roles open.
              Remote-friendly across India.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href="mailto:support@canopy-arc.ai">
              Email support@canopy-arc.ai
            </Button>
            <Button href="/about" variant="ghost">
              Read the why
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
