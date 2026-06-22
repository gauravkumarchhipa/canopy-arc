import type { CaseStudy, Service } from "../../../../content/pages/services/services";
import { SERVICE_PROCESS_STEPS, SERVICE_WHY_CHOOSE } from "../../../../content/pages/services/detail-shared";
import CheckIcon from "./CheckIcon";
import { detailCheckIcon, detailCheckItem, detailPanel, detailSectionTitle } from "./service-detail-styles";

type Props = {
  service: Service;
  whatWeBuild: string[];
  testimonialStudy: CaseStudy | undefined;
};

export default function ServiceInfoGrid({ service, whatWeBuild, testimonialStudy }: Props) {
  return (
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
  );
}
