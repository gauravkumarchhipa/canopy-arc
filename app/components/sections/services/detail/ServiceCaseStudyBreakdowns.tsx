import type { Service } from "../../../../content/pages/services/services";
import GlowHoverCard from "../../../ui/GlowHoverCard";
import CheckIcon from "./CheckIcon";
import {
  detailCheckIconHover,
  detailCheckItemHover,
  detailDeliverablesBox,
  detailDeliverablesLabel,
  detailPanelGlow,
  detailSectionSubtitle,
  detailSectionTitle,
  detailStudyClient,
  detailStudyColumnLabel,
  detailStudyColumnText,
  detailStudyDesc,
  detailStudyEyebrow,
  detailStudyTitle,
  detailStudyYear,
  detailTagHover,
} from "./service-detail-styles";

type Props = {
  service: Service;
};

export default function ServiceCaseStudyBreakdowns({ service }: Props) {
  return (
    <section className="mt-12">
      <h2 className={detailSectionTitle}>Detailed Project Breakdowns</h2>
      <p className={detailSectionSubtitle}>
        Full challenge, solution, outcome, and deliverables for every case study.
      </p>

      <div className="mt-6 space-y-5 overflow-visible p-1">
        {service.caseStudies.map((study, index) => (
          <GlowHoverCard
            key={study.id}
            id={`study-${study.id}`}
            className={`${detailPanelGlow} scroll-mt-32`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className={detailStudyEyebrow}>
                Case Study {String(index + 1).padStart(2, "0")}
              </p>
              {study.year ? <span className={detailStudyYear}>{study.year}</span> : null}
            </div>

            <h3 className={detailStudyTitle}>{study.title}</h3>
            {study.client ? <p className={detailStudyClient}>{study.client}</p> : null}
            <p className={detailStudyDesc}>{study.description}</p>

            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <div>
                <p className={detailStudyColumnLabel}>Challenge</p>
                <p className={detailStudyColumnText}>{study.challenge}</p>
              </div>
              <div>
                <p className={detailStudyColumnLabel}>Solution</p>
                <p className={detailStudyColumnText}>{study.solution}</p>
              </div>
              <div>
                <p className={detailStudyColumnLabel}>Outcome</p>
                <p className={detailStudyColumnText}>{study.outcome}</p>
              </div>
            </div>

            {study.technologies.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <span key={tech} className={detailTagHover}>
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}

            {study.deliverables.length > 0 ? (
              <div className={detailDeliverablesBox}>
                <p className={detailDeliverablesLabel}>Deliverables</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {study.deliverables.map((item) => (
                    <li key={item} className={detailCheckItemHover}>
                      <span className={detailCheckIconHover}>
                        <CheckIcon />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </GlowHoverCard>
        ))}
      </div>
    </section>
  );
}
