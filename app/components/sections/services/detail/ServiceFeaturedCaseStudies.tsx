import Link from "next/link";
import type { CaseStudy, Service } from "../../../../content/pages/services/services";
import {
  detailCaseCard,
  detailCaseImage,
  detailSectionSubtitle,
  detailSectionTitle,
} from "./service-detail-styles";

type Props = {
  service: Service;
  featuredStudies: CaseStudy[];
};

export default function ServiceFeaturedCaseStudies({ service, featuredStudies }: Props) {
  return (
    <section id="case-studies" className="mt-12 scroll-mt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className={detailSectionTitle}>Featured Case Studies</h2>
          <p className={detailSectionSubtitle}>
            {service.caseStudies.length} detailed project case studies with full explanations,
            tech stacks, and deliverables.
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
                {study.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-background/80 px-2 py-0.5 text-[0.6875rem] text-muted"
                  >
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
  );
}
