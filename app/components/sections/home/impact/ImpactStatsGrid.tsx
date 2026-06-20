import { impactStatCard } from "./impact-styles";
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
        <article key={stat.label} className={impactStatCard}>
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[0.7rem] border border-[rgba(37,99,235,0.14)] bg-[rgba(37,99,235,0.08)] text-accent [&_svg]:h-4.5 [&_svg]:w-4.5">
              <ImpactIcon name={stat.icon} />
            </span>
            <p className="m-0 text-[clamp(1.65rem,2.5vw,2rem)] leading-none font-semibold tracking-tight text-accent">
              {stat.value}
            </p>
          </div>
          <h3 className="mt-3.5 text-[0.9375rem] leading-snug font-semibold text-foreground">
            {stat.label}
          </h3>
          <span
            className="mt-2.5 mb-2 block h-0.5 w-8 rounded-full bg-[linear-gradient(90deg,var(--accent),rgba(6,182,212,0.65))]"
            aria-hidden
          />
          <p className="m-0 text-xs leading-snug text-muted">{stat.description}</p>
        </article>
      ))}
    </div>
  );
}
