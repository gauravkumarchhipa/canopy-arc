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

export type PersonPreview = {
  initial: string;
  name: string;
  role: string;
  hue: string;
};

export const TIMELINE: TimelineEntry[] = [
  {
    date: "Apr 2026",
    title: "Project kick-off",
    body: "A small team. One stubborn idea — care should be continuous, not episodic.",
  },
  {
    date: "May 2026",
    title: "Voice foundation",
    body: "Real conversations with SAHAI in Hindi and English. Speech in, structured care out.",
  },
  {
    date: "May 2026",
    title: "Reliability shipped",
    body: "Family escalation chain — push, automatic phone call, SMS backup — proven across 10× tests.",
  },
  {
    date: "May 2026",
    title: "Internal testing",
    body: "Real elders and families using SAHAI every day. Feedback flowed in. Bugs fixed within hours.",
  },
  {
    date: "May 2026",
    title: "Public launch",
    body: "SAHAI live on the App Store and Play Store. Any family in India can download and start.",
  },
  {
    date: "Today",
    title: "In thousands of homes",
    body: "Continuously listening, gently catching what matters. A quiet system that never forgets.",
  },
];

export const VALUES: Value[] = [
  {
    n: "01",
    title: "Data integrity over speed",
    body: "Append-only events, no overwriting, raw input + structured output. Memory you can audit and trust years from now.",
  },
  {
    n: "02",
    title: "Reliability over cleverness",
    body: "AI is used for understanding and tone. Reminders, escalation and SOS run on deterministic systems that must not fail.",
  },
  {
    n: "03",
    title: "Stay in the lane",
    body: "No weather, no news, no shopping. Health, medicines, symptoms, family safety. Nothing else. That focus is the product.",
  },
  {
    n: "04",
    title: "Elder-first design",
    body: "Big buttons. Calm voice. One-tap SOS. We measure success by whether a 75-year-old can use SAHAI without help.",
  },
];

export const PEOPLE: PersonPreview[] = [
  {
    initial: "K",
    name: "Kartik Tanna",
    role: "Co-founder & CEO",
    hue: "from-[#f2994a] via-[#2bb3a3] to-[#2a2f6b]",
  },
  {
    initial: "P",
    name: "Priya Iyer",
    role: "Co-founder & CTO",
    hue: "from-[#2bb3a3] via-[#7d85d6] to-[#e86a77]",
  },
  {
    initial: "R",
    name: "Rohan Krishnan",
    role: "Head of AI & Voice",
    hue: "from-[#f2994a] via-[#e86a77] to-[#7d85d6]",
  },
  {
    initial: "M",
    name: "Dr. Meera Suresh",
    role: "Chief Medical Advisor",
    hue: "from-[#2bb3a3] via-[#2a2f6b] to-[#7d85d6]",
  },
];
