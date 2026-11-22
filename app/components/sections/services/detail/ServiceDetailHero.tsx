import Heading from "../../../ui/Heading";
import StudioHero from "../../../layout/StudioHero";
import Button from "../../../ui/Button";
import ArrowIcon from "../../../ui/ArrowIcon";
import type { Service } from "../../../../content/pages/services/services";
import { SERVICE_HERO_STATS } from "../../../../content/pages/services/detail-shared";
import AnimatedCounter from "../../../ui/AnimatedCounter";
import GlowHoverCard from "../../../ui/GlowHoverCard";
import ImpactIcon from "../../home/impact/ImpactIcon";
import ServiceIcon from "../ServiceIcon";
import ServiceHeroVisual from "./ServiceHeroVisual";
import {
  detailBadge,
  detailHeroStatIcon,
  detailHeroStatLabel,
  detailHeroStatValue,
  detailTag,
} from "./service-detail-styles";

type Props = {
  service: Service;
  iconName: string;
};

export default function ServiceDetailHero({ service, iconName }: Props) {
  return (
    <StudioHero className="mt-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <div className="flex items-start gap-4">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-[image:var(--grad-soft)] text-accent [&_svg]:h-7 [&_svg]:w-7">
              <ServiceIcon name={iconName} />
            </span>
            <div>
              <span className={detailBadge}>Core Service</span>
              <Heading level={1} className="mt-3 font-display text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem]">
                {service.name}
              </Heading>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {service.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {service.subDomains.map((tag) => (
              <span key={tag} className={detailTag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 grid gap-3 overflow-visible p-1 sm:grid-cols-2">
            {SERVICE_HERO_STATS.map((stat) => (
              <GlowHoverCard
                key={stat.label}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
              >
                <span className={detailHeroStatIcon}>
                  <ImpactIcon name={stat.icon} />
                </span>
                <div>
                  <AnimatedCounter value={stat.value} className={detailHeroStatValue} />
                  <p className={detailHeroStatLabel}>{stat.label}</p>
                </div>
              </GlowHoverCard>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button variant="header-primary" href="#case-studies">
              View Case Studies <ArrowIcon direction="right" />
            </Button>
            <Button variant="header-ghost" href="/contact">
              Book Consultation
            </Button>
          </div>
        </div>

        <ServiceHeroVisual serviceId={service.id} iconName={iconName} />
      </div>
    </StudioHero>
  );
}
