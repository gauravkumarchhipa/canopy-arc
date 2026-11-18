/** Shared Tailwind class strings (no globals.css component classes). */
export const tw = {
  gradientText: "text-muted",
  gridBg:
    "bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px]",
  maskFadeBottom:
    "[mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)]",
  glass: "border border-line bg-surface backdrop-blur-xl backdrop-saturate-140",
  headerBtnBase:
    "inline-flex items-center justify-center gap-1.5 rounded-full px-[1.35rem] py-2.5 text-sm font-medium tracking-tight no-underline whitespace-nowrap transition-[transform,box-shadow,border-color,background,color] duration-300",
  headerBtnPrimary:
    "border-0 bg-foreground text-background hover:bg-accent rounded-sm",
  /** Gradient CTA with dark text on light theme (hero/about body CTAs). */
  pageBtnPrimary:
    "border-0 bg-foreground text-background hover:bg-accent rounded-sm",
  headerBtnGhost:
    "border-0 bg-transparent text-foreground hover:bg-surface rounded-sm",
  headerIconBtn:
    "inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface",
  brandOrb:
    "hidden",
  brandOrbWarm:
    "bg-[radial-gradient(closest-side,rgba(242,153,74,0.55),transparent_70%)] [html[data-theme=dark]_&]:bg-[radial-gradient(closest-side,rgba(255,176,104,0.5),transparent_70%)]",
  brandOrbTrust:
    "bg-[radial-gradient(closest-side,rgba(43,179,163,0.45),transparent_70%)] [html[data-theme=dark]_&]:bg-[radial-gradient(closest-side,rgba(78,209,193,0.4),transparent_70%)]",
  /** Clears fixed header (tall mobile logo + tagline + py-5). */
  pageShell:
    "pt-[10rem] sm:pt-36 md:pt-40 pb-20 sm:pb-24 [scroll-margin-top:10rem] md:[scroll-margin-top:9rem]",
  pageIntro: "mx-auto max-w-350 px-6 lg:px-10 pb-10 sm:pb-14",
  pageShellBottom: "pb-20 sm:pb-24",
} as const;
