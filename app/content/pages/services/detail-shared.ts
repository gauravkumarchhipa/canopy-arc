export const SERVICE_PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "Requirements gathering, technical audit, and roadmap creation.",
  },
  {
    step: "02",
    title: "UI/UX Design",
    description: "Wireframes, prototypes, and design system creation.",
  },
  {
    step: "03",
    title: "Development",
    description: "Agile sprints with continuous integration and code reviews.",
  },
  {
    step: "04",
    title: "QA & Testing",
    description: "Automated and manual testing across devices and browsers.",
  },
  {
    step: "05",
    title: "Deployment",
    description: "CI/CD pipeline setup, staging, and production launch.",
  },
  {
    step: "06",
    title: "Support & Maintenance",
    description: "Monitoring, updates, and ongoing optimization.",
  },
] as const;

export const SERVICE_WHY_CHOOSE = [
  "Agile methodology with 2-week sprints",
  "Dedicated project manager and tech lead",
  "Transparent communication via Slack & weekly calls",
  "Code ownership and documentation included",
  "Post-launch support and maintenance plans",
  "Fixed-price or time-and-materials engagement",
] as const;

export const SERVICE_HERO_STATS = [
  { icon: "rocket", value: "150+", label: "Projects Delivered" },
  { icon: "users", value: "40+", label: "Expert Developers" },
  { icon: "shield", value: "98%", label: "Client Satisfaction" },
  { icon: "clock", value: "12+", label: "Years Experience" },
] as const;

export const SERVICE_BOTTOM_STATS = [
  { icon: "rocket", value: "150+", label: "Projects Delivered" },
  { icon: "users", value: "40+", label: "Expert Developers" },
  { icon: "shield", value: "98%", label: "Client Satisfaction" },
  { icon: "clock", value: "12+", label: "Years Experience" },
] as const;

export const DEFAULT_INDUSTRIES = [
  "SaaS & Software",
  "Real Estate",
  "Healthcare",
  "Logistics",
  "Education",
  "Finance",
] as const;

export const TECH_CATEGORIES = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "cloud", label: "Cloud & DevOps" },
] as const;

const TECH_BUCKETS: Record<string, string[]> = {
  frontend: [
    "Next.js",
    "React",
    "Vue.js",
    "TypeScript",
    "Tailwind CSS",
    "Angular",
    "PWA",
    "Figma",
    "Storybook",
    "Mobile UX",
    "iPad UX",
  ],
  backend: [
    "Node.js",
    "Python",
    "FastAPI",
    "GraphQL",
    "tRPC",
    "Kotlin",
    "Firebase",
    "WebSockets",
    "Kafka",
    "Microservices",
    "REST APIs",
  ],
  database: [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Elasticsearch",
    "BigQuery",
    "Snowflake",
    "InfluxDB",
    "SQLite",
  ],
  cloud: [
    "AWS",
    "GCP",
    "Azure",
    "Kubernetes",
    "Docker",
    "Terraform",
    "CI/CD",
    "GitHub Actions",
    "CloudFront",
    "Stripe",
  ],
};

export function bucketTechnologies(technologies: string[]) {
  const buckets: Record<string, string[]> = {
    frontend: [],
    backend: [],
    database: [],
    cloud: [],
  };

  for (const tech of technologies) {
    let placed = false;
    for (const [key, list] of Object.entries(TECH_BUCKETS)) {
      if (list.some((item) => item.toLowerCase() === tech.toLowerCase())) {
        buckets[key].push(tech);
        placed = true;
        break;
      }
    }
    if (!placed) buckets.backend.push(tech);
  }

  return TECH_CATEGORIES.map(({ key, label }) => ({
    label,
    items: [...new Set(buckets[key])],
  })).filter((group) => group.items.length > 0);
}

export function buildWhatWeBuild(subDomains: string[], deliverables: string[]) {
  const fromDeliverables = deliverables.slice(0, 6);
  if (fromDeliverables.length >= 4) return fromDeliverables;

  return subDomains.slice(0, 6).map((item) => {
    if (item.includes(" ")) return item;
    return item.replace(/-/g, " ");
  });
}

export function buildIndustries(clients: string[]) {
  const uniqueClients = [...new Set(clients.filter(Boolean))];
  if (uniqueClients.length >= 4) {
    return uniqueClients.slice(0, 6);
  }
  return [...DEFAULT_INDUSTRIES];
}
