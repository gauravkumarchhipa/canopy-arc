export const chapters = [
  {
    id: "the-spark",
    art: "spark",
    name: "The Idea",
    title: ["Every extraordinary", "idea begins with a spark."],
    description: "We design and build web platforms, mobile apps, and connected systems for businesses.",
    services: [],
  },
  {
    id: "the-structure",
    art: "structure",
    name: "The Structure",
    title: ["We give ideas", "structure."],
    description: "We map how people use a product, then prototype the flows and interfaces they’ll rely on.",
    services: ["ui-ux-design", "ar-vr", "video-content"],
  },
  {
    id: "the-engineering",
    art: "engineering",
    name: "The Engineering",
    title: ["From imagination", "to engineering."],
    description: "We build web and mobile apps, connect them through APIs, and run them on cloud infrastructure.",
    services: ["web-development", "app-development", "backend-api", "cloud-devops"],
  },
  {
    id: "the-intelligence",
    art: "intelligence",
    name: "The Intelligence",
    title: ["Technology that", "thinks ahead."],
    description: "We build data pipelines, AI assistants, and automations that fit the way your team works.",
    services: ["ai-ml", "data-engineering", "iot"],
  },
  {
    id: "the-protection",
    art: "protection",
    name: "The Protection",
    title: ["Built to connect.", "Engineered to protect."],
    description: "We assess security risks and automate tests that catch regressions before release.",
    services: ["cybersecurity", "qa-automation", "enterprise-solutions"],
  },
  {
    id: "the-outcome",
    art: "outcome",
    name: "The Outcome",
    title: ["Many disciplines.", "One extraordinary outcome."],
    description: "Design, software, and security come together in the products we ship. See them in use.",
    services: ["ecommerce-saas", "digital-marketing"],
  },
] as const;

export const lastChapter = chapters.length - 1;
