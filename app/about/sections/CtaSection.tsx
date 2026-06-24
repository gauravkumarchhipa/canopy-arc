import Link from "next/link";
import GlowHoverCard from "../../components/ui/GlowHoverCard";
import { tw } from "../../lib/tw";
import {
  teamBannerText,
  teamBannerTitle,
} from "../../components/sections/team/team-card-styles";

export default function CtaSection() {
  return (
    <section className="relative pb-12 sm:pb-20">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <GlowHoverCard className="flex flex-col items-start justify-between gap-8 rounded-3xl p-6 sm:p-10 md:flex-row md:items-center md:p-12">
          <div>
            <p className={teamBannerTitle}>Ready to build something great?</p>
            <p className={`${teamBannerText} mt-2 max-w-xl text-base sm:text-lg`}>
              Tell us about your product, timeline, and goals. We&apos;ll respond with a clear
              plan — no pressure, no jargon.
            </p>
          </div>
          <div className="relative z-1 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}>
              Start a Project →
            </Link>
            <Link href="/work" className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}>
              View Our Work
            </Link>
          </div>
        </GlowHoverCard>
      </div>
    </section>
  );
}
