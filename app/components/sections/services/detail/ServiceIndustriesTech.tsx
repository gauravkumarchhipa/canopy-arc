import GlowHoverCard from "../../../ui/GlowHoverCard";
import ImpactIcon from "../../home/impact/ImpactIcon";
import {
  detailIndustryIcon,
  detailIndustryItem,
  detailIndustryLabel,
  detailPanelGlow,
  detailSectionTitleHover,
  detailTagHover,
  detailTechGroupLabel,
} from "./service-detail-styles";

type Props = {
  industries: string[];
  techGroups: { label: string; items: string[] }[];
};

export default function ServiceIndustriesTech({ industries, techGroups }: Props) {
  return (
    <section className="mt-8 grid gap-5 overflow-visible p-1 lg:grid-cols-2">
      <GlowHoverCard className={detailPanelGlow}>
        <h2 className={detailSectionTitleHover}>Industries We Serve</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {industries.map((industry) => (
            <div key={industry} className={detailIndustryItem}>
              <span className={detailIndustryIcon}>
                <ImpactIcon name="globe" />
              </span>
              <span className={detailIndustryLabel}>{industry}</span>
            </div>
          ))}
        </div>
      </GlowHoverCard>

      <GlowHoverCard className={detailPanelGlow}>
        <h2 className={detailSectionTitleHover}>Technology We Work With</h2>
        <div className="mt-6 space-y-5">
          {techGroups.map((group) => (
            <div key={group.label}>
              <p className={detailTechGroupLabel}>{group.label}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <span key={tech} className={detailTagHover}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlowHoverCard>
    </section>
  );
}
