import Link from "next/link";
import { notFound } from "next/navigation";
import { workGrid } from "../../content/pages/work/grid";
import Button from "../../components/ui/Button";

export default async function WorkDetailPage({
  params
}: {
  params: { id: string };
}) {
  const id = params?.id;
  const project = workGrid.projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className="pt-24 sm:pt-28 pb-18 sm:pb-24">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <Link href="/work" className="text-sm text-muted hover:text-foreground">
          ← Back to Our Work
        </Link>

        <section className="mt-6 rounded-3xl border border-line bg-surface overflow-hidden">
          <div className="relative px-6 sm:px-10 py-10 sm:py-12">
            <div className="relative">
              <p className="text-xs tracking-[0.25em] uppercase text-muted">
                {project.category}
              </p>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">
                {project.title}
              </h1>
              <p className="mt-4 text-muted max-w-3xl leading-relaxed">
                {project.subtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button href="/contact" className="text-sm">
                  Start a Project →
                </Button>
                <Button href="/services" variant="ghost" className="text-sm">
                  Explore Services
                </Button>
              </div>

              <div className="mt-9 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-background/60 px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid lg:grid-cols-12 gap-6 lg:gap-8">
          <section className="lg:col-span-8 rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <h2 className="text-sm font-semibold text-foreground/90">
              Project Overview
            </h2>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              This case study page is driven from the common JSON. Add richer
              content (problem, approach, results, screenshots) to the matching
              project file under `app/content/pages/work/grid.json` to match your final
              portfolio content exactly.
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-background/60 p-5">
              <p className="text-xs tracking-[0.2em] uppercase text-muted">
                Deliverables
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                  Responsive UI with modern interactions
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                  Performance-first implementation (images, code-splitting)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                  Clean, scalable component architecture
                </li>
              </ul>
            </div>
          </section>

          <aside className="lg:col-span-4 rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <h2 className="text-sm font-semibold text-foreground/90">
              Project Info
            </h2>
            <div className="mt-5 space-y-3 text-sm text-muted">
              <div className="flex items-center justify-between gap-3">
                <span>Category</span>
                <span className="text-foreground/85">{project.category}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Stack</span>
                <span className="text-foreground/85">{project.tags.join(", ")}</span>
              </div>
            </div>
            <div className="mt-8">
              <Button href="/contact" className="w-full justify-center text-sm">
                Contact Us →
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

