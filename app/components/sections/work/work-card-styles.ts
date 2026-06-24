import {
  impactCardGradient,
  impactCardHoverZoom,
  impactCardPattern,
} from "../home/impact/impact-styles";

export const workCardShell =
  `group/card flex flex-col overflow-hidden rounded-3xl border border-line bg-surface no-underline ${impactCardHoverZoom} hover:z-10 hover:border-transparent hover:shadow-[0_28px_64px_-24px_rgba(37,99,235,0.72)]`;

export const workCardImage =
  "relative h-52 overflow-hidden bg-background/60 sm:h-60";

export const workCardBodyGlow =
  "relative z-0 flex flex-1 flex-col border-t border-line bg-[var(--service-card-bg)] p-6 transition-[border-color] duration-[400ms] group-hover/card:border-transparent group-focus-within/card:border-transparent";

export const workCardBodyGradient =
  `pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:opacity-100 group-focus-within/card:opacity-100 ${impactCardGradient}`;

export const workCardBodyPattern =
  `pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:opacity-90 group-focus-within/card:opacity-90 ${impactCardPattern}`;

export const workCardCategory =
  "relative z-1 text-xs tracking-[0.25em] uppercase text-muted transition-colors duration-[400ms] group-hover/card:text-white/75 group-focus-within/card:text-white/75";

export const workCardLink =
  "relative z-1 text-sm text-foreground/70 transition-colors duration-[400ms] group-hover/card:text-white group-focus-within/card:text-white";

export const workCardTitle =
  "relative z-1 mt-3 text-xl font-semibold tracking-tight text-foreground transition-colors duration-[400ms] group-hover/card:text-white group-focus-within/card:text-white";

export const workCardSubtitle =
  "relative z-1 mt-2 text-sm leading-relaxed text-muted transition-colors duration-[400ms] group-hover/card:text-white/82 group-focus-within/card:text-white/82";

export const workCardTag =
  "relative z-1 rounded-full border border-line bg-background/60 px-3 py-1 text-xs text-muted transition-[border-color,background-color,color] duration-[400ms] group-hover/card:border-white/22 group-hover/card:bg-white/10 group-hover/card:text-white/85 group-focus-within/card:border-white/22 group-focus-within/card:bg-white/10 group-focus-within/card:text-white/85";
