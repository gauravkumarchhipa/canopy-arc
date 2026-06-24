import Link from "next/link";
import type { CaseStudy, Service } from "../../../../content/pages/services/services";
import {
  detailCaseBodyGlow,
  detailCaseBodyGradient,
  detailCaseBodyPattern,
  detailCaseCardShell,
  detailCaseCategoryBadge,
  detailCaseDescHover,
  detailCaseImage,
  detailCaseImageWash,
  detailCaseInitials,
  detailCaseLinkHover,
  detailCaseTechTagHover,
  detailCaseTitleHover,
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

      <div className="mt-6 grid gap-5 overflow-visible p-1 sm:grid-cols-2 lg:grid-cols-3">
        {featuredStudies.map((study) => (
          <article key={study.id} className={detailCaseCardShell}>
            <div className={detailCaseImage}>
              <div className={detailCaseImageWash} aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={detailCaseInitials}>
                  {(study.client ?? study.title).slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className={detailCaseCategoryBadge}>{service.category}</span>
            </div>
            <div className={detailCaseBodyGlow}>
              <div className={detailCaseBodyGradient} aria-hidden />
              <div className={detailCaseBodyPattern} aria-hidden />
              <h3 className={detailCaseTitleHover}>{study.title}</h3>
              <p className={detailCaseDescHover}>{study.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {study.technologies.map((tech) => (
                  <span key={tech} className={detailCaseTechTagHover}>
                    {tech}
                  </span>
                ))}
              </div>
              <Link href={`#study-${study.id}`} className={detailCaseLinkHover}>
                View Case Study →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
