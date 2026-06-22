import type { Service } from "../../../../content/pages/services/services";
import { tw } from "../../../../lib/tw";
import ServiceBreadcrumb from "./ServiceBreadcrumb";
import ServiceCaseStudyBreakdowns from "./ServiceCaseStudyBreakdowns";
import ServiceDetailCta from "./ServiceDetailCta";
import ServiceDetailHero from "./ServiceDetailHero";
import ServiceFeaturedCaseStudies from "./ServiceFeaturedCaseStudies";
import ServiceIndustriesTech from "./ServiceIndustriesTech";
import ServiceInfoGrid from "./ServiceInfoGrid";
import ServiceRelatedServices from "./ServiceRelatedServices";
import ServiceStatsBar from "./ServiceStatsBar";
import { buildPageData } from "./service-detail-utils";

type Props = {
  service: Service;
  related: { id: string; title: string }[];
};

export default function ServiceDetailView({ service, related }: Props) {
  const { card, whatWeBuild, industries, techGroups, featuredStudies, testimonialStudy } =
    buildPageData(service);
  const iconName = card?.icon ?? "code";

  return (
    <div className={tw.pageShell}>
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <ServiceBreadcrumb serviceName={service.name} />
        <ServiceDetailHero service={service} iconName={iconName} />
        <ServiceInfoGrid
          service={service}
          whatWeBuild={whatWeBuild}
          testimonialStudy={testimonialStudy}
        />
        <ServiceFeaturedCaseStudies service={service} featuredStudies={featuredStudies} />
        <ServiceStatsBar />
        <ServiceIndustriesTech industries={industries} techGroups={techGroups} />
        <ServiceCaseStudyBreakdowns service={service} />
        <ServiceDetailCta serviceName={service.name} />
        <ServiceRelatedServices related={related} />
      </div>
    </div>
  );
}
