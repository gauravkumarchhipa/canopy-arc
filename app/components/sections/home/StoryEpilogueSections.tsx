import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ArrowIcon from "../../ui/ArrowIcon";
import Link from "next/link";
import { servicesGrid } from "../../../content/pages/services/grid";
import impact from "../../../content/pages/home/impact.json";
import { productLinks } from "../../../content/pages/work/grid";
import { nav } from "../../../content/shared/nav";
import ServiceIcon from "../services/ServiceIcon";
import AnimatedCounter from "../../ui/AnimatedCounter";
import ImpactIcon from "./impact/ImpactIcon";
import StoryStill from "./StoryStill";
import { lastChapter } from "./story-chapters";

const featuredProjectDescriptions: Partial<Record<string, string>> = {
  "sahai-ai": "AI-powered platform delivering intelligent assistance and automation for modern business workflows and decision support.",
  pannobaa: "Professional advisory platform simplifying accounting and compliance for startups — streamlined financial guidance and regulatory support.",
};

export function StoryImpactAndCommitments() {
  const figures = [impact.featured, ...impact.stats];
  return (
    <div className="story-impact-and-commitment" id="story-impact">
      <section id="impact" className="story-band story-impact-band" aria-labelledby="story-impact-title">
        <div className="story-shell">
          <Heading className="story-label" id="story-impact-title">{impact.eyebrow}</Heading>
          <dl className="story-figures">
            {figures.map((stat, index) => (
              <div className={index === 0 ? "story-figure story-figure--featured" : "story-figure"} key={stat.label}>
                <dt>{stat.label}</dt>
                <dd><AnimatedCounter value={stat.value} viewportInset={80} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="story-band story-commitment-band" aria-labelledby="story-commitment-title">
        <div className="story-shell story-editorial-grid">
          <div data-motion>
            <p className="story-label">{impact.commitment.title}</p>
            <Heading id="story-commitment-title">The values that shape our work.</Heading>
            <p>{impact.commitment.description}</p>
          </div>
          <ul className="story-commitments" data-motion>
            {impact.commitment.pillars.map((pillar) => (
              <li key={pillar.title}>
                <ImpactIcon name={pillar.icon} className="story-commitment-icon" />
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export function StoryCapabilities() {
  return (
    <section className="story-band story-capabilities-band" id="capabilities" aria-labelledby="story-services-title">
      <div className="story-shell">
        <div className="story-capabilities-intro">
          <div className="story-capabilities-copy">
            <p className="story-label">Our capabilities</p>
            <Heading id="story-services-title">Design, build, <span>and protect.</span></Heading>
            <p>Explore the services behind each stage, from interface design to cloud operations and security testing.</p>
          </div>
          <div className="story-capabilities-art" aria-hidden="true">
            <StoryStill pose={2} instance="capabilities" />
          </div>
        </div>
        <div className="story-capabilities">
          {servicesGrid.filters.slice(1).map((category) => (
            <div key={category} className="story-service-group">
              <h3>{category}</h3>
              <ul>
                {servicesGrid.cards.filter((service) => service.tag === category).map((service) => (
                  <li key={service.id}>
                    <Link href={`/services/${service.id}`}>
                      <ServiceIcon name={service.icon} className="story-service-icon" />
                      <span>{service.title}</span>
                      <ArrowIcon className="story-service-arrow" />
                      <span className="story-service-preview" aria-hidden="true">{service.subtitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoryProjects() {
  const projects = productLinks.filter(({ id }) => featuredProjectDescriptions[id]);
  return (
    <section className="story-band story-work" id="selected-work" aria-labelledby="story-work-title">
      <div className="story-shell story-editorial-grid">
        <div>
          <p className="story-label">Selected work</p>
          <Heading id="story-work-title">Ideas, made real.</Heading>
          <p>Two different applications of the same approach, from family care to business compliance.</p>
          <Button variant="story-text" href="/work">Explore all work <span aria-hidden="true"><ArrowIcon /></span></Button>
        </div>
        <div className="story-projects">
          {projects.map((project) => (
            <Link key={project.id} href={`/work/${project.id}`} className={`story-project story-project--${project.id}`}>
              <span className="story-project-art" aria-hidden="true" />
              <div className="story-project-copy">
                <p className="story-label">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{featuredProjectDescriptions[project.id]}</p>
              </div>
              <span className="story-project-arrow" aria-hidden="true"><ArrowIcon /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoryContact() {
  return (
    <section className="story-contact" aria-labelledby="story-contact-title">
      <StoryStill pose={lastChapter} instance="contact" />
      <div className="story-shell">
        <p className="story-label">Your next chapter</p>
        <Heading id="story-contact-title">Extraordinary starts with a conversation.</Heading>
        <p>Tell us what you want to build. We’ll work out the next step together.</p>
        <div className="story-actions">
          <Button variant="story-primary" href={nav.ctaSecondary.href}>{nav.ctaSecondary.label} <span aria-hidden="true"><ArrowIcon direction="right" /></span></Button>
          <Button variant="story-text" href={nav.ctaPrimary.href}>{nav.ctaPrimary.label} <span aria-hidden="true"><ArrowIcon /></span></Button>
        </div>
      </div>
    </section>
  );
}
