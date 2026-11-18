import type { Metadata } from "next";
import Link from "next/link";
import WorkGrid from "../components/sections/work/WorkGrid";
import WorkHeroVisual from "../components/sections/work/WorkHeroVisual";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import { workHero } from "../content/pages/work/hero";
import { workGrid } from "../content/pages/work/grid";
import "./work-overview.css";

export const metadata: Metadata = {
  title: `${workHero.title} ${workHero.titleAccent} — Canopy Arc`,
  description: workHero.subtitle,
};

export default function WorkPage() {
  const featured = workGrid.projects[0];

  return (
    <div className="work-overview">
      <section className="work-overview-hero" aria-labelledby="work-overview-title">
        <div className="work-overview-inset work-overview-hero-inner">
          <div className="work-overview-hero-copy">
            <p className="work-overview-label"><span aria-hidden="true">▪ / </span>{workHero.eyebrow}</p>
            <h1 id="work-overview-title">{workHero.title} <span>{workHero.titleAccent}</span></h1>
            <p className="work-overview-summary">{workHero.subtitle}</p>
            <div className="work-overview-actions">
              <a href="#work-projects" className="work-overview-primary">View All Projects <span aria-hidden="true">→</span></a>
              <Link href={`/work/${featured.id}`} className="work-overview-secondary">
                <span aria-hidden="true">↗</span> View Featured Project
              </Link>
            </div>
          </div>
          <WorkHeroVisual />
        </div>
      </section>

      <section className="work-overview-impact" aria-labelledby="work-overview-impact-title">
        <div className="work-overview-inset work-overview-impact-inner">
          <h2 className="work-overview-label" id="work-overview-impact-title">Our impact<br />{" "}in numbers</h2>
          <dl>
            {workHero.stats.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd><AnimatedCounter value={value} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <WorkGrid />

      <section className="work-overview-shell work-overview-contact" aria-labelledby="work-overview-contact-title">
        <div>
          <h2 id="work-overview-contact-title">Have an idea in mind?</h2>
          <p>Let&apos;s turn your vision into a powerful digital solution.</p>
        </div>
        <Link className="work-overview-primary" href="/contact">Let&apos;s Build Together <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  );
}
