import type { ReactNode } from "react";

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
};

export const SERVICE_ICONS: Record<string, ReactNode> = {
  code: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="m16 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m8 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  smartphone: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" strokeLinecap="round" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.12 4 4 0 0 0 .556 6.588 4 4 0 0 0 7.636 2.106 3.2 3.2 0 0 0 .331-1.339 4 4 0 0 0 4.066-4.114 4 4 0 0 0-2.066-3.366Z" />
      <path d="M9 12a3 3 0 0 0 6 0" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  layout: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11 6v12" />
      <path d="M7 14v4a2 2 0 0 0 4 0v-4" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="m21 16-8 5-8-5V8l8-5 8 5z" />
      <path d="M12 22V12" />
      <path d="m21 8-8 5-8-5" />
      <path d="M3 8l8 5 8-5" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01M6 18h.01" />
    </svg>
  ),
  checklist: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M9 11 11 13 15 9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  ),
};
