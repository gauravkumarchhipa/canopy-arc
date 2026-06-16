export type FaqItem = {
  q: string;
  a: string;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export const SECTIONS: FaqSection[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "How long does setup take?",
        a: "Five minutes. The family member signs up first, fills the elder's profile (name, age, conditions, medicines), then shares a 6-digit pairing code with the elder's phone. Done.",
      },
      {
        q: "Does the elder need to be tech-savvy?",
        a: "No. The elder screen is a single big 'Tap to Talk' button. SAHAI listens. The elder speaks. Everything else happens in the background.",
      },
      {
        q: "Can SAHAI work without an internet connection?",
        a: "Yes. Reminders fire from the local queue even offline. SOS works through call + SMS without internet. Voice inputs are stored locally and synced when online.",
      },
      {
        q: "Which phones does SAHAI work on?",
        a: "Any iPhone with iOS 15+ and any Android with version 8+. We test specifically on budget Android phones — the kind most elders actually use.",
      },
    ],
  },
  {
    title: "Voice & languages",
    items: [
      {
        q: "Which languages does SAHAI speak?",
        a: "Today: Hindi and English, including a comfortable mix of both. Through the year we're rolling out Gujarati, Marathi, Tamil, Telugu, Bengali, Kannada, Punjabi, and Malayalam.",
      },
      {
        q: "What if SAHAI doesn't understand my parent?",
        a: "If confidence is low, SAHAI gently asks once for clarification. If voice fails repeatedly, it falls back to text or WhatsApp. Critical inputs are confirmed before being saved.",
      },
      {
        q: "Can the elder use SAHAI just for company?",
        a: "Yes. SAHAI listens warmly when an elder feels lonely or worried. It's not a general assistant — it stays in the lane of health and care — but it answers as a calm, present companion.",
      },
    ],
  },
  {
    title: "Family & alerts",
    items: [
      {
        q: "How many family members can be linked?",
        a: "Up to 3 family members per elder. One family member can manage up to 5 elders — useful for siblings caring for parents, or caregivers managing multiple seniors.",
      },
      {
        q: "Will the family be alerted for every little thing?",
        a: "No. Family receives one calm morning summary at 8 AM. They only get an active alert if a critical medicine is missed for 10 minutes, or the SOS button is pressed. Quiet most days. Loud only when it matters.",
      },
      {
        q: "What's the escalation chain when something goes wrong?",
        a: "Push notification first. If unacknowledged in 5 minutes, SAHAI auto-calls the family with a clear voice message. If the call goes unanswered, an SMS is sent. The chain is tested ten times before every release.",
      },
    ],
  },
  {
    title: "Doctors & medical",
    items: [
      {
        q: "Is SAHAI a doctor?",
        a: "No. SAHAI is a companion — it listens, logs, reminds, escalates. It does not diagnose, prescribe, or replace a medical professional. Reminders reflect what you, your family, or your doctor entered.",
      },
      {
        q: "Can I consult a real doctor through SAHAI?",
        a: "Yes, on the Premium Care and NRI Care plans. Verified physicians, geriatricians and pediatricians are available for voice and video consultations from inside the app — with patient context shared securely before the call.",
      },
      {
        q: "How are doctors verified?",
        a: "Every doctor on SAHAI has had their medical registration confirmed, agreement signed, and background reviewed. We monitor patient ratings, response times, and complaints.",
      },
    ],
  },
  {
    title: "Privacy & data",
    items: [
      {
        q: "Where is my data stored?",
        a: "Encrypted at rest (AES-256) and in transit (TLS), on servers in India. Append-only — nothing is silently overwritten or deleted.",
      },
      {
        q: "Do you sell health data?",
        a: "No. Never. We do not sell, rent or share individual health information with advertisers, brokers or third-party marketers — read the full policy at /privacy-policy.",
      },
      {
        q: "Can I export everything?",
        a: "Yes. Anytime. Full structured health memory as a PDF or machine-readable JSON. Your data, your decision.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "UPI (with auto-pay), credit and debit cards, net banking, Visa/Mastercard/Amex internationally. GST-compliant invoices for every transaction.",
      },
      {
        q: "Do you offer refunds?",
        a: "Cancel anytime, refund of any unused time within 7 working days. No questions asked.",
      },
      {
        q: "Can I gift SAHAI to my parents?",
        a: "Absolutely. NRIs and family abroad can pay for parents' subscription — your parents never see a payment screen.",
      },
    ],
  },
];
