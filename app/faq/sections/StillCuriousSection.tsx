import Link from "next/link";
import { tw } from "../../lib/tw";

export default function StillCuriousSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="border border-line bg-surface backdrop-blur-xl backdrop-saturate-140 rounded-3xl p-6 sm:p-8 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1] tracking-tight max-w-xl break-words">
              Still curious? Just ask.
            </h3>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}>
              Send us a note
            </Link>
            <Link
              href="mailto:support@canopy-arc.ai"
              className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}
            >
              support@canopy-arc.ai
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
