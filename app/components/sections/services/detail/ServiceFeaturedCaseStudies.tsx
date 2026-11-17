import Link from "next/link";
import ProjectArtwork from "../../../ProjectArtwork";
import type {
  CaseStudy,
  Service,
} from "../../../../content/pages/services/services";
import {
  detailCaseBodyGlow,
  detailCaseBodyGradient,
  detailCaseBodyPattern,
  detailCaseCardShell,
  detailCaseDescHover,
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

export default function ServiceFeaturedCaseStudies({
  service,
  featuredStudies,
}: Props) {
  return (
    <section id="case-studies" className="case-studies-section scroll-mt-32">
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

      <div className="case-study-grid">
        {featuredStudies.map((study, index) => (
          <article
            key={study.id}
            className={`${detailCaseCardShell} case-study-card`}
            data-motion="card"
          >
            <Link
              href={`#study-${study.id}`}
              tabIndex={-1}
              aria-hidden="true"
              className="case-artwork-link"
            >
              <ProjectArtwork
                title={study.title}
                category={service.category}
                index={index}
                technologies={study.technologies}
              />
            </Link>
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
                View Case Study <span aria-hidden>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
