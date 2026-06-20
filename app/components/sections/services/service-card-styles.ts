import {
  impactCardHoverZoom,
  impactStatCardGradient,
  impactStatCardPattern,
} from "../home/impact/impact-styles";

export const serviceCardGradient = impactStatCardGradient;
export const serviceCardPattern = impactStatCardPattern;

export const serviceCard =
  `group relative z-0 flex min-h-[11rem] flex-col overflow-hidden rounded-2xl border border-line bg-[var(--service-card-bg)] p-5 no-underline ${impactCardHoverZoom} hover:border-transparent hover:shadow-[0_28px_64px_-24px_rgba(37,99,235,0.72)]`;

export const serviceCardHeaderAction =
  "relative z-1 flex shrink-0 items-center gap-2.5";

export const serviceCardIndex =
  "font-mono text-[0.6875rem] tabular-nums tracking-[0.08em] text-muted transition-colors duration-[400ms] group-hover:text-white/75";

export const serviceCardArrow =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-[var(--service-card-arrow-bg)] text-foreground/65 transition-[border-color,background-color,color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/28 group-hover:bg-white/12 group-hover:text-white [html[data-theme=dark]_&]:text-foreground/75";

export const serviceCardArrowIcon =
  "service-card-arrow-icon h-4 w-4 origin-center";

export const serviceCardTag =
  "relative z-1 text-[0.625rem] font-semibold tracking-[0.22em] uppercase text-muted transition-colors duration-[400ms] group-hover:text-white/80";

export const serviceCardTitle =
  "relative z-1 mt-4 font-display text-[1.15rem] leading-snug font-semibold tracking-tight text-foreground transition-colors duration-[400ms] group-hover:text-white sm:text-[1.25rem]";

export const serviceCardSubtitle =
  "relative z-1 mt-3 flex-1 text-sm leading-relaxed text-muted transition-colors duration-[400ms] group-hover:text-white/82";

export const serviceCardMeta =
  "relative z-1 mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-muted transition-[border-color,color] duration-[400ms] group-hover:border-white/20 group-hover:text-white/75";

export const serviceCardMetaLink =
  "font-medium text-foreground/70 transition-colors duration-[400ms] group-hover:text-white";
