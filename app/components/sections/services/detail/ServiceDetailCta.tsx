import Heading from "../../../ui/Heading";
import Button from "../../../ui/Button";
import ArrowIcon from "../../../ui/ArrowIcon";
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
          <Heading className={detailCtaTitle}>
            Ready to build your next {serviceName.toLowerCase()} project?
          </Heading>
          <p className={detailCtaText}>
            Let&apos;s discuss your requirements and create a tailored solution for your
            business.
          </p>
        </div>
      </div>
      <div className="relative z-1 flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:shrink-0">
        <Button variant="header-primary" href="/contact">
          Schedule a Call <ArrowIcon direction="right" />
        </Button>
        <Button variant="header-ghost" href="/contact">
          Get a Proposal
        </Button>
      </div>
    </GlowHoverCard>
  );
}
