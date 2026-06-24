import GlowHoverCard from "../../components/ui/GlowHoverCard";
import ServiceIcon from "../../components/sections/services/ServiceIcon";
import { PILLARS } from "./about-data";
import { aboutPillarBody, aboutPillarIcon, aboutPillarTitle } from "./about-styles";

export default function AboutPillarsSection() {
  return (
    <section className="mx-auto mt-12 max-w-350 px-6 sm:mt-14 lg:px-10">
      <div className="grid gap-5 overflow-visible p-1 md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <GlowHoverCard key={pillar.title} className="rounded-3xl p-6">
            <span className={aboutPillarIcon}>
              <ServiceIcon name={pillar.icon} />
            </span>
            <h2 className={`${aboutPillarTitle} mt-5`}>{pillar.title}</h2>
            <p className={aboutPillarBody}>{pillar.body}</p>
          </GlowHoverCard>
        ))}
      </div>
    </section>
  );
}
