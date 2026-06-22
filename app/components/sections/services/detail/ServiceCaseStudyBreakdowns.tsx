import type { Service } from "../../../../content/pages/services/services";
import CheckIcon from "./CheckIcon";
import {
  detailCheckIcon,
  detailCheckItem,
  detailPanel,
  detailSectionSubtitle,
  detailSectionTitle,
  detailTag,
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

      <div className="mt-6 space-y-5">
        {service.caseStudies.map((study, index) => (
          <article key={study.id} id={`study-${study.id}`} className={`${detailPanel} scroll-mt-32`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Case Study {String(index + 1).padStart(2, "0")}
              </p>
              {study.year ? <span className="text-xs text-muted">{study.year}</span> : null}
            </div>

            <h3 className="mt-3 font-display text-2xl tracking-tight text-foreground">
              {study.title}
            </h3>
            {study.client ? <p className="mt-1 text-sm text-muted">{study.client}</p> : null}
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
  );
}
