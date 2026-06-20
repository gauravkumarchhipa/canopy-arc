import { impactStatCard, impactStatAccentLine, impactStatIconBox } from "./impact-styles";
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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <article key={stat.label} className={`group ${impactStatCard}`}>
          <div className="flex items-start justify-between gap-3">
            <span className={impactStatIconBox}>
              <ImpactIcon name={stat.icon} />
            </span>
            <p className="m-0 text-[clamp(1.65rem,2.5vw,2rem)] leading-none font-semibold tracking-tight text-accent">
              {stat.value}
            </p>
          </div>
          <h3 className="mt-3.5 text-[0.9375rem] leading-snug font-semibold text-foreground">
            {stat.label}
          </h3>
          <span className={impactStatAccentLine} aria-hidden />
          <p className="m-0 text-xs leading-snug text-muted">{stat.description}</p>
        </article>
      ))}
    </div>
  );
}
