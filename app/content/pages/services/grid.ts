import { services, type Service, type ServiceCategory } from "./services";

export const SERVICE_FILTERS = [
  "All Services",
  "Development",
  "Engineering",
  "Design",
  "Marketing",
  "Operations",
] as const;

/** Display order for the services grid (matches site layout). */
const SERVICE_ORDER: string[] = [
  "web-development",
  "app-development",
  "ai-ml",
  "cybersecurity",
  "cloud-devops",
  "ui-ux-design",
  "data-engineering",
  "iot",
  "digital-marketing",
  "ecommerce-saas",
  "ar-vr",
  "backend-api",
  "qa-automation",
  "video-content",
  "enterprise-solutions",
];

const ICON_BY_SERVICE_ICON: Record<string, string> = {
  Globe: "code",
  Smartphone: "smartphone",
  Brain: "brain",
  Shield: "shield",
  Cloud: "cloud",
  Palette: "layout",
  BarChart3: "database",
  Cpu: "chip",
  TrendingUp: "megaphone",
  ShoppingCart: "cart",
  Glasses: "cube",
  Network: "server",
  TestTube: "checklist",
  Video: "video",
  Building2: "building",
};

export type ServiceGridCard = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  tagline: string;
  projects: number;
  tag: ServiceCategory;
  accent: string;
  subDomains: string[];
};

function toGridCard(service: Service): ServiceGridCard {
  return {
    id: service.id,
    icon: ICON_BY_SERVICE_ICON[service.icon] ?? "code",
    title: service.name,
    subtitle: service.description,
    tagline: service.tagline,
    projects: service.caseStudies.length,
    tag: service.category,
    accent: service.accent,
    subDomains: service.subDomains,
  };
}

const orderedServices = SERVICE_ORDER.map((id) =>
  services.find((service) => service.id === id)
).filter((service): service is Service => Boolean(service));

export const servicesGrid = {
  filters: [...SERVICE_FILTERS],
  cards: orderedServices.map(toGridCard),
};

export type ServicesGridContent = typeof servicesGrid;

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getGridCardById(id: string): ServiceGridCard | undefined {
  return servicesGrid.cards.find((card) => card.id === id);
}
