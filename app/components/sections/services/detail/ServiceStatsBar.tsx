import { SERVICE_BOTTOM_STATS } from "../../../../content/pages/services/detail-shared";
import ImpactIcon from "../../home/impact/ImpactIcon";

export default function ServiceStatsBar() {
  return (
    <section className="mt-8 grid gap-4 rounded-[1.25rem] border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
      {SERVICE_BOTTOM_STATS.map((stat) => (
        <div key={stat.label} className="flex items-center gap-3 px-2 py-1">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--grad-soft)] text-accent">
            <ImpactIcon name={stat.icon} className="[&_svg]:h-5 [&_svg]:w-5" />
          </span>
          <div>
            <p className="text-xl font-semibold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted">{stat.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
