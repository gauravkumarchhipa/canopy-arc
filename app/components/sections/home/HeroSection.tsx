import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { Play } from "lucide-react";
import ArrowIcon from "../../ui/ArrowIcon";
import Link from "next/link";
import { homeHero } from "../../../content/pages/home/hero";
import CanopyVisual from "./CanopyVisual";

export default function HeroSection() {
  const hero = homeHero;
  return (
    <section className="premium-hero" aria-labelledby="hero-title">
      <div className="premium-container hero-composition">
        <div className="hero-copy">
          <p className="editorial-label hero-enter"><span className="small-square" />{hero.eyebrow}</p>
          <Heading level={1} id="hero-title" className="hero-title hero-enter">We build digital<br />experiences that<br /><span>connect &amp; protect.</span></Heading>
          <p className="hero-description hero-enter">{hero.subtitle}</p>
          <div className="hero-actions hero-enter">
            <Button variant="unstyled" className="premium-button" href={hero.primaryCta.href}>{hero.primaryCta.label}<span aria-hidden><ArrowIcon /></span></Button>
            <Link className="editorial-link" href={hero.secondaryCta.href}><span className="story-play" aria-hidden><Play size="1em" focusable="false" /></span>{hero.secondaryCta.label}</Link>
          </div>
        </div>
        <div className="hero-art hero-enter">
          <div className="art-topline editorial-label"><span>THE CANOPY PRINCIPLE</span><span>01 / FORM</span></div>
          <CanopyVisual />
          <div className="art-caption"><span>Many disciplines.<br /><strong>One connected vision.</strong></span><span className="art-caption-symbol" aria-hidden><ArrowIcon /></span></div>
        </div>
        <div className="hero-baseline"><span className="editorial-label">ARC ABOVE ORDINARY.</span><div className="hero-disciplines"><span>Engineering</span><span>Intelligence</span><span>Design</span><span>Security</span></div><a href="#impact" className="scroll-link" aria-label="Discover our impact">Discover below <span aria-hidden><ArrowIcon direction="down" /></span></a></div>
      </div>
    </section>
  );
}
