import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "../../components/ui/Button";
import {
  getServiceById,
  servicesGrid,
} from "../../content/pages/services/grid";
import { tw } from "../../lib/tw";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return servicesGrid.cards.map((card) => ({ id: card.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) return { title: "Service — Canopy Arc" };
  return {
    title: `${service.name} — Canopy Arc`,
    description: service.description,
  };
}

function formatSubDomainTags(subDomains: string[]) {
  const visible = subDomains.slice(0, 4);
  const remaining = subDomains.length - visible.length;
  return remaining > 0 ? [...visible, `+${remaining} more`] : visible;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) notFound();

  const related = servicesGrid.cards.filter(
    (card) => card.tag === service.category && card.id !== service.id
  );

  return (
    <div className={tw.pageShell}>
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <Link href="/services" className="text-sm text-muted hover:text-foreground">
          ← Back to Services
        </Link>

        <section className="group relative mt-6 overflow-hidden rounded-3xl border border-[rgba(37,99,235,0.14)] bg-[rgba(255,255,255,0.92)] shadow-[0_24px_60px_-32px_rgba(37,99,235,0.32)] backdrop-blur-[10px] [html[data-theme=dark]_&]:border-[rgba(248,250,252,0.1)] [html[data-theme=dark]_&]:bg-[rgba(248,250,252,0.04)]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(59,130,246,0.12),transparent_55%)]"
            aria-hidden
          />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent">
                {service.category}
              </p>
              <span className="rounded-full border border-line bg-background/80 px-3 py-1 text-xs text-muted">
                {service.caseStudies.length} Projects
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-2 text-sm font-medium text-foreground/80">{service.tagline}</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{service.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {formatSubDomainTags(service.subDomains).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-background/60 px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href="/contact" className="text-sm">
                Start a Project →
              </Button>
              <Button href="/work" variant="ghost" className="text-sm">
                View Our Work
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground/90">Project Case Studies</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                {service.caseStudies.length} detailed project case studies with full
                explanations, tech stacks, and deliverables.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {service.caseStudies.map((study, index) => (
              <article
                key={study.id}
                className="rounded-3xl border border-line bg-surface p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                    Case Study {String(index + 1).padStart(2, "0")}
                  </p>
                  {study.year ? (
                    <span className="text-xs text-muted">{study.year}</span>
                  ) : null}
                </div>

                <h3 className="mt-3 font-display text-xl tracking-tight text-foreground">
                  {study.title}
                </h3>
                {study.client ? (
                  <p className="mt-1 text-xs text-muted">{study.client}</p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-muted">{study.description}</p>

                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted">Challenge</p>
                    <p className="mt-2 leading-relaxed text-muted">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted">Solution</p>
                    <p className="mt-2 leading-relaxed text-muted">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted">Outcome</p>
                    <p className="mt-2 leading-relaxed text-muted">{study.outcome}</p>
                  </div>
                </div>

                {study.technologies.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line bg-background/60 px-2.5 py-1 text-[0.6875rem] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                {study.deliverables.length > 0 ? (
                  <div className="mt-5 rounded-2xl border border-line bg-background/60 p-4">
                    <p className="text-xs tracking-[0.18em] uppercase text-muted">Deliverables</p>
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {study.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <section className="rounded-3xl border border-line bg-surface p-6 sm:p-7 lg:col-span-8">
            <h2 className="text-sm font-semibold text-foreground/90">Capabilities</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We deliver end-to-end {service.name.toLowerCase()} across{" "}
              {service.subDomains.slice(0, 3).join(", ")}
              {service.subDomains.length > 3 ? ", and more." : "."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.subDomains.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line bg-background/60 px-3 py-1 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-line bg-surface p-6 sm:p-7 lg:col-span-4">
            <h2 className="text-sm font-semibold text-foreground/90">Quick Facts</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-muted">Category</dt>
                <dd className="mt-1 font-medium text-foreground">{service.category}</dd>
              </div>
              <div>
                <dt className="text-muted">Case Studies</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {service.caseStudies.length} projects
                </dd>
              </div>
              <div>
                <dt className="text-muted">Tagline</dt>
                <dd className="mt-1 font-medium text-foreground">{service.tagline}</dd>
              </div>
            </dl>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-sm font-semibold text-foreground/90">Related Services</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {item.title} →
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
