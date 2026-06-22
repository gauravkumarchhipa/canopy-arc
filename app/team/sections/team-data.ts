export type Member = {
  initial: string;
  name: string;
  role: string;
  bio: string;
  hue: "a" | "b" | "c";
  links?: { label: string; href: string }[];
};

export type Advisor = {
  name: string;
  role: string;
};

export type TeamValue = {
  n: string;
  title: string;
  body: string;
};

export const FOUNDERS: Member[] = [
  {
    initial: "K",
    name: "Kartik Tanna",
    role: "Co-founder & CEO",
    bio: "Built and sold a healthtech startup before SAHAI. Spent two years caring for his grandfather across cities — and realised the system never actually listened. SAHAI is what he wishes had existed then.",
    hue: "a",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Email", href: "mailto:support@canopy-arc.ai" },
    ],  
  },
  {
    initial: "P",
    name: "Priya Iyer",
    role: "Co-founder & CTO",
    bio: "Distributed systems engineer who spent a decade making high-volume real-time platforms not break. Owns the architecture, the reliability promise, and the rule that AI never writes to the database.",
    hue: "b",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Email", href: "mailto:support@canopy-arc.ai" },
    ],
  },
];

export const LEADERSHIP: Member[] = [
  {
    initial: "R",
    name: "Rohan Krishnan",
    role: "Head of AI & Voice",
    bio: "Speech researcher who has built voice systems for Hindi, Tamil and Bengali across two previous companies. Obsessed with making SAHAI sound calm, never robotic — even at 2 AM.",
    hue: "c",
  },
  {
    initial: "A",
    name: "Ananya Reddy",
    role: "Head of Mobile & Design",
    bio: "Designed elder-friendly UX for a national insurance app used by 5M+ seniors. Believes a 78-year-old should never need to ask a grandchild for help opening an app.",
    hue: "a",
  },
  {
    initial: "K",
    name: "Karan Bhatia",
    role: "Engineering Lead, Reliability",
    bio: "Built the escalation queue, the offline fallback, and the test harness that runs the family-call chain ten times before every release. Quietly catches what nobody else notices.",
    hue: "b",
  },
  {
    initial: "M",
    name: "Dr. Meera Suresh",
    role: "Chief Medical Advisor",
    bio: "Geriatrician with 22 years of clinical practice. Reviews every clinical decision in the product, sets the boundaries between companion and clinician, and trains the doctor network.",
    hue: "c",
  },
];

export const ADVISORS: Advisor[] = [
  { name: "Dr. Vikram Anand", role: "Cardiology · Apollo Hospitals" },
  { name: "Dr. Smita Joshi", role: "Pediatrics · Fortis Healthcare" },
  { name: "Aditya Rao", role: "Healthcare investor · Lightbox" },
  { name: "Neha Verma", role: "Head of Product · NRI banking" },
  { name: "Dr. Sanjay Kapoor", role: "Endocrinology · AIIMS Delhi" },
  { name: "Lakshmi Nair", role: "DPDP & healthcare regulation" },
];

export const VALUES: TeamValue[] = [
  {
    n: "01",
    title: "Small team, full ownership",
    body: "We stay deliberately small so every person owns the part of SAHAI they care most about — end to end.",
  },
  {
    n: "02",
    title: "Care as the default",
    body: "Not just for users — for each other. We are caring for our own elders too. The work isn't theoretical.",
  },
  {
    n: "03",
    title: "Quiet excellence",
    body: "We don't talk about reliability — we test the chain ten times before every release. Behaviour beats marketing.",
  },
];

export const HUES: Record<Member["hue"], string> = {
  a: "from-[#f2994a] via-[#2bb3a3] to-[#2a2f6b]",
  b: "from-[#2bb3a3] via-[#7d85d6] to-[#e86a77]",
  c: "from-[#f2994a] via-[#e86a77] to-[#2bb3a3]",
};
