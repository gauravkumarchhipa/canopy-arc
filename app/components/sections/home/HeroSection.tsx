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
          <h1 id="hero-title" className="hero-title hero-enter">We build digital<br />experiences that<br /><span>connect &amp; protect.</span></h1>
          <p className="hero-description hero-enter">{hero.subtitle}</p>
          <div className="hero-actions hero-enter">
            <Link className="premium-button" href={hero.primaryCta.href}>{hero.primaryCta.label}<span aria-hidden>↗</span></Link>
            <Link className="editorial-link" href={hero.secondaryCta.href}><span className="story-play" aria-hidden>▷</span>{hero.secondaryCta.label}</Link>
          </div>
        </div>
        <div className="hero-art hero-enter">
          <div className="art-topline editorial-label"><span>THE CANOPY PRINCIPLE</span><span>01 / FORM</span></div>
          <CanopyVisual />
          <div className="art-caption"><span>Many disciplines.<br /><strong>One connected vision.</strong></span><span className="art-caption-symbol" aria-hidden>↗</span></div>
        </div>
        <div className="hero-baseline"><span className="editorial-label">ARC ABOVE ORDINARY.</span><div className="hero-disciplines"><span>Engineering</span><span>Intelligence</span><span>Design</span><span>Security</span></div><a href="#impact" className="scroll-link" aria-label="Discover our impact">Discover below <span aria-hidden>↓</span></a></div>
      </div>
    </section>
  );
}
