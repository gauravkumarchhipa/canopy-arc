import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import ArrowIcon from "../../ui/ArrowIcon";
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
            <Heading level={1} id="team-title" data-motion="heading">
              {teamHero.title} <span>{teamHero.titleAccent}.</span>
            </Heading>
            <p className="team-hero-summary">{teamHero.subtitle}</p>
            <div className="team-hero-actions">
              <Button as="a" variant="unstyled" href="#team-directory" className="team-primary">
                Meet the Team <span aria-hidden><ArrowIcon direction="right" /></span>
              </Button>
              <Button variant="unstyled" href="/about#our-values" className="team-culture-link">
                <span aria-hidden><ArrowIcon /></span> Explore Our Culture
              </Button>
            </div>
          </div>
          <SculptureVisual variant="team" compact />
        </div>
      </section>
      <section className="team-stat-strip" aria-labelledby="team-stats-title">
        <div className="team-shell team-stat-inner">
          <Heading className="team-label" id="team-stats-title">Our people<br />{" "}at a glance</Heading>
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
