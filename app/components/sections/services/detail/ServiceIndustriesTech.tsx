import ImpactIcon from "../../home/impact/ImpactIcon";
import { detailPanel, detailSectionTitle, detailTag } from "./service-detail-styles";

type Props = {
  industries: string[];
  techGroups: { label: string; items: string[] }[];
};

export default function ServiceIndustriesTech({ industries, techGroups }: Props) {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-2">
      <div className={detailPanel}>
        <h2 className={detailSectionTitle}>Industries We Serve</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {industries.map((industry) => (
            <div
              key={industry}
              className="flex items-center gap-3 rounded-xl border border-line bg-background/60 px-4 py-3"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--grad-soft)] text-accent">
                <ImpactIcon name="globe" className="[&_svg]:h-4 [&_svg]:w-4" />
              </span>
              <span className="text-sm font-medium text-foreground">{industry}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={detailPanel}>
        <h2 className={detailSectionTitle}>Technology We Work With</h2>
        <div className="mt-6 space-y-5">
          {techGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-muted">
                {group.label}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <span key={tech} className={detailTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
