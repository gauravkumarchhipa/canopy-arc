import { impactCardHoverZoom } from "../home/impact/impact-styles";

export const workCardShell =
  `premium-work-card group/card flex flex-col overflow-hidden bg-surface no-underline ${impactCardHoverZoom}`;

export const workCardImage =
  "relative h-52 overflow-hidden bg-[image:var(--grad-soft)] sm:h-60";

export const workCardImageWash = "absolute inset-0 bg-surface";

export const workCardImageGrid =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25";

export const workCardImageIcon =
  "relative z-1 inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-line bg-background text-accent [&_svg]:h-8 [&_svg]:w-8";

export const workCardBodyGlow =
  "relative z-0 flex flex-1 flex-col border-t border-line bg-[var(--service-card-bg)] p-6 transition-[border-color] duration-[400ms] sm:p-7 group-hover/card:border-transparent group-focus-within/card:border-transparent";

export const workCardBodyGradient = "hidden";

export const workCardBodyPattern = "hidden";

export const workCardIconBox =
  "relative z-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-[var(--service-card-arrow-bg)] text-accent transition-[border-color,background-color,color] duration-[400ms] group-hover/card:border-line-strong group-hover/card:bg-surface-strong group-hover/card:text-foreground [&_svg]:h-5 [&_svg]:w-5";

export const workCardHighlight =
  "relative z-1 hidden rounded-lg border border-accent/25 bg-accent/8 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent transition-[border-color,background-color,color] duration-[400ms] group-hover/card:border-line-strong group-hover/card:bg-surface-strong group-hover/card:text-foreground sm:inline-block";

export const workCardExternalBtn =
  "relative z-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-[var(--service-card-arrow-bg)] text-foreground/70 transition-[border-color,background-color,color] duration-[400ms] group-hover/card:border-transparent group-hover/card:bg-surface-strong group-hover/card:text-foreground [&_svg]:h-4 [&_svg]:w-4";

export const workCardMeta =
  "relative z-1 mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent transition-colors duration-[400ms] group-hover/card:text-muted group-focus-within/card:text-muted";

export const workCardTitle =
  "relative z-1 mt-2 font-display text-xl font-semibold tracking-tight text-foreground transition-colors duration-[400ms] sm:text-2xl group-hover/card:text-foreground group-focus-within/card:text-foreground";

export const workCardDescription =
  "relative z-1 mt-3 flex-1 text-sm leading-relaxed text-muted transition-colors duration-[400ms] group-hover/card:text-muted group-focus-within/card:text-muted";

export const workCardLiveLink =
  "relative z-1 mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-[400ms] group-hover/card:text-foreground group-focus-within/card:text-foreground";
