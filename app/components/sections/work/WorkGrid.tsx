"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { workGrid } from "../../../content/pages/work/grid";

const projectNumbers = new Map(workGrid.projects.map(({ id }, index) => [id, index + 1]));
const total = String(workGrid.projects.length).padStart(2, "0");

export default function WorkGrid() {
  const [active, setActive] = useState(workGrid.filters[0]);
  const items = active === workGrid.filters[0]
    ? workGrid.projects
    : workGrid.projects.filter(({ category }) => category === active);

  return (
    <section className="work-overview-shell work-overview-projects" id="work-projects" aria-label="Project showcase">
      <div className="work-overview-filters" role="group" aria-label="Filter projects">
        {workGrid.filters.map((filter) => (
          <button key={filter} type="button" aria-pressed={active === filter} onClick={() => setActive(filter)}>
            {filter}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{items.length} {items.length === 1 ? "project" : "projects"} shown</p>
      <div className="work-overview-grid">
        {items.map((project) => (
          <article key={project.id} className="work-overview-card">
            <div className="work-overview-card-art" aria-hidden="true">
              <Image src={project.image ?? `/work-art/${project.id}.webp`} alt="" fill sizes="(max-width: 680px) 52vw, 27vw" />
            </div>
            <div className="work-overview-card-copy">
              <p className="work-overview-card-meta">
                <span aria-hidden="true">{String(projectNumbers.get(project.id)).padStart(2, "0")} / {total} · </span>
                {project.category}
              </p>
              <h2>{project.name}</h2>
              <p className="work-overview-description">{project.description}</p>
              <div className="work-overview-tags">
                {project.highlight && <span>{project.highlight}</span>}
                <span>{project.year}</span>
              </div>
              <Link href={`/work/${project.id}`} className="work-overview-case-link" aria-label={`View case study for ${project.name}`} prefetch={false}>
                View Case Study <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <a className="work-overview-live-link" href={project.url} target="_blank" rel="noopener noreferrer"
              aria-label={`Open live project for ${project.name} in a new tab`}>
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
