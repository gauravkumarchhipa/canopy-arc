import {
  glowHoverCardText,
  glowHoverCardTitle,
} from "../../ui/glow-card-styles";

export const footerSupportGlow =
  "mt-8 flex gap-[0.85rem] rounded-2xl p-4 px-[1.1rem]";

export const footerSupportIcon =
  "relative z-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-[var(--service-card-arrow-bg)] text-accent transition-[border-color,background-color,color] duration-[400ms] group-hover:border-white/28 group-hover:bg-white/12 group-hover:text-white [&_svg]:h-4 [&_svg]:w-4";

export const footerSupportTitle = `${glowHoverCardTitle} font-semibold`;

export const footerSupportText =
  "relative z-1 mt-1 text-xs leading-relaxed text-muted transition-colors duration-[400ms] group-hover:text-white/82 group-focus-within:text-white/82";

export const footerSupportLink =
  "relative z-1 mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-[400ms] group-hover:text-white group-focus-within:text-white";

export const footerSocialGlow =
  "inline-flex h-[2.65rem] w-[2.65rem] shrink-0 items-center justify-center rounded-xl";

export const footerSocialIcon =
  "relative z-1 text-foreground transition-colors duration-[400ms] group-hover:text-white group-focus-within:text-white [&_svg]:h-4 [&_svg]:w-4";
