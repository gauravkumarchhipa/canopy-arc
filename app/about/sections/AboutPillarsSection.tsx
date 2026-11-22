import Heading from "../../components/ui/Heading";
import ServiceIcon from "../../components/sections/services/ServiceIcon";
import { PILLARS } from "./about-data";

export default function AboutPillarsSection() {
  return (
    <section className="about-section" aria-labelledby="about-approach-title">
      <div className="about-shell">
        <Heading className="sr-only" id="about-approach-title">Our approach</Heading>
        <div className="about-card-grid md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="about-card">
              <span className="about-pillar-icon">
                <ServiceIcon name={pillar.icon} />
              </span>
              <Heading level={3} className="about-card-title mt-5">{pillar.title}</Heading>
              <p className="about-card-copy">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
