export type InfoItem = {
  label: string;
  body: string;
};

export const INFO_ITEMS: InfoItem[] = [
  {
    label: "What gets removed",
    body: "Your name, phone number, health logs, and other personal identifiers tied to your account.",
  },
  {
    label: "What may remain",
    body: "Anonymised aggregate analytics that cannot be traced back to you.",
  },
  {
    label: "Timeline",
    body: "We verify your details and process deletion within two working days.",
  },
];
