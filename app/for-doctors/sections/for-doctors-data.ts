export type Benefit = {
  n: string;
  title: string;
  body: string;
};

export type Step = {
  step: string;
  title: string;
  body: string;
};

export const BENEFITS: Benefit[] = [
  {
    n: "01",
    title: "Patient context, before the call",
    body:
      "Walk in with the elder's medication history, recent symptoms, vitals, and previous notes already loaded. No more starting from zero every visit.",
  },
  {
    n: "02",
    title: "Reach families, not just patients",
    body:
      "Every consultation is shared with the linked family member. Aftercare is followed up on. Reminders fire. The plan you write actually gets followed.",
  },
  {
    n: "03",
    title: "Digital prescriptions that stick",
    body:
      "Write a prescription once — SAHAI auto-creates reminders, syncs to the family dashboard, and tracks adherence. Pharmacies can pick up directly.",
  },
  {
    n: "04",
    title: "Built around your time",
    body:
      "Set your availability. Block specific hours. Say no to walk-in calls. SAHAI respects boundaries — and pays per consultation, settled weekly.",
  },
];

export const STEPS: Step[] = [
  {
    step: "01",
    title: "Apply",
    body:
      "Tell us about yourself, your specialty, and your medical registration. Two minutes, online.",
  },
  {
    step: "02",
    title: "Get verified",
    body:
      "We confirm your registration with the medical council, run a background check, and review references — usually within 5 working days.",
  },
  {
    step: "03",
    title: "Onboard",
    body:
      "30-minute call to walk through the doctor app, prescription tools, and consultation flow. You're live the same day.",
  },
  {
    step: "04",
    title: "Start consulting",
    body:
      "Patients are matched to you by language, specialty, and availability. Voice or video, your choice. We pay weekly.",
  },
];

export const SPECIALTIES: string[] = [
  "Family medicine",
  "Geriatrics",
  "Pediatrics",
  "Cardiology",
  "Endocrinology",
  "General practice",
  "Psychiatry",
  "Pulmonology",
];
