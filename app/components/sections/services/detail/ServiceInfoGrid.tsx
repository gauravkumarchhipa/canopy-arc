import type { CaseStudy, Service } from "../../../../content/pages/services/services";
import { SERVICE_PROCESS_STEPS, SERVICE_WHY_CHOOSE } from "../../../../content/pages/services/detail-shared";
import GlowHoverCard from "../../../ui/GlowHoverCard";
import CheckIcon from "./CheckIcon";
import {
  detailCheckIconHover,
  detailCheckItemHover,
  detailPanelGlow,
  detailProcessStepBadge,
  detailProcessStepDesc,
  detailProcessStepTitle,
  detailSectionTitleHover,
  detailTestimonialAvatar,
  detailTestimonialBox,
  detailTestimonialMeta,
  detailTestimonialName,
  detailTestimonialQuote,
} from "./service-detail-styles";

type Props = {
  service: Service;
  whatWeBuild: string[];
  testimonialStudy: CaseStudy | undefined;
};

export default function ServiceInfoGrid({ service, whatWeBuild, testimonialStudy }: Props) {
  return (
    <section className="mt-8 grid gap-5 overflow-visible p-1 lg:grid-cols-3">
      <GlowHoverCard className={detailPanelGlow}>
        <h2 className={detailSectionTitleHover}>What We Build</h2>
        <ul className="mt-5 space-y-3">
          {whatWeBuild.map((item) => (
            <li key={item} className={detailCheckItemHover}>
              <span className={detailCheckIconHover}>
                <CheckIcon />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </GlowHoverCard>

      <GlowHoverCard className={detailPanelGlow}>
        <h2 className={detailSectionTitleHover}>Our Development Process</h2>
        <ol className="mt-5 space-y-4">
          {SERVICE_PROCESS_STEPS.map((step) => (
            <li key={step.step} className="flex gap-3">
              <span className={detailProcessStepBadge}>{step.step}</span>
              <div>
                <p className={detailProcessStepTitle}>{step.title}</p>
                <p className={detailProcessStepDesc}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </GlowHoverCard>

      <GlowHoverCard className={detailPanelGlow}>
        <h2 className={detailSectionTitleHover}>Why Choose Canopy Arc?</h2>
        <ul className="mt-5 space-y-3">
          {SERVICE_WHY_CHOOSE.map((item) => (
            <li key={item} className={detailCheckItemHover}>
              <span className={detailCheckIconHover}>
                <CheckIcon />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {testimonialStudy ? (
          <blockquote className={detailTestimonialBox}>
            <p className={detailTestimonialQuote}>
              &ldquo;{testimonialStudy.outcome}&rdquo;
            </p>
            <footer className="relative z-1 mt-4 flex items-center gap-3">
              <span className={detailTestimonialAvatar}>
                {(testimonialStudy.client ?? "CA").slice(0, 2).toUpperCase()}
              </span>
              <div>
                <p className={detailTestimonialName}>
                  {testimonialStudy.client ?? "Client Partner"}
                </p>
                <p className={detailTestimonialMeta}>{service.name} Project</p>
              </div>
            </footer>
          </blockquote>
        ) : null}
      </GlowHoverCard>
    </section>
  );
}
