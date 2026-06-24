import {
  impactCardGradient,
  impactCardHoverZoom,
  impactCardPattern,
} from "../sections/home/impact/impact-styles";

export const glowHoverCard =
  `group relative z-0 overflow-hidden rounded-3xl border border-line bg-[var(--service-card-bg)] ${impactCardHoverZoom} hover:border-transparent hover:shadow-[0_28px_64px_-24px_rgba(37,99,235,0.72)] focus-within:border-transparent focus-within:shadow-[0_28px_64px_-24px_rgba(37,99,235,0.72)]`;

export const glowHoverCardGradient =
  `pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-within:opacity-100 ${impactCardGradient}`;

export const glowHoverCardPattern =
  `pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-90 group-focus-within:opacity-90 ${impactCardPattern}`;

export const glowHoverCardTitle =
  "relative z-1 text-sm font-semibold text-foreground/90 transition-colors duration-[400ms] group-hover:text-white group-focus-within:text-white";

export const glowHoverCardText =
  "relative z-1 text-sm text-muted transition-colors duration-[400ms] group-hover:text-white/82 group-focus-within:text-white/82";

export const glowHoverCardLabel =
  "relative z-1 text-xs tracking-[0.2em] uppercase text-muted transition-colors duration-[400ms] group-hover:text-white/75 group-focus-within:text-white/75";

export const glowHoverCardEyebrow =
  "relative z-1 text-xs font-semibold tracking-[0.2em] uppercase text-accent transition-colors duration-[400ms] group-hover:text-white/85 group-focus-within:text-white/85";

export const glowHoverCardHeading =
  "relative z-1 font-display text-2xl font-semibold tracking-tight text-foreground transition-colors duration-[400ms] group-hover:text-white group-focus-within:text-white";

export const glowHoverCardLink =
  "relative z-1 block transition-colors duration-[400ms] text-muted group-hover:text-white/90 group-focus-within:text-white/90 hover:text-white";

export const glowHoverCardBullet =
  "relative z-1 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-colors duration-[400ms] group-hover:bg-white group-focus-within:bg-white";

export const glowHoverCardInput =
  "relative z-1 mt-2 w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-3 text-sm text-foreground shadow-none outline-none transition-[border-color,color] duration-[300ms] placeholder:text-muted/80 focus:border-accent focus:ring-0 group-hover:border-white/40 group-focus-within:border-white/50 group-hover:text-white group-focus-within:text-white group-hover:placeholder:text-white/50 group-focus-within:placeholder:text-white/50";

export const glowHoverCardTextarea =
  `${glowHoverCardInput} min-h-[9rem] resize-y`;

export const glowHoverCardFooter =
  "relative z-1 text-xs text-muted transition-colors duration-[400ms] group-hover:text-white/75 group-focus-within:text-white/75";
