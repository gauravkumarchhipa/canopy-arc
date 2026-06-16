export type Feature = {
  tag: string;
  title: string;
  body: string;
  bullets: string[];
};

export const FEATURES: Feature[] = [
  {
    tag: "Voice",
    title: "Talk, in any language you live in.",
    body:
      "SAHAI listens in Hindi, English, or a comfortable mix. Speech becomes structured health data — no forms, no menus. Response in 3–5 seconds, in a calm human tone.",
    bullets: [
      "Speech → text → AI → structured data → response",
      "Confirmation only on important inputs",
      "Voice failure falls back to text, then WhatsApp / UI",
    ],
  },
  {
    tag: "Reminders",
    title: "Medicines, water, doctors — never forgotten.",
    body:
      "Multi-stage, flexible reminders that work on the elder's terms: taken, skip, or remind later. Created by voice, family, or doctor.",
    bullets: [
      "Voice-created: \"remind me to take BP medicine at 8\"",
      "Three actions: taken / skip / remind later",
      "Local fallback so reminders fire even offline",
    ],
  },
  {
    tag: "Escalation",
    title: "A chain that must never break.",
    body:
      "When a critical medicine is missed, family is notified. If the notification is silent, the phone rings. If the call goes unanswered, an SMS arrives. The chain is tested 10× before it ever ships.",
    bullets: [
      "Notification → call → SMS, with audit logs",
      "Family receives a clear voice message on call",
      "Daily 8 AM digest, weekly Sunday wellness report",
    ],
  },
  {
    tag: "SOS",
    title: "One press. Help on the way.",
    body:
      "A bright red button, impossible to miss. Long-press triggers an immediate call to family with live location. Works offline through call + SMS.",
    bullets: [
      "Online: full escalation + alerts",
      "Offline: call + SMS still go through",
      "Live location attached to every SOS event",
    ],
  },
  {
    tag: "Memory",
    title: "A health diary that writes itself.",
    body:
      "Every event is appended, never overwritten. Symptoms, taken medicines, conversations, water intake, doctor notes — all timestamped, all auditable.",
    bullets: [
      "Append-only, structured event store",
      "Memory created from confirmed inputs and patterns",
      "Searchable by symptom or date",
    ],
  },
  {
    tag: "Photos & Records",
    title: "Show it, don't describe it.",
    body:
      "Photo a rash, scan a prescription, snap a lab report. SAHAI extracts medicines, dosages and key values — and explains them in plain words.",
    bullets: [
      "Prescription scan → automatic reminders",
      "Lab report understanding in simple language",
      "Photo and short-video sharing with doctor",
    ],
  },
  {
    tag: "Doctors",
    title: "Doctors, in the loop without the friction.",
    body:
      "Verified doctors, voice and video consultations from inside the app. Patient context — recent symptoms, medications, vitals — shared securely before the call.",
    bullets: [
      "Search by specialty, language, distance",
      "In-app voice and video — low bandwidth ready",
      "Digital prescription syncs to elder + family",
    ],
  },
  {
    tag: "Family",
    title: "Quiet most days. Loud only when it matters.",
    body:
      "A calm dashboard for family — what was taken, what was missed, what was felt. One alert when something genuinely needs attention. Everything else stays in the background.",
    bullets: [
      "Up to 3 family members per elder, 5 elders per family member",
      "Daily digest, weekly trend report, exportable PDF",
      "Caregiver access controlled by manager, every event source-tagged",
    ],
  },
];
