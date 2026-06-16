export type FlowStep = {
  step: string;
  title: string;
  body: string;
};

export type Channel = {
  name: string;
  body: string;
};

export type ArchService = {
  name: string;
  body: string;
};

export const FLOW: FlowStep[] = [
  {
    step: "01",
    title: "Speak",
    body:
      "The elder taps a big button and says what they feel. \"My head hurts.\" \"Remind me to take my BP medicine at 8.\" Hindi, English, or both.",
  },
  {
    step: "02",
    title: "Understand",
    body:
      "Speech becomes text. AI extracts intent, symptom, medicine, time. If it's a critical input, SAHAI confirms — once, gently — before saving.",
  },
  {
    step: "03",
    title: "Append",
    body:
      "The event is timestamped and stored. Raw input + structured output, side by side. Nothing is overwritten. Ever.",
  },
  {
    step: "04",
    title: "Schedule",
    body:
      "Reminders go into the reliability service — a deterministic queue separate from AI. They will fire on time even if everything else is slow.",
  },
  {
    step: "05",
    title: "Remind",
    body:
      "At the right moment, SAHAI speaks: \"It's time for your BP medicine.\" Three big buttons appear: TAKEN, SKIP, REMIND IN 10.",
  },
  {
    step: "06",
    title: "Escalate, only if needed",
    body:
      "If a critical medicine is missed, family gets a push. Then a phone call. Then an SMS. Until someone confirms that the elder is okay.",
  },
  {
    step: "07",
    title: "Remember",
    body:
      "Confirmed inputs and repeated patterns flow into long-term structured memory — visible in the family dashboard, exportable for the doctor.",
  },
];

export const CHANNELS: Channel[] = [
  { name: "Voice", body: "Primary. Tap-to-talk in Hindi or English." },
  { name: "WhatsApp", body: "Text + voice messages, same processing." },
  { name: "App UI", body: "Big-button fallback when voice fails." },
  { name: "IVR call", body: "Reminder calls with keypad input." },
];

export const ARCH: ArchService[] = [
  {
    name: "API Gateway",
    body: "The entry point. Authenticates, routes, rate-limits.",
  },
  {
    name: "Conversation Service",
    body: "AI layer only — no database access. Speech, intent, response.",
  },
  {
    name: "Data Service",
    body: "The single owner of the database. Append-only, audited.",
  },
  {
    name: "Reliability Service",
    body: "Reminders, escalation, retries. Deterministic by design.",
  },
  {
    name: "Notification Service",
    body: "Push, voice call, SMS. The chain that must always work.",
  },
];
