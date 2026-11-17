import { teamHero } from "../../../content/pages/team/hero";
import AnimatedCounter from "../../ui/AnimatedCounter";
import EyebrowPill from "../../ui/EyebrowPill";
import SculptureVisual from "../../three/SculptureVisual";

export default function TeamHero() {
  return (
    <section
      className="premium-container team-hero"
      aria-labelledby="team-title"
    >
      <div className="team-hero-grid">
        <div className="team-hero-copy">
          <EyebrowPill>{teamHero.eyebrow}</EyebrowPill>
          <h1 id="team-title" data-motion="heading">
            {teamHero.title}
            <br />
            <span>{teamHero.titleAccent}.</span>
          </h1>
          <p>{teamHero.subtitle}</p>
          <a href="#team-directory" className="editorial-link">
            Meet the team <span aria-hidden>↘</span>
          </a>
        </div>
        <SculptureVisual variant="team" />
      </div>
      <div className="team-stat-strip">
        {teamHero.stats.map((stat) => (
          <div key={stat.label}>
            <AnimatedCounter value={stat.value} />
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
