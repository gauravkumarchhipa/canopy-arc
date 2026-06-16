export type PrivacySection = {
  n: string;
  title: string;
  body: string[];
};

export const SECTIONS: PrivacySection[] = [
  {
    n: "01",
    title: "What we collect",
    body: [
      "Account information you provide: name, phone number, age, gender, blood group, chronic conditions, allergies, and the medicines you choose to log.",
      "Voice interactions and the structured events derived from them — symptoms, reminder responses, appointments, conversations.",
      "Photos, videos, prescriptions and lab reports you choose to upload.",
      "Device, network and crash diagnostics required to keep SAHAI reliable.",
    ],
  },
  {
    n: "02",
    title: "How we use it",
    body: [
      "To run reminders, escalation and SOS — the critical paths that must work every time.",
      "To build a structured, append-only health memory you and your family can review and export.",
      "To improve voice understanding and reliability across our users — only on aggregated, anonymised data.",
      "To respond to support requests, with explicit per-incident audit logs.",
    ],
  },
  {
    n: "03",
    title: "What we never do",
    body: [
      "We do not sell, rent or share individual health information with advertisers, brokers or third-party marketers. Ever.",
      "We do not use individual health data to train models without explicit, revocable consent.",
      "We do not allow staff to view individual patient data without an audit-logged reason and time-bound access.",
      "We do not retain raw voice audio longer than needed to derive its structured event.",
    ],
  },
  {
    n: "04",
    title: "Family and caregiver access",
    body: [
      "A family member only sees the elders they are explicitly linked to — by 6-digit pairing code, with the elder's consent.",
      "Caregivers act under a manager's permission. Every event is tagged with its source: user, caregiver, or manager.",
      "Linkages can be removed at any time — by the elder or by the linked family member.",
    ],
  },
  {
    n: "05",
    title: "Storage and security",
    body: [
      "All health information is encrypted in transit (TLS) and at rest (AES-256).",
      "Database access is restricted to the Data Service. AI services interpret but never write directly.",
      "We follow append-only event sourcing — no record is silently overwritten or deleted.",
      "Backups are encrypted and access-logged. Decryption keys are managed in a hardware-backed key vault.",
    ],
  },
  {
    n: "06",
    title: "Your rights",
    body: [
      "Export your full structured health memory at any time, as a PDF or machine-readable JSON.",
      "Request correction of any structured event derived from voice or text. The original raw input remains as audit history.",
      "Close your account and request full deletion of personal identifiers. Anonymised aggregate analytics may persist.",
      "Withdraw consent for optional features (photo storage, doctor sharing) at any time, without affecting core care.",
    ],
  },
  {
    n: "07",
    title: "Compliance",
    body: [
      "SAHAI is built to comply with the Indian DPDP Act 2023 and applicable healthcare data regulations.",
      "International billing and data flows for NRI families follow FEMA and applicable cross-border data rules.",
      "We publish a security and privacy review summary at every major release.",
    ],
  },
];
