import { servicesGrid } from "../content/pages/services/grid";

export const SERVICE_FILTER_PARAM = "filter";

export const ALL_SERVICES_LABEL = servicesGrid.filters[0];

export function filterLabelToSlug(label: string): string {
  if (label === ALL_SERVICES_LABEL) return "all";
  return label.toLowerCase();
}

export function serviceDetailHref(id: string): string {
  return `/services/${id}`;
}

export function serviceCategoryFilterHref(slug: string): string {
  if (!slug || slug === "all") return "/services";
  return `/services?${SERVICE_FILTER_PARAM}=${encodeURIComponent(slug)}`;
}

export function resolveServiceFilter(filterParam: string | null): {
  active: string;
  cards: (typeof servicesGrid.cards)[number][];
} {
  if (!filterParam || filterParam === "all") {
    return { active: ALL_SERVICES_LABEL, cards: servicesGrid.cards };
  }

  const category = servicesGrid.filters.find(
    (f) => f !== ALL_SERVICES_LABEL && f.toLowerCase() === filterParam.toLowerCase()
  );
  if (category) {
    return {
      active: category,
      cards: servicesGrid.cards.filter((c) => c.tag === category),
    };
  }

  return { active: ALL_SERVICES_LABEL, cards: servicesGrid.cards };
}
