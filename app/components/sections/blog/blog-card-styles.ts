export const blogCardShell =
  "group/card flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface no-underline";

export const blogCardImage =
  "relative aspect-[16/10] overflow-hidden bg-[image:var(--grad-soft)]";

export const blogCardImageWash =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(6,182,212,0.12),rgba(124,58,237,0.16))]";

export const blogCardImageGrid =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[48px_48px] opacity-20";

export const blogCardImageInitial =
  "relative z-1 font-display text-3xl font-semibold text-accent/30";

export const blogCardBodyGlow =
  "relative z-0 flex flex-1 flex-col border-t border-line bg-[var(--service-card-bg)] p-5 transition-[border-color] duration-[400ms] group-hover/card:border-transparent group-focus-within/card:border-transparent";

export const blogCardBodyGradient =
  "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:opacity-100 group-focus-within/card:opacity-100 bg-[linear-gradient(145deg,#1d4ed8_0%,#2563eb_42%,#1e40af_100%)]";

export const blogCardBodyPattern =
  "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:opacity-90 group-focus-within/card:opacity-90 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.14),transparent_42%),repeating-radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08)_0_1px,transparent_1px_18px)]";

export const blogCardMeta =
  "relative z-1 flex flex-wrap items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent transition-colors duration-[400ms] group-hover/card:text-white/85";

export const blogCardTitle =
  "relative z-1 mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-[400ms] group-hover/card:text-white";

export const blogCardExcerpt =
  "relative z-1 mt-2 flex-1 text-sm leading-relaxed text-muted transition-colors duration-[400ms] group-hover/card:text-white/82";

export const blogCardTag =
  "relative z-1 rounded-full border border-line bg-background/70 px-2 py-0.5 text-[0.625rem] text-muted transition-[border-color,background-color,color] duration-[400ms] group-hover/card:border-white/22 group-hover/card:bg-white/10 group-hover/card:text-white/85";

export const blogCardLink =
  "relative z-1 mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors duration-[400ms] group-hover/card:text-white";
