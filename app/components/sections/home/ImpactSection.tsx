import { homeImpact } from "../../../content/pages/home/impact";
import AnimatedCounter from "../../ui/AnimatedCounter";
export default function ImpactSection() {
  const impact = homeImpact;
  return (
    <section
      id="impact"
      className="premium-impact premium-container"
      aria-labelledby="impact-title"
    >
      <div className="section-heading">
        <p className="editorial-label">01 / {impact.eyebrow}</p>
        <div>
          <h2 id="impact-title">
            {impact.title}
            <br />
            <span>{impact.titleAccent}.</span>
          </h2>
          <p className="section-description">{impact.subtitle}</p>
        </div>
      </div>
      <div className="impact-numbers">
        {[impact.featured, ...impact.stats].map((stat) => (
          <div className="impact-number" key={stat.label}>
            <strong>
              <AnimatedCounter value={stat.value} />
            </strong>
            <h3>{stat.label}</h3>
            <p>{stat.description}</p>
          </div>
        ))}
      </div>
      <div className="commitment-editorial">
        <div>
          <p className="editorial-label">THE WAY WE WORK</p>
          <h3>{impact.commitment.title}</h3>
          <p>{impact.commitment.description}</p>
        </div>
        <div className="commitment-pillars">
          {impact.commitment.pillars.map((pillar, i) => (
            <div key={pillar.title}>
              <span className="editorial-label">0{i + 1}</span>
              <h4>{pillar.title}</h4>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
