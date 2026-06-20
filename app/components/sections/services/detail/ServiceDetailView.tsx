import Link from "next/link";
import type { Service } from "../../../../content/pages/services/services";
import { getGridCardById } from "../../../../content/pages/services/grid";
import {
  buildIndustries,
  buildWhatWeBuild,
  bucketTechnologies,
  SERVICE_BOTTOM_STATS,
  SERVICE_HERO_STATS,
  SERVICE_PROCESS_STEPS,
  SERVICE_WHY_CHOOSE,
} from "../../../../content/pages/services/detail-shared";
import ImpactIcon from "../../home/impact/ImpactIcon";
import ServiceIcon from "../ServiceIcon";
import {
  detailBadge,
  detailCaseCard,
  detailCaseImage,
  detailCheckIcon,
  detailCheckItem,
  detailCtaSection,
  detailPanel,
  detailSectionSubtitle,
  detailSectionTitle,
  detailStatPill,
  detailTag,
} from "./service-detail-styles";
import { tw } from "../../../../lib/tw";

type Props = {
  service: Service;
  related: { id: string; title: string }[];
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatSubDomainTags(subDomains: string[]) {
  const visible = subDomains.slice(0, 4);
  const remaining = subDomains.length - visible.length;
  return remaining > 0 ? [...visible, `+${remaining} more`] : visible;
}

function buildPageData(service: Service) {
  const card = getGridCardById(service.id);
  const allDeliverables = service.caseStudies.flatMap((study) => study.deliverables);
  const allTechnologies = [
    ...new Set([
      ...service.subDomains,
      ...service.caseStudies.flatMap((study) => study.technologies),
    ]),
  ];
  const clients = service.caseStudies.map((study) => study.client ?? "").filter(Boolean);
  const featuredStudies = service.caseStudies.slice(0, 4);
  const testimonialStudy = service.caseStudies[0];

  return {
    card,
    whatWeBuild: buildWhatWeBuild(service.subDomains, allDeliverables),
    industries: buildIndustries(clients),
    techGroups: bucketTechnologies(allTechnologies),
    featuredStudies,
    testimonialStudy,
  };
}

function ServiceHeroVisual({ iconName }: { iconName: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18),transparent_68%)]"
        aria-hidden
      />
      <div className="relative rounded-[1.5rem] border border-line bg-[linear-gradient(145deg,rgba(37,99,235,0.12),rgba(6,182,212,0.08))] p-5 sm:p-6">
        <div className="rounded-[1rem] border border-line bg-background/80 p-3 shadow-[0_24px_60px_-32px_rgba(37,99,235,0.45)]">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-line bg-surface p-2.5"
              >
                <div className="h-2 w-8 rounded bg-accent/25" />
                <div className="mt-2 h-6 rounded bg-accent/15" />
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-[1.2fr_0.8fr] gap-2">
            <div className="rounded-lg border border-line bg-surface p-2.5">
              <div className="h-16 rounded-md bg-[image:var(--grad-soft)]" />
            </div>
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-4 rounded bg-accent/12" />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -right-2 top-8 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-background text-accent shadow-lg sm:-right-4 sm:h-14 sm:w-14">
          <ServiceIcon name={iconName} className="[&_svg]:h-6 [&_svg]:w-6" />
        </div>
        <div className="absolute -left-2 bottom-10 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-background text-accent shadow-lg sm:-left-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailView({ service, related }: Props) {
  const { card, whatWeBuild, industries, techGroups, featuredStudies, testimonialStudy } =
    buildPageData(service);

  return (
    <div className={tw.pageShell}>
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span aria-hidden>›</span>
          <Link href="/services" className="transition-colors hover:text-foreground">
            Services
          </Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">{service.name}</span>
        </nav>

        {/* Hero */}
        <section className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-line bg-surface p-6 sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(59,130,246,0.12),transparent_55%)]"
            aria-hidden
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <div className="flex items-start gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-[image:var(--grad-soft)] text-accent [&_svg]:h-7 [&_svg]:w-7">
                  <ServiceIcon name={card?.icon ?? "code"} />
                </span>
                <div>
                  <span className={detailBadge}>Core Service</span>
                  <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem]">
                    {service.name}
                  </h1>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {service.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {formatSubDomainTags(service.subDomains).map((tag) => (
                  <span key={tag} className={detailTag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {SERVICE_HERO_STATS.map((stat) => (
                  <div key={stat.label} className={detailStatPill}>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--grad-soft)] text-accent">
                      <ImpactIcon name={stat.icon} className="[&_svg]:h-4 [&_svg]:w-4" />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#case-studies"
                  className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}
                >
                  View Case Studies →
                </Link>
                <Link
                  href="/contact"
                  className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            <ServiceHeroVisual iconName={card?.icon ?? "code"} />
          </div>
        </section>

        {/* Info grid */}
        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className={detailPanel}>
            <h2 className={detailSectionTitle}>What We Build</h2>
            <ul className="mt-5 space-y-3">
              {whatWeBuild.map((item) => (
                <li key={item} className={detailCheckItem}>
                  <span className={detailCheckIcon}>
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={detailPanel}>
            <h2 className={detailSectionTitle}>Our Development Process</h2>
            <ol className="mt-5 space-y-4">
              {SERVICE_PROCESS_STEPS.map((step) => (
                <li key={step.step} className="flex gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[image:var(--grad)] text-xs font-semibold text-white">
                    {step.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={detailPanel}>
            <h2 className={detailSectionTitle}>Why Choose Canopy Arc?</h2>
            <ul className="mt-5 space-y-3">
              {SERVICE_WHY_CHOOSE.map((item) => (
                <li key={item} className={detailCheckItem}>
                  <span className={detailCheckIcon}>
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {testimonialStudy ? (
              <blockquote className="mt-6 rounded-2xl border border-line bg-background/60 p-5">
                <p className="text-sm italic leading-relaxed text-muted">
                  &ldquo;{testimonialStudy.outcome}&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--grad-soft)] text-sm font-semibold text-accent">
                    {(testimonialStudy.client ?? "CA").slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonialStudy.client ?? "Client Partner"}
                    </p>
                    <p className="text-xs text-muted">{service.name} Project</p>
                  </div>
                </footer>
              </blockquote>
            ) : null}
          </div>
        </section>

        {/* Featured case studies */}
        <section id="case-studies" className="mt-12 scroll-mt-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className={detailSectionTitle}>Featured Case Studies</h2>
              <p className={detailSectionSubtitle}>
                {service.caseStudies.length} detailed project case studies with full
                explanations, tech stacks, and deliverables.
              </p>
            </div>
            <Link
              href="/work"
              className="text-sm font-medium text-accent transition-colors hover:text-foreground"
            >
              View All Projects →
            </Link>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredStudies.map((study) => (
              <article key={study.id} className={detailCaseCard}>
                <div className={detailCaseImage}>
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(6,182,212,0.12),rgba(124,58,237,0.16))]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-4xl font-semibold text-accent/35">
                      {(study.client ?? study.title).slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="absolute left-3 top-3 rounded-full border border-line bg-background/85 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-accent">
                    {service.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg leading-snug tracking-tight text-foreground">
                    {study.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {study.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {study.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-full bg-background/80 px-2 py-0.5 text-[0.6875rem] text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`#study-${study.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-foreground"
                  >
                    View Case Study →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Stats bar */}
        <section className="mt-8 grid gap-4 rounded-[1.25rem] border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
          {SERVICE_BOTTOM_STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 px-2 py-1">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--grad-soft)] text-accent">
                <ImpactIcon name={stat.icon} className="[&_svg]:h-5 [&_svg]:w-5" />
              </span>
              <div>
                <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Industries + Technology */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className={detailPanel}>
            <h2 className={detailSectionTitle}>Industries We Serve</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="flex items-center gap-3 rounded-xl border border-line bg-background/60 px-4 py-3"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--grad-soft)] text-accent">
                    <ImpactIcon name="globe" className="[&_svg]:h-4 [&_svg]:w-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{industry}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={detailPanel}>
            <h2 className={detailSectionTitle}>Technology We Work With</h2>
            <div className="mt-6 space-y-5">
              {techGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-muted">
                    {group.label}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <span key={tech} className={detailTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full case study details */}
        <section className="mt-12">
          <h2 className={detailSectionTitle}>Detailed Project Breakdowns</h2>
          <p className={detailSectionSubtitle}>
            Full challenge, solution, outcome, and deliverables for every case study.
          </p>

          <div className="mt-6 space-y-5">
            {service.caseStudies.map((study, index) => (
              <article
                key={study.id}
                id={`study-${study.id}`}
                className={`${detailPanel} scroll-mt-32`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                    Case Study {String(index + 1).padStart(2, "0")}
                  </p>
                  {study.year ? (
                    <span className="text-xs text-muted">{study.year}</span>
                  ) : null}
                </div>

                <h3 className="mt-3 font-display text-2xl tracking-tight text-foreground">
                  {study.title}
                </h3>
                {study.client ? (
                  <p className="mt-1 text-sm text-muted">{study.client}</p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-muted">{study.description}</p>

                <div className="mt-6 grid gap-5 lg:grid-cols-3">
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted">Challenge</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted">Solution</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted">Outcome</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{study.outcome}</p>
                  </div>
                </div>

                {study.technologies.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <span key={tech} className={detailTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                {study.deliverables.length > 0 ? (
                  <div className="mt-5 rounded-2xl border border-line bg-background/60 p-5">
                    <p className="text-xs tracking-[0.18em] uppercase text-accent">Deliverables</p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {study.deliverables.map((item) => (
                        <li key={item} className={detailCheckItem}>
                          <span className={detailCheckIcon}>
                            <CheckIcon />
                          </span>
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

        {/* Bottom CTA */}
        <section className={`${detailCtaSection} mt-12`}>
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--grad)] text-white">
                <ImpactIcon name="rocket" className="[&_svg]:h-6 [&_svg]:w-6" />
              </span>
              <div>
                <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
                  Ready to build your next {service.name.toLowerCase()} project?
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  Let&apos;s discuss your requirements and create a tailored solution for your
                  business.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}>
                Schedule a Call →
              </Link>
              <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}>
                Get a Proposal
              </Link>
            </div>
          </div>
        </section>

        {/* Related services */}
        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className={detailSectionTitle}>Related Services</h2>
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
