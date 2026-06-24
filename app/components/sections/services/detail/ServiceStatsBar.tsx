import { SERVICE_BOTTOM_STATS } from "../../../../content/pages/services/detail-shared";
import AnimatedCounter from "../../../ui/AnimatedCounter";
import GlowHoverCard from "../../../ui/GlowHoverCard";
import ImpactIcon from "../../home/impact/ImpactIcon";
import {
  detailBottomStatIcon,
  detailBottomStatLabel,
  detailBottomStatValue,
} from "./service-detail-styles";

export default function ServiceStatsBar() {
  return (
    <section className="mt-8 grid gap-4 overflow-visible p-1 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICE_BOTTOM_STATS.map((stat) => (
        <GlowHoverCard
          key={stat.label}
          className="flex items-center gap-3 rounded-xl px-4 py-3"
        >
          <span className={detailBottomStatIcon}>
            <ImpactIcon name={stat.icon} />
          </span>
          <div>
            <AnimatedCounter value={stat.value} className={detailBottomStatValue} />
            <p className={detailBottomStatLabel}>{stat.label}</p>
          </div>
        </GlowHoverCard>
      ))}
    </section>
  );
}
