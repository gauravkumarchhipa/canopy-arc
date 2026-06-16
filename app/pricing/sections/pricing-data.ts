export type Plan = {
  name: string;
  tag: string;
  price: { in: string; nri?: string; period: string };
  highlight?: boolean;
  blurb: string;
  features: string[];
  cta: { label: string; href: string };
};

export type FaqEntry = {
  q: string;
  a: string;
};

export const PLANS: Plan[] = [
  {
    name: "Free",
    tag: "Forever",
    price: { in: "₹0", period: "always" },
    blurb:
      "All the essentials. No card needed. The free tier stays forever — no elder is ever left without the basics.",
    features: [
      "Voice companion in Hindi & English",
      "Up to 5 medicine reminders",
      "1 family member linked",
      "SOS button with location",
      "Basic health diary",
      "Daily wellness summary",
    ],
    cta: { label: "Download free", href: "/contact" },
  },
  {
    name: "Family Care",
    tag: "Most popular",
    price: { in: "₹299", period: "per month" },
    highlight: true,
    blurb:
      "Unlimited care for one elder, up to 3 family members. Photos, prescriptions, lab reports — the works.",
    features: [
      "Everything in Free, plus:",
      "Unlimited medicine reminders",
      "Up to 3 family members linked",
      "Photo, video & voice-note sharing",
      "Unlimited prescription scanning",
      "Lab report understanding",
      "Weekly PDF wellness reports",
      "Priority chat support",
    ],
    cta: { label: "Start 14-day trial", href: "/contact" },
  },
  {
    name: "Premium Care",
    tag: "Doctor-connected",
    price: { in: "₹699", period: "per month" },
    blurb:
      "Family Care plus a verified doctor in your pocket. Unlimited consultations, voice and video.",
    features: [
      "Everything in Family Care, plus:",
      "Unlimited doctor appointments",
      "Voice & video consultations",
      "On-demand voice notes for non-urgent questions",
      "Emergency doctor response (24×7)",
      "Detailed family trends dashboard",
      "Health record export (PDF + JSON)",
    ],
    cta: { label: "Start 14-day trial", href: "/contact" },
  },
  {
    name: "NRI Care",
    tag: "For families abroad",
    price: { in: "₹1,499", nri: "$24", period: "per month" },
    blurb:
      "For Indians abroad caring for parents at home. Premium Care, multi-time-zone support, and a dedicated coordinator.",
    features: [
      "Everything in Premium Care, plus:",
      "Up to 5 family members linked",
      "International billing in USD / GBP / AED",
      "24×7 priority support across time zones",
      "Dedicated care coordinator",
      "Quarterly video health review",
      "Pharmacy reorder coordination",
    ],
    cta: { label: "Talk to us", href: "/contact" },
  },
];

export const FAQ: FaqEntry[] = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. One tap inside the app, no questions, refund of any unused time.",
  },
  {
    q: "Is the free tier really free, forever?",
    a: "Yes. The basics — voice companion, reminders, SOS, health diary — stay free for life. No card required.",
  },
  {
    q: "Can my family pool one subscription?",
    a: "Yes. One Family / Premium plan covers the elder and all their linked family members.",
  },
  {
    q: "Do you support UPI auto-pay?",
    a: "Yes. UPI, credit and debit cards, net banking, and international cards (Visa, Mastercard, Amex).",
  },
];
