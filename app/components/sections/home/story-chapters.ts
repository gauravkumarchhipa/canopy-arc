export const chapters = [
  {
    id: "the-spark",
    art: "spark",
    name: "The Spark",
    title: ["Every extraordinary", "idea begins somewhere."],
    description: "We work with businesses to turn early ideas into meaningful, scalable digital solutions.",
    services: [],
  },
  {
    id: "the-structure",
    art: "structure",
    name: "The Structure",
    title: ["We give ideas", "structure."],
    description: "We turn a clear strategy into thoughtful design and interfaces that are ready to grow.",
    services: ["ui-ux-design", "ar-vr", "video-content"],
  },
  {
    id: "the-engineering",
    art: "engineering",
    name: "The Engineering",
    title: ["From imagination", "to engineering."],
    description: "We build high-performance digital products across web, mobile, and cloud.",
    services: ["web-development", "app-development", "backend-api", "cloud-devops"],
  },
  {
    id: "the-intelligence",
    art: "intelligence",
    name: "The Intelligence",
    title: ["Technology that", "thinks ahead."],
    description: "We put AI, data, and automation to work so businesses can make better decisions and act faster.",
    services: ["ai-ml", "data-engineering", "iot"],
  },
  {
    id: "the-protection",
    art: "protection",
    name: "The Protection",
    title: ["Built to connect.", "Engineered to protect."],
    description: "We engineer for security, reliability, and performance as your business scales.",
    services: ["cybersecurity", "qa-automation", "enterprise-solutions"],
  },
  {
    id: "the-outcome",
    art: "outcome",
    name: "The Outcome",
    title: ["Many disciplines.", "One extraordinary outcome."],
    description: "One connected team builds the digital ecosystem your business needs to innovate, operate, and grow.",
    services: ["ecommerce-saas", "digital-marketing"],
  },
] as const;

export const lastChapter = chapters.length - 1;
