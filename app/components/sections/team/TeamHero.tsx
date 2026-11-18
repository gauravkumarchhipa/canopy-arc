import Link from "next/link";
import { teamHero } from "../../../content/pages/team/hero";
import AnimatedCounter from "../../ui/AnimatedCounter";
import SculptureVisual from "../../three/SculptureVisual";

export default function TeamHero() {
  return (
    <>
      <section className="team-hero" aria-labelledby="team-title">
        <div className="team-shell team-hero-inner">
          <div className="team-hero-copy">
            <p className="team-label team-hero-label">{teamHero.eyebrow}</p>
            <h1 id="team-title" data-motion="heading">
              {teamHero.title} <span>{teamHero.titleAccent}.</span>
            </h1>
            <p className="team-hero-summary">{teamHero.subtitle}</p>
            <div className="team-hero-actions">
              <a href="#team-directory" className="team-primary">
                Meet the Team <span aria-hidden>→</span>
              </a>
              <Link href="/about#our-values" className="team-culture-link">
                <span aria-hidden>↗</span> Explore Our Culture
              </Link>
            </div>
          </div>
          <SculptureVisual variant="team" compact />
        </div>
      </section>
      <section className="team-stat-strip" aria-labelledby="team-stats-title">
        <div className="team-shell team-stat-inner">
          <h2 className="team-label" id="team-stats-title">Our people<br />{" "}at a glance</h2>
          <dl>
            {teamHero.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd><AnimatedCounter value={stat.value} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
