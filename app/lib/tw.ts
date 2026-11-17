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

export function headerShellClass({
  elevated,
  hidden,
  open,
}: {
  elevated: boolean;
  hidden: boolean;
  open: boolean;
}) {
  return [
    "premium-site-header group/header fixed inset-x-0 top-0 z-50 will-change-transform border-b border-transparent",
    hidden
      ? "-translate-y-full opacity-0 pointer-events-none"
      : "translate-y-0 opacity-100 pointer-events-auto",
    "transition-[transform,opacity,padding,background-color,border-color,box-shadow] duration-300 ease-out",
    elevated
      ? "is-scrolled py-3 border-[var(--header-border)] bg-[var(--header-bg)] shadow-[var(--header-shadow)] backdrop-blur-xl backdrop-saturate-140"
      : "py-5",
    "[html[data-theme=light]_&]:bg-[rgba(248,251,255,0.9)] [html[data-theme=light]_&]:backdrop-blur-md",
    elevated &&
      "[html[data-theme=light]_&]:bg-[rgba(248,251,255,0.96)] [html[data-theme=light]_&]:shadow-[0_8px_28px_-18px_rgba(11,18,32,0.12)]",
    elevated && "[html[data-theme=dark]_&]:shadow-[0_10px_36px_-20px_rgba(0,0,0,0.45)]",
    open && "max-md:border-transparent max-md:shadow-none",
    open && "[html[data-theme=light]_&]:max-md:bg-[rgba(248,251,255,0.97)]",
    "[html[data-theme=light]_&]:max-md:bg-[rgba(248,251,255,0.94)]",
    open ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");
}
