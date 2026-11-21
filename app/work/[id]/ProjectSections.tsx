import Heading from "../../components/ui/Heading";
import Button from "../../components/ui/Button";
import ArrowIcon from "../../components/ui/ArrowIcon";
import { workGrid } from "../../content/pages/work/grid";
import WorkProductIcon from "../../components/sections/work/WorkProductIcon";
import { ExternalLinkIcon } from "../../components/sections/work/work-product-icons";
import Image from "next/image";

type Project = (typeof workGrid.projects)[number];

type ProjectProps = { project: Project };

export function ProjectHero({ project }: ProjectProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface">
      <div className="relative px-6 py-10 sm:px-10 sm:py-12">
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {project.category} • {project.year}
          </p>
          <Heading level={1} className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            {project.name}
          </Heading>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{project.description}</p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button as="a" variant="header-primary"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Live Project <ArrowIcon direction="right" />
            </Button>
            <Button variant="header-ghost" href="/contact">
              Start a Project
            </Button>
          </div>

          {project.highlight ? (
            <div className="mt-9">
              <span className="rounded-full border border-line bg-background/60 px-3 py-1 text-xs text-muted">
                {project.highlight}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function ProjectOverview({ project }: ProjectProps) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-6 sm:p-7 lg:col-span-8">
      <Heading className="text-sm font-semibold text-foreground/90">Project Overview</Heading>
      <p className="mt-4 text-sm leading-relaxed text-muted">{project.overview ?? project.description}</p>
      {project.image && (
        <Image src={project.image} alt={`${project.name} website preview`} width={1120} height={700}
          sizes="(max-width: 1023px) 90vw, 60vw" className="mt-6 h-auto w-full rounded-xl border border-line" />
      )}
    </section>
  );
}

export function ProjectInfo({ project }: ProjectProps) {
  return (
    <aside className="rounded-3xl border border-line bg-surface p-6 sm:p-7 lg:col-span-4">
      <Heading className="text-sm font-semibold text-foreground/90">Project Info</Heading>
      <div className="mt-5 space-y-3 text-sm text-muted">
        <div className="flex items-center justify-between gap-3">
          <span>Category</span>
          <span className="text-foreground/85">{project.category}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span>Year</span>
          <span className="text-foreground/85">{project.year}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span>Type</span>
          <span className="inline-flex items-center gap-2 text-foreground/85">
            <WorkProductIcon name={project.icon} className="[&_svg]:h-4 [&_svg]:w-4" />
            {project.icon}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <Button as="a" variant="header-primary"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full justify-center`}
        >
          <span className="inline-flex items-center gap-2">
            Visit Live Site
            <ExternalLinkIcon className="h-4 w-4" />
          </span>
        </Button>
      </div>
    </aside>
  );
}
