export type TermsBodyItem =
  | string
  | { lead: string; items: string[]; trail?: string };

export type TermsSection = {
  n: string;
  title: string;
  body: TermsBodyItem[];
};

export const SECTIONS: TermsSection[] = [
  {
    n: "01",
    title: "What SAHAI is",
    body: [
      {
        lead: "SAHAI is a digital care companion designed to help users with:",
        items: [
          "medicine reminders",
          "water reminders",
          "wellness tracking",
          "emergency support features",
          "family connection features",
          "voice interactions",
          "symptom logging",
          "daily assistance",
          "dependent and caregiver coordination",
        ],
      },
      "SAHAI is designed to support care and communication.",
      "SAHAI is NOT a hospital, doctor, ambulance service, medical authority, or emergency response provider.",
    ],
  },
  {
    n: "02",
    title: "Medical disclaimer",
    body: [
      "SAHAI does not provide medical advice, diagnosis, treatment, or prescriptions.",
      "Any health information shown in the app is for general support and awareness only.",
      "Always consult a qualified doctor or medical professional for medical decisions.",
      "In an emergency, contact local emergency services, a doctor, or a hospital immediately.",
      "You must not rely only on SAHAI during medical emergencies.",
    ],
  },
  {
    n: "03",
    title: "Emergency & SOS features",
    body: [
      {
        lead: "SAHAI may allow users to:",
        items: [
          "send SOS alerts",
          "share live location",
          "notify family members",
          "contact emergency contacts",
          "trigger emergency calls",
        ],
      },
      {
        lead: "We do our best to make these features reliable, but we cannot guarantee:",
        items: [
          "instant delivery",
          "network availability",
          "location accuracy",
          "phone connectivity",
          "battery availability",
          "successful contact response",
        ],
      },
      {
        lead: "Users are responsible for keeping:",
        items: [
          "their phone charged",
          "internet/mobile network active",
          "permissions enabled",
          "emergency contacts updated",
        ],
      },
      "SAHAI is not responsible for loss, injury, delays, or damages caused by failed alerts, poor network, device issues, or user error.",
    ],
  },
  {
    n: "04",
    title: "User accounts",
    body: [
      "You may need an account to use some features.",
      {
        lead: "You agree to:",
        items: [
          "provide correct information",
          "keep login details secure",
          "use the app legally and honestly",
          "keep your phone and account protected",
        ],
      },
      "You are responsible for activity under your account.",
      {
        lead: "We may suspend or remove accounts that:",
        items: [
          "misuse the platform",
          "abuse others",
          "break laws",
          "attempt fraud",
          "harm the platform or users",
        ],
      },
    ],
  },
  {
    n: "05",
    title: "Family & caregiver features",
    body: [
      "Users may invite family members, caregivers, managers, or dependents into the platform.",
      {
        lead: "By connecting another person:",
        items: [
          "you confirm you have permission to do so",
          "you agree to share selected data with them",
          "you understand they may receive alerts, updates, or location information",
        ],
      },
      "Dependents and caregivers should only be added with proper consent.",
      "SAHAI is not responsible for disputes between family members, caregivers, or connected users.",
    ],
  },
  {
    n: "06",
    title: "Data & privacy",
    body: [
      "Your privacy matters to us.",
      {
        lead: "SAHAI may collect and process:",
        items: [
          "profile information",
          "reminder data",
          "health-related inputs",
          "voice interactions",
          "symptom logs",
          "location data",
          "emergency activity",
          "device information",
          "app usage information",
        ],
      },
      {
        lead: "We use this data to:",
        items: [
          "provide the service",
          "improve the platform",
          "support reminders and alerts",
          "improve safety and reliability",
          "prevent fraud and misuse",
        ],
      },
      "We do not sell personal user data.",
      "Some trusted service providers may process data on our behalf to operate the platform.",
      "By using SAHAI, you agree to our Privacy Policy.",
    ],
  },
  {
    n: "07",
    title: "Voice features",
    body: [
      "SAHAI may use voice input and voice responses.",
      "Voice interactions may be processed using internal or third-party systems to improve functionality, reminders, support, and service quality.",
      "Please avoid sharing highly sensitive information through voice unless necessary.",
    ],
  },
  {
    n: "08",
    title: "AI & suggestions disclaimer",
    body: [
      "Some SAHAI features may use AI or automated systems.",
      "AI responses can sometimes be incomplete, incorrect, delayed, or misunderstood.",
      "Users should use judgment and verify important information independently.",
      "Do not make serious medical, legal, financial, or emergency decisions based only on AI responses.",
    ],
  },
  {
    n: "09",
    title: "Acceptable use",
    body: [
      {
        lead: "You agree NOT to:",
        items: [
          "misuse the platform",
          "upload harmful content",
          "abuse or harass users",
          "attempt hacking or unauthorized access",
          "interfere with the service",
          "use SAHAI for illegal activities",
          "create fake emergencies",
          "impersonate others",
        ],
      },
      "We may restrict access if users violate these Terms.",
    ],
  },
  {
    n: "10",
    title: "Service availability",
    body: [
      "We aim to keep SAHAI available and reliable.",
      {
        lead: "However, services may sometimes be interrupted due to:",
        items: [
          "maintenance",
          "updates",
          "technical issues",
          "internet failures",
          "third-party outages",
          "force majeure events",
        ],
      },
      "We do not guarantee uninterrupted or error-free service.",
      "Features may change, improve, pause, or be removed over time.",
    ],
  },
  {
    n: "11",
    title: "Payments & subscriptions",
    body: [
      "Some SAHAI features may be free, while others may require payment.",
      {
        lead: "If paid plans are introduced:",
        items: [
          "pricing will be shown clearly",
          "subscription terms will be displayed before payment",
          "users are responsible for applicable taxes and charges",
        ],
      },
      "Payments made are generally non-refundable unless required by law.",
    ],
  },
  {
    n: "12",
    title: "Intellectual property",
    body: [
      "All SAHAI branding, software, designs, systems, logos, content, and technology belong to SAHAI or its licensors.",
      {
        lead: "Users may not:",
        items: [
          "copy",
          "resell",
          "reverse engineer",
          "distribute",
          "modify",
          "misuse",
        ],
        trail: "any part of the platform without written permission.",
      },
    ],
  },
  {
    n: "13",
    title: "Third-party services",
    body: [
      {
        lead: "SAHAI may use or connect with third-party providers such as:",
        items: [
          "cloud providers",
          "maps and location services",
          "communication providers",
          "AI systems",
          "analytics tools",
          "payment gateways",
        ],
      },
      "Third-party services may have their own terms and privacy policies.",
      "SAHAI is not responsible for third-party systems or outages.",
    ],
  },
  {
    n: "14",
    title: "Limitation of liability",
    body: [
      "To the maximum extent allowed by law:",
      {
        lead: "SAHAI, its founders, employees, partners, and affiliates will not be responsible for:",
        items: [
          "indirect losses",
          "emotional distress",
          "missed reminders",
          "failed emergency communication",
          "health outcomes",
          "injuries",
          "data loss",
          "business losses",
          "service interruptions",
          "inaccurate information",
        ],
      },
      "Your use of SAHAI is at your own risk.",
    ],
  },
  {
    n: "15",
    title: "Indemnity",
    body: [
      "If your actions cause legal claims, damages, losses, or costs to SAHAI, you agree to reasonably compensate and protect SAHAI from those claims.",
    ],
  },
  {
    n: "16",
    title: "Age requirement",
    body: [
      "Users should be legally allowed to use digital services in their country.",
      "If a dependent cannot manage the platform independently, a guardian, family member, or authorized caregiver should supervise usage.",
    ],
  },
  {
    n: "17",
    title: "Account termination",
    body: [
      "You may stop using SAHAI at any time.",
      {
        lead: "We may suspend or terminate accounts that:",
        items: [
          "violate these Terms",
          "create safety risks",
          "misuse the service",
          "harm other users or the platform",
        ],
      },
      "Some data may remain stored if legally required or needed for security, fraud prevention, or compliance.",
    ],
  },
  {
    n: "18",
    title: "Updates to these terms",
    body: [
      "We may update these Terms from time to time.",
      "Updated Terms will be posted inside the app or website.",
      "Continued use of SAHAI after updates means you accept the updated Terms.",
    ],
  },
  {
    n: "19",
    title: "Governing law",
    body: [
      "These Terms are governed by the laws of India.",
      "Any disputes will be subject to the jurisdiction of courts located in Ahmedabad, Gujarat, India.",
    ],
  },
  {
    n: "20",
    title: "Contact",
    body: [
      "For support or legal questions:",
      "Email: support@canopy-arc.ai",
      "Website: www.canopy-arc.ai",
    ],
  },
];

export const SIMPLE_SUMMARY: string[] = [
  "SAHAI is a support platform, not a medical authority.",
  "Reminders and alerts may fail sometimes.",
  "Emergency features depend on devices and networks.",
  "AI may make mistakes.",
  "Users must use judgment and act responsibly.",
  "Users must use the platform legally and respectfully.",
];
