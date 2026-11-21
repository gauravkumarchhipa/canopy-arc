import Link from "next/link";
import { servicesGrid } from "../../../content/pages/services/grid";
import impact from "../../../content/pages/home/impact.json";
import { productLinks } from "../../../content/pages/work/grid";
import { nav } from "../../../content/shared/nav";
import { tw } from "../../../lib/tw";
import ServiceIcon from "../services/ServiceIcon";
import AnimatedCounter from "../../ui/AnimatedCounter";
import ImpactIcon from "./impact/ImpactIcon";
import { chapters } from "./story-chapters";

const services = new Map(servicesGrid.cards.map((service) => [service.id, service]));

export function HomeChapters() {
  return chapters.map((chapter, index) => {
    const Heading = index === 0 ? "h1" : "h2";
    return (
      <section
        key={chapter.id}
        data-story-chapter={index}
        className={`story-chapter story-chapter--${chapter.art}`}
        style={{ "--chapter-row": index + 1 } as React.CSSProperties}
        aria-labelledby={`${chapter.id}-title`}
      >
        <div className="story-shell story-chapter-grid">
          <div className="story-copy">
            <p className="story-label">{String(index + 1).padStart(2, "0")} / {chapter.name}</p>
            <Heading id={`${chapter.id}-title`} tabIndex={-1}>
              {chapter.title.map((line) => <span key={line}>{line} </span>)}
            </Heading>
            <p className="story-description">{chapter.description}</p>
            {index === 0 && (
              <div className="story-actions">
                <a className="story-button" href="#the-structure" data-story-jump="1">Start the Journey <span aria-hidden="true">→</span></a>
                <Link className={`story-ghost-button focus-visible:bg-surface ${tw.headerBtnGhost}`} href="/about">
                  Our story <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
            {index === chapters.length - 1 && (
              <div className="story-actions">
                <a className="story-button" href="#capabilities">Explore our services <span aria-hidden="true">→</span></a>
                <a className="story-text-link" href="#selected-work">See our work <span aria-hidden="true">↓</span></a>
              </div>
            )}
          </div>
          {chapter.services.length > 0 && (
            <ul className="story-scene-services" aria-label="Related services">
              {chapter.services.map((id) => {
                const service = services.get(id)!;
                return (
                  <li key={id}>
                    <Link href={`/services/${id}`}>
                      <ServiceIcon name={service.icon} />
                      {service.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    );
  });
}

export function HomeEpilogue() {
  const figures = [impact.featured, ...impact.stats];
  const projects = productLinks.filter(({ id }) => id === "sahai-ai" || id === "pannobaa");

  return (
    <div className="story-epilogue">
      <div className="story-impact-and-commitment" id="story-impact">
        <section className="story-band" aria-labelledby="story-impact-title">
          <div className="story-shell story-impact-grid">
            <h2 className="story-label" id="story-impact-title">{impact.eyebrow}</h2>
            <dl className="story-figures">
              {figures.map((stat) => (
                <div className="story-figure" key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd><AnimatedCounter value={stat.value} viewportInset={80} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="story-band" aria-labelledby="story-commitment-title">
          <div className="story-shell story-editorial-grid">
            <div>
              <p className="story-label">{impact.commitment.title}</p>
              <h2 id="story-commitment-title">The values that shape our work.</h2>
              <p>{impact.commitment.description}</p>
            </div>
            <ul className="story-commitments">
              {impact.commitment.pillars.map((pillar) => (
                <li key={pillar.title}>
                  <ImpactIcon name={pillar.icon} />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="story-band story-capabilities-band" id="capabilities" aria-labelledby="story-services-title">
        <div className="story-shell story-editorial-grid">
          <div>
            <p className="story-label">Our capabilities</p>
            <h2 id="story-services-title">Powerful IT services. <span>Connected solutions.</span></h2>
            <p>From the first idea to enterprise scale, explore the disciplines that bring your digital vision to life.</p>
          </div>
          <div className="story-capabilities">
            {servicesGrid.filters.slice(1).map((category) => (
              <div key={category} className="story-service-group">
                <h3>{category}</h3>
                <ul>
                  {servicesGrid.cards.filter((service) => service.tag === category).map((service) => (
                    <li key={service.id}>
                      <Link href={`/services/${service.id}`}>
                        <ServiceIcon name={service.icon} />
                        <span>{service.title}</span>
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="story-band story-work" id="selected-work" aria-labelledby="story-work-title">
        <div className="story-shell story-editorial-grid">
          <div>
            <p className="story-label">Selected work</p>
            <h2 id="story-work-title">Ideas, made real.</h2>
            <p>See how we turn business challenges into products people can use.</p>
            <Link className="story-text-link" href="/work">Explore all work <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="story-projects">
            {projects.map((project) => (
              <Link key={project.id} href={`/work/${project.id}`} className={`story-project story-project--${project.id}`}>
                <div className="story-project-art" aria-hidden="true" />
                <div className="story-project-copy">
                  <p className="story-label">{project.category}</p>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <span className="story-project-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="story-contact" aria-labelledby="story-contact-title">
        <div className="story-shell">
          <p className="story-label">Your next chapter</p>
          <h2 id="story-contact-title">Extraordinary starts with a conversation.</h2>
          <p>Tell us what you want to build. We’ll work out the next step together.</p>
          <div className="story-actions">
            <Link className="story-button" href={nav.ctaSecondary.href}>{nav.ctaSecondary.label} <span aria-hidden="true">→</span></Link>
            <Link className="story-text-link" href={nav.ctaPrimary.href}>{nav.ctaPrimary.label} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
