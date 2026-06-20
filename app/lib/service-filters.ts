import { servicesGrid } from "../content/pages/services/grid";

export const SERVICE_FILTER_PARAM = "filter";
export const SERVICE_ID_PARAM = "service";

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

/** Home hero orbit → services grid with category + single-service focus. */
export function serviceOrbitHref(serviceId: string): string {
  const card = servicesGrid.cards.find((c) => c.id === serviceId);
  if (!card) return "/services";

  const params = new URLSearchParams();
  params.set(SERVICE_FILTER_PARAM, filterLabelToSlug(card.tag));
  params.set(SERVICE_ID_PARAM, serviceId);
  return `/services?${params.toString()}#services-grid`;
}

export function resolveServiceFilter(
  filterParam: string | null,
  serviceIdParam: string | null = null
): {
  active: string;
  cards: (typeof servicesGrid.cards)[number][];
  focusServiceId: string | null;
} {
  if (serviceIdParam) {
    const card = servicesGrid.cards.find((c) => c.id === serviceIdParam);
    if (card) {
      return {
        active: card.tag,
        cards: [card],
        focusServiceId: serviceIdParam,
      };
    }
  }

  if (!filterParam || filterParam === "all") {
    return {
      active: ALL_SERVICES_LABEL,
      cards: servicesGrid.cards,
      focusServiceId: null,
    };
  }

  const category = servicesGrid.filters.find(
    (f) => f !== ALL_SERVICES_LABEL && f.toLowerCase() === filterParam.toLowerCase()
  );
  if (category) {
    return {
      active: category,
      cards: servicesGrid.cards.filter((c) => c.tag === category),
      focusServiceId: null,
    };
  }

  return {
    active: ALL_SERVICES_LABEL,
    cards: servicesGrid.cards,
    focusServiceId: null,
  };
}
