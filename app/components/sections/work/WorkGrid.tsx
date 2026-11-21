"use client";

import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ArrowIcon from "../../ui/ArrowIcon";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import { workGrid } from "../../../content/pages/work/grid";

const projectNumbers = new Map(workGrid.projects.map(({ id }, index) => [id, index + 1]));
const total = String(workGrid.projects.length).padStart(2, "0");
const WorkCardModels = dynamic(() => import("./WorkCardModels"), { ssr: false });

export default function WorkGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(workGrid.filters[0]);
  const items = active === workGrid.filters[0]
    ? workGrid.projects
    : workGrid.projects.filter(({ category }) => category === active);

  return (
    <section className="work-overview-shell work-overview-projects" id="work-projects" aria-label="Project showcase">
      <div className="work-overview-filters" role="group" aria-label="Filter projects">
        {workGrid.filters.map((filter) => (
          <Button variant="unstyled" key={filter} type="button" aria-pressed={active === filter} onClick={() => setActive(filter)}>
            {filter}
          </Button>
        ))}
      </div>
      <p className="sr-only" role="status">{items.length} {items.length === 1 ? "project" : "projects"} shown</p>
      <p className="sr-only" id="work-card-model-instructions">Drag the model or use the arrow keys to rotate it.</p>
      <div className="work-overview-grid" ref={gridRef}>
        {items.map((project) => (
          <article key={project.id} className="work-overview-card" data-model-card>
            <div className="work-overview-card-copy">
              <p className="work-overview-card-meta">
                <span aria-hidden="true">{String(projectNumbers.get(project.id)).padStart(2, "0")} / {total} · </span>
                {project.category}
              </p>
              <Heading>{project.name}</Heading>
              <p className="work-overview-description">{project.description}</p>
              <div className="work-overview-tags">
                {project.highlight && <span>{project.highlight}</span>}
                <span>{project.year}</span>
              </div>
              <Link href={`/work/${project.id}`} className="work-overview-case-link" aria-label={`View case study for ${project.name}`} prefetch={false}>
                View Case Study <span aria-hidden="true"><ArrowIcon /></span>
                <canvas className="work-overview-card-art" data-card-model={project.id} aria-hidden="true" />
              </Link>
            </div>
            <a className="work-overview-live-link" href={project.url} target="_blank" rel="noopener noreferrer"
              aria-label={`Open live project for ${project.name} in a new tab`}>
              <span aria-hidden="true"><ArrowIcon /></span>
            </a>
          </article>
        ))}
      </div>
      <WorkCardModels gridRef={gridRef} />
    </section>
  );
}
