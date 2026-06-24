import type { ReactNode } from "react";

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
};

export const WORK_PRODUCT_ICONS: Record<string, ReactNode> = {
  Sparkles: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M9.94 2.94 8 7l-4.06 1.94L8 10.94l1.94 4.06L12 10.94l4.06-1.94L12 7 10.06 2.94Z" />
      <path d="M19 14l-1 2-2 1 2 1 1 2 1-2 2-1-2-1-1-2Z" />
    </svg>
  ),
  Calculator: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h8" strokeLinecap="round" />
    </svg>
  ),
  Smartphone: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" strokeLinecap="round" />
    </svg>
  ),
  Search: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  ),
  FileText: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
    </svg>
  ),
  Factory: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M2 20V10l6 4V10l6 4V4l8 4v12H2Z" />
      <path d="M6 20v-4M10 20v-4M14 20v-4M18 20v-4" strokeLinecap="round" />
    </svg>
  ),
};

export function ExternalLinkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M7 17 17 7" strokeLinecap="round" />
      <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
