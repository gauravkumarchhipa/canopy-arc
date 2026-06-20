import {
  impactStatAccentLine,
  impactStatCard,
  impactStatCardGradient,
  impactStatCardPattern,
  impactStatDescription,
  impactStatIconBox,
  impactStatLabel,
  impactStatValue,
} from "./impact-styles";
import ImpactIcon from "./ImpactIcon";

type Stat = {
  icon: string;
  value: string;
  label: string;
  description: string;
};

type ImpactStatsGridProps = {
  stats: readonly Stat[];
};

export default function ImpactStatsGrid({ stats }: ImpactStatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 overflow-visible p-1 md:grid-cols-3">
      {stats.map((stat) => (
        <article key={stat.label} className={impactStatCard}>
          <div className={impactStatCardGradient} aria-hidden />
          <div className={impactStatCardPattern} aria-hidden />
          <div className="relative z-1 flex items-start justify-between gap-3">
            <span className={impactStatIconBox}>
              <ImpactIcon name={stat.icon} />
            </span>
            <p className={impactStatValue}>{stat.value}</p>
          </div>
          <h3 className={impactStatLabel}>{stat.label}</h3>
          <span className={impactStatAccentLine} aria-hidden />
          <p className={impactStatDescription}>{stat.description}</p>
        </article>
      ))}
    </div>
  );
}
