import {
  impactCardGradient,
  impactCardHoverZoom,
  impactCardPattern,
} from "../home/impact/impact-styles";

export const workCardShell =
  `group/card flex flex-col overflow-hidden rounded-3xl border border-line bg-surface no-underline ${impactCardHoverZoom} hover:z-10 hover:border-transparent hover:shadow-[0_28px_64px_-24px_rgba(37,99,235,0.72)]`;

export const workCardImage =
  "relative h-52 overflow-hidden bg-[image:var(--grad-soft)] sm:h-60";

export const workCardImageWash =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(6,182,212,0.12),rgba(124,58,237,0.16))]";

export const workCardImageGrid =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25";

export const workCardImageIcon =
  "relative z-1 inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-line bg-background text-accent [&_svg]:h-8 [&_svg]:w-8";

export const workCardBodyGlow =
  "relative z-0 flex flex-1 flex-col border-t border-line bg-[var(--service-card-bg)] p-6 transition-[border-color] duration-[400ms] sm:p-7 group-hover/card:border-transparent group-focus-within/card:border-transparent";

export const workCardBodyGradient =
  `pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:opacity-100 group-focus-within/card:opacity-100 ${impactCardGradient}`;

export const workCardBodyPattern =
  `pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:opacity-90 group-focus-within/card:opacity-90 ${impactCardPattern}`;

export const workCardIconBox =
  "relative z-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-[var(--service-card-arrow-bg)] text-accent transition-[border-color,background-color,color] duration-[400ms] group-hover/card:border-white/28 group-hover/card:bg-white/12 group-hover/card:text-white [&_svg]:h-5 [&_svg]:w-5";

export const workCardHighlight =
  "relative z-1 hidden rounded-lg border border-accent/25 bg-accent/8 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent transition-[border-color,background-color,color] duration-[400ms] group-hover/card:border-white/28 group-hover/card:bg-white/12 group-hover/card:text-white sm:inline-block";

export const workCardExternalBtn =
  "relative z-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-[var(--service-card-arrow-bg)] text-foreground/70 transition-[border-color,background-color,color] duration-[400ms] group-hover/card:border-transparent group-hover/card:bg-white group-hover/card:text-[#1d4ed8] [&_svg]:h-4 [&_svg]:w-4";

export const workCardMeta =
  "relative z-1 mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent transition-colors duration-[400ms] group-hover/card:text-white/85 group-focus-within/card:text-white/85";

export const workCardTitle =
  "relative z-1 mt-2 font-display text-xl font-semibold tracking-tight text-foreground transition-colors duration-[400ms] sm:text-2xl group-hover/card:text-white group-focus-within/card:text-white";

export const workCardDescription =
  "relative z-1 mt-3 flex-1 text-sm leading-relaxed text-muted transition-colors duration-[400ms] group-hover/card:text-white/82 group-focus-within/card:text-white/82";

export const workCardLiveLink =
  "relative z-1 mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-[400ms] group-hover/card:text-white group-focus-within/card:text-white";
