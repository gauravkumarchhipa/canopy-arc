import Heading from "../components/ui/Heading";
import StudioHero from "../components/layout/StudioHero";
import Button from "../components/ui/Button";
import ArrowIcon from "../components/ui/ArrowIcon";
import WorkHeroVisual from "../components/sections/work/WorkHeroVisual";
import StudioMetrics from "../components/layout/StudioMetrics";
import { workHero } from "../content/pages/work/hero";
import { workGrid } from "../content/pages/work/grid";

export function WorkHero() {
  const featured = workGrid.projects[0];
  return (
    <StudioHero className="work-overview-hero" aria-labelledby="work-overview-title">
      <div className="work-overview-inset work-overview-hero-inner">
        <div className="work-overview-hero-copy">
          <p className="work-overview-label"><span aria-hidden="true">▪ / </span>{workHero.eyebrow}</p>
          <Heading level={1} id="work-overview-title">{workHero.title} <span>{workHero.titleAccent}</span></Heading>
          <p className="work-overview-summary">{workHero.subtitle}</p>
          <div className="work-overview-actions">
            <Button as="a" variant="unstyled" href="#work-projects" className="work-overview-primary">View All Projects <span aria-hidden="true"><ArrowIcon direction="right" /></span></Button>
            <Button variant="unstyled" href={`/work/${featured.id}`} className="work-overview-secondary">
              <span aria-hidden="true"><ArrowIcon /></span> View Featured Project
            </Button>
          </div>
        </div>
        <WorkHeroVisual />
      </div>
    </StudioHero>
  );
}

export function WorkImpact() {
  return (
    <StudioMetrics
      headingId="work-overview-impact-title"
      title="Our impact in numbers"
      shellClassName="work-overview-inset"
      figures={workHero.stats}
    />
  );
}

export function WorkContact() {
  return (
    <section className="work-overview-shell work-overview-contact" aria-labelledby="work-overview-contact-title">
      <div>
        <Heading id="work-overview-contact-title">Have an idea in mind?</Heading>
        <p>Let&apos;s turn your vision into a powerful digital solution.</p>
      </div>
      <Button variant="unstyled" className="work-overview-primary" href="/contact">Let&apos;s Build Together <span aria-hidden="true"><ArrowIcon direction="right" /></span></Button>
    </section>
  );
}
