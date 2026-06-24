export type TimelineEntry = {
  date: string;
  title: string;
  body: string;
};

export type Value = {
  n: string;
  title: string;
  body: string;
};

export type Pillar = {
  icon: string;
  title: string;
  body: string;
};

export type Capability = {
  title: string;
  body: string;
  href: string;
};

export const PILLARS: Pillar[] = [
  {
    icon: "code",
    title: "Engineering-first",
    body: "Clean architecture, reliable delivery, and maintainable codebases built for long-term product growth.",
  },
  {
    icon: "layout",
    title: "Design that converts",
    body: "Polished interfaces with clear hierarchy, purposeful motion, and usability that turns visitors into users.",
  },
  {
    icon: "shield",
    title: "Performance & security",
    body: "Fast loads, stable UI, and security best practices baked in from day one — not bolted on at the end.",
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    date: "2018",
    title: "Canopy Arc founded",
    body: "Started as a small studio helping startups ship their first production-ready web products with a focus on quality over volume.",
  },
  {
    date: "2020",
    title: "Mobile & cloud expansion",
    body: "Added React Native, cloud infrastructure, and DevOps capabilities — delivering full-stack products end to end.",
  },
  {
    date: "2022",
    title: "Enterprise partnerships",
    body: "Began long-term engagements with fintech, healthcare, and industrial clients needing scalable platforms and strict reliability.",
  },
  {
    date: "2024",
    title: "AI & automation practice",
    body: "Launched dedicated AI engineering — intelligent workflows, data pipelines, and product features powered by modern ML tooling.",
  },
  {
    date: "2025",
    title: "Global delivery model",
    body: "Distributed team across multiple time zones, shipping live products for clients in the US, Europe, and Asia.",
  },
  {
    date: "Today",
    title: "150+ projects delivered",
    body: "A trusted partner for teams who need software that ships on time, scales under load, and stays maintainable years later.",
  },
];

export const VALUES: Value[] = [
  {
    n: "01",
    title: "Ship with clarity",
    body: "Every sprint ends with something demoable. Scope, trade-offs, and deadlines are discussed openly so there are no surprises at launch.",
  },
  {
    n: "02",
    title: "Build to last",
    body: "We write code and design systems your team can own after handoff. Documentation, tests, and clean structure are part of delivery — not extras.",
  },
  {
    n: "03",
    title: "Stay close to users",
    body: "Great software solves real problems. We validate assumptions early, measure what matters, and iterate based on feedback — not opinions alone.",
  },
  {
    n: "04",
    title: "Own the outcome",
    body: "We treat your product like our reputation depends on it — because it does. From discovery through post-launch support, we stay accountable.",
  },
];

export const CAPABILITIES: Capability[] = [
  {
    title: "Web Development",
    body: "High-performance web apps with Next.js, React, and modern APIs — from marketing sites to complex SaaS dashboards.",
    href: "/services/web-development",
  },
  {
    title: "Mobile Apps",
    body: "Native-quality iOS and Android experiences with React Native — offline support, push notifications, and app store delivery.",
    href: "/services/app-development",
  },
  {
    title: "AI & ML Solutions",
    body: "Intelligent features, automation pipelines, and data-driven tools integrated responsibly into your product workflow.",
    href: "/services/ai-ml",
  },
  {
    title: "Cloud & DevOps",
    body: "Infrastructure, CI/CD, monitoring, and scaling strategies so your platform stays fast and available in production.",
    href: "/services/cloud-devops",
  },
];
