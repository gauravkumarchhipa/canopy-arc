import Link from "next/link";
import { tw } from "../../../../lib/tw";
import GlowHoverCard from "../../../ui/GlowHoverCard";
import ImpactIcon from "../../home/impact/ImpactIcon";
import { detailCtaGlow, detailCtaIcon, detailCtaText, detailCtaTitle } from "./service-detail-styles";

type Props = {
  serviceName: string;
};

export default function ServiceDetailCta({ serviceName }: Props) {
  return (
    <GlowHoverCard className={detailCtaGlow}>
      <div className="flex items-start gap-4">
        <span className={detailCtaIcon}>
          <ImpactIcon name="rocket" />
        </span>
        <div>
          <h2 className={detailCtaTitle}>
            Ready to build your next {serviceName.toLowerCase()} project?
          </h2>
          <p className={detailCtaText}>
            Let&apos;s discuss your requirements and create a tailored solution for your
            business.
          </p>
        </div>
      </div>
      <div className="relative z-1 flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:shrink-0">
        <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}>
          Schedule a Call →
        </Link>
        <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}>
          Get a Proposal
        </Link>
      </div>
    </GlowHoverCard>
  );
}
