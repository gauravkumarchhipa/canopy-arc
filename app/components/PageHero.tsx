import PageHeroOrbs from "./PageHeroOrbs";
import Heading from "./ui/Heading";
import Eyebrow from "./ui/Eyebrow";
import { tw } from "../lib/tw";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  blurb?: string;
  /** Warm orange ambient orb (top-left). Off for pages that should stay clean. */
  warmGlow?: boolean;
};

export default function PageHero({ eyebrow, title, blurb, warmGlow = true }: Props) {
  return (
    <section className="relative pt-[10rem] sm:pt-36 md:pt-40 pb-14 sm:pb-20 md:pb-28 overflow-hidden">
      <div className={`absolute inset-0 opacity-30 pointer-events-none ${tw.gridBg} ${tw.maskFadeBottom}`} />
      <PageHeroOrbs warmGlow={warmGlow} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Eyebrow className="mb-5 md:mb-6">{eyebrow}</Eyebrow>
        <Heading level={1} className="font-display text-5xl sm:text-6xl md:text-[8vw] lg:text-[6.5vw] leading-[0.95] tracking-tight max-w-5xl break-words hyphens-auto">
          {title}
        </Heading>
        {blurb && (
          <p className="mt-8 md:mt-10 max-w-2xl text-base md:text-lg text-muted leading-relaxed">
            {blurb}
          </p>
        )}
      </div>
    </section>
  );
}
