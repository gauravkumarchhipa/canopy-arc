import type { CaseStudy, Service } from "../../../../content/pages/services/services";
import { getGridCardById, type ServiceGridCard } from "../../../../content/pages/services/grid";
import {
  bucketTechnologies,
  DEFAULT_INDUSTRIES,
} from "../../../../content/pages/services/detail-shared";

function buildWhatWeBuildFull(subDomains: string[], deliverables: string[]) {
  const uniqueDeliverables = [...new Set(deliverables.filter(Boolean))];
  if (uniqueDeliverables.length > 0) return uniqueDeliverables;

  return subDomains.map((item) => {
    if (item.includes(" ")) return item;
    return item.replace(/-/g, " ");
  });
}

function buildIndustriesFull(clients: string[]) {
  const uniqueClients = [...new Set(clients.filter(Boolean))];
  if (uniqueClients.length > 0) return uniqueClients;
  return [...DEFAULT_INDUSTRIES];
}

export type ServicePageData = {
  card: ServiceGridCard | undefined;
  whatWeBuild: string[];
  industries: string[];
  techGroups: { label: string; items: string[] }[];
  featuredStudies: CaseStudy[];
  testimonialStudy: CaseStudy | undefined;
};

export function buildPageData(service: Service): ServicePageData {
  const card = getGridCardById(service.id);
  const allDeliverables = service.caseStudies.flatMap((study) => study.deliverables);
  const allTechnologies = [
    ...new Set([
      ...service.subDomains,
      ...service.caseStudies.flatMap((study) => study.technologies),
    ]),
  ];
  const clients = service.caseStudies.map((study) => study.client ?? "").filter(Boolean);

  return {
    card,
    whatWeBuild: buildWhatWeBuildFull(service.subDomains, allDeliverables),
    industries: buildIndustriesFull(clients),
    techGroups: bucketTechnologies(allTechnologies),
    featuredStudies: service.caseStudies,
    testimonialStudy: service.caseStudies[0],
  };
}
