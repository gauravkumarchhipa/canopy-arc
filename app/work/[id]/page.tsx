import Link from "next/link";
import { notFound } from "next/navigation";
import { workGrid } from "../../content/pages/work/grid";
import { tw } from "../../lib/tw";
import WorkProductIcon from "../../components/sections/work/WorkProductIcon";
import { ExternalLinkIcon } from "../../components/sections/work/work-product-icons";

export default async function WorkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;
  const project = workGrid.projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className={tw.pageShell}>
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <Link href="/work" className="text-sm text-muted hover:text-foreground">
          ← Back to Our Work
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {project.category} • {project.year}
              </p>
              <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
                {project.name}
              </h1>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted">{project.description}</p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}
                >
                  Open Live Project →
                </a>
                <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}>
                  Start a Project
                </Link>
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

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <section className="rounded-3xl border border-line bg-surface p-6 sm:p-7 lg:col-span-8">
            <h2 className="text-sm font-semibold text-foreground/90">Project Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>
          </section>

          <aside className="rounded-3xl border border-line bg-surface p-6 sm:p-7 lg:col-span-4">
            <h2 className="text-sm font-semibold text-foreground/90">Project Info</h2>
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
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${tw.headerBtnBase} ${tw.headerBtnPrimary} w-full justify-center`}
              >
                <span className="inline-flex items-center gap-2">
                  Visit Live Site
                  <ExternalLinkIcon className="h-4 w-4" />
                </span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
