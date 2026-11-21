import { StoryImpactAndCommitments, StoryCapabilities, StoryProjects, StoryContact } from "./StoryEpilogueSections";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ArrowIcon from "../../ui/ArrowIcon";
import Link from "next/link";
import { servicesGrid } from "../../../content/pages/services/grid";
import ServiceIcon from "../services/ServiceIcon";
import { chapters } from "./story-chapters";

const services = new Map(servicesGrid.cards.map((service) => [service.id, service]));

export function HomeChapters() {
  return chapters.map((chapter, index) => {
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
            <Heading level={index === 0 ? 1 : 2} id={`${chapter.id}-title`} tabIndex={-1}>
              {chapter.title.map((line) => <span key={line}>{line} </span>)}
            </Heading>
            <p className="story-description">{chapter.description}</p>
            {index === 0 && (
              <div className="story-actions">
                <Button as="a" variant="story-primary" href="#the-structure" data-story-jump="1">Start the Journey <span aria-hidden="true"><ArrowIcon direction="right" /></span></Button>
                <Button variant="story-ghost" href="/about">
                  Our story <ArrowIcon />
                </Button>
              </div>
            )}
            {index === chapters.length - 1 && (
              <div className="story-actions">
                <Button as="a" variant="story-primary" href="#capabilities">Explore our services <span aria-hidden="true"><ArrowIcon direction="right" /></span></Button>
                <Button as="a" variant="story-text" href="#selected-work">See our work <span aria-hidden="true"><ArrowIcon direction="down" /></span></Button>
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
  return (
    <div className="story-epilogue">
      <StoryImpactAndCommitments />

      <StoryCapabilities />

      <StoryProjects />

      <StoryContact />
    </div>
  );
}
