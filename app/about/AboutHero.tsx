import Button from "../components/ui/Button";
import ArrowIcon from "../components/ui/ArrowIcon";
import StudioHero from "../components/layout/StudioHero";
import Heading from "../components/ui/Heading";
import SculptureVisual from "../components/three/SculptureVisual";
import { aboutHero } from "../content/pages/about/hero";

export function AboutHero() {
  const hero = aboutHero;
  return (
    <StudioHero className="about-hero" aria-labelledby="about-title">
      <div className="about-shell about-hero-inner">
        <div className="about-hero-copy">
          <p className="about-eyebrow">{hero.eyebrow}</p>
          <Heading level={1} id="about-title">{hero.title} <span>{hero.titleAccent}</span></Heading>
          <p className="about-hero-summary">{hero.subtitle}</p>
          <div className="about-actions">
            <Button variant="header-primary" href="/work">
              View Our Work <ArrowIcon direction="right" />
            </Button>
            <Button variant="header-ghost" href="/contact">
              Let&apos;s Talk <ArrowIcon />
            </Button>
          </div>
        </div>
        <SculptureVisual variant="about" compact />
      </div>
    </StudioHero>
  );
}
