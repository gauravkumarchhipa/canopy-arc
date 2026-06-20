import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "../../components/ui/Button";
import { servicesGrid } from "../../content/pages/services/grid";
import { tw } from "../../lib/tw";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = servicesGrid.cards.find((c) => c.id === id);
  if (!service) return { title: "Service — Canopy Arc" };
  return {
    title: `${service.title} — Canopy Arc`,
    description: service.subtitle,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = servicesGrid.cards.find((c) => c.id === id);
  if (!service) notFound();

  const related = servicesGrid.cards.filter(
    (c) => c.tag === service.tag && c.id !== service.id
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
                {service.tag}
              </p>
              <span className="rounded-full border border-line bg-background/80 px-3 py-1 text-xs text-muted">
                {service.projects} case studies
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight">
              {service.title}
            </h1>
            <p className="mt-4 max-w-3xl text-muted leading-relaxed">{service.subtitle}</p>

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

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <section className="rounded-3xl border border-line bg-surface p-6 sm:p-7 lg:col-span-8">
            <h2 className="text-sm font-semibold text-foreground/90">Service Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We deliver end-to-end {service.title.toLowerCase()} with enterprise-grade
              architecture, performance, and security. Each engagement includes discovery,
              implementation, QA, and launch support tailored to your business goals.
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-background/60 p-5">
              <p className="text-xs tracking-[0.2em] uppercase text-muted">Deliverables</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {[
                  "Discovery workshop and technical roadmap",
                  "Production-ready implementation with documentation",
                  "Performance, security, and QA validation",
                  "Handover, training, and post-launch support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="rounded-3xl border border-line bg-surface p-6 sm:p-7 lg:col-span-4">
            <h2 className="text-sm font-semibold text-foreground/90">Quick Facts</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-muted">Category</dt>
                <dd className="mt-1 font-medium text-foreground">{service.tag}</dd>
              </div>
              <div>
                <dt className="text-muted">Case Studies</dt>
                <dd className="mt-1 font-medium text-foreground">{service.projects} projects</dd>
              </div>
              <div>
                <dt className="text-muted">Engagement</dt>
                <dd className="mt-1 font-medium text-foreground">Fixed scope or retainer</dd>
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
