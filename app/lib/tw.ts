/** Shared Tailwind class strings (no globals.css component classes). */
export const tw = {
  gradientText: "bg-[image:var(--grad)] bg-clip-text text-transparent",
  gridBg:
    "bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px]",
  maskFadeBottom:
    "[mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)]",
  glass: "border border-line bg-surface backdrop-blur-xl backdrop-saturate-140",
  headerBtnBase:
    "inline-flex items-center justify-center gap-1.5 rounded-full px-[1.35rem] py-2.5 text-sm font-medium tracking-tight no-underline whitespace-nowrap transition-[transform,box-shadow,border-color,background,color] duration-300",
  headerBtnPrimary:
    "border border-transparent bg-[image:var(--grad)] text-white shadow-[var(--btn-header-primary-shadow)] hover:-translate-y-px hover:shadow-[var(--btn-header-primary-shadow-hover)]",
  headerBtnGhost:
    "border border-[var(--btn-header-ghost-border)] bg-[var(--btn-header-ghost-bg)] text-[var(--btn-header-ghost-fg)] hover:border-[var(--btn-header-ghost-border-hover)] hover:bg-[var(--btn-header-ghost-bg-hover)] hover:text-[var(--btn-header-ghost-fg-hover)] [html[data-theme=light]_&]:border-[rgba(11,18,32,0.28)] [html[data-theme=light]_&]:bg-white [html[data-theme=light]_&]:text-[#0b1220] [html[data-theme=light]_&]:shadow-[0_1px_2px_rgba(11,18,32,0.06)] [html[data-theme=light]_&]:hover:border-[rgba(11,18,32,0.42)] [html[data-theme=light]_&]:hover:bg-[#f8fbff]",
  headerIconBtn:
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--header-icon-border)] bg-[var(--header-icon-bg)] text-[var(--header-icon-fg)] transition-[border-color,background,color] duration-250 hover:border-[var(--header-icon-border-hover)] hover:bg-[var(--header-icon-bg-hover)] [html[data-theme=light]_&]:border-[rgba(11,18,32,0.16)] [html[data-theme=light]_&]:bg-[rgba(255,255,255,0.82)] [html[data-theme=light]_&]:text-[#0b1220] [html[data-theme=light]_&]:hover:border-[rgba(11,18,32,0.26)] [html[data-theme=light]_&]:hover:bg-white [html[data-theme=dark]_&]:border-[rgba(248,250,252,0.34)] [html[data-theme=dark]_&]:bg-[rgba(248,250,252,0.04)] [html[data-theme=dark]_&]:text-[#f8fafc] [html[data-theme=dark]_&]:hover:border-[rgba(248,250,252,0.5)] [html[data-theme=dark]_&]:hover:bg-[rgba(248,250,252,0.1)] group-[.is-scrolled]/header:bg-[var(--header-icon-bg-hover)] [html[data-theme=light]_&]:group-[.is-scrolled]/header:border-[rgba(11,18,32,0.2)] [html[data-theme=light]_&]:group-[.is-scrolled]/header:bg-white",
  brandOrb:
    "pointer-events-none absolute rounded-full blur-[80px] opacity-55",
  brandOrbWarm:
    "bg-[radial-gradient(closest-side,rgba(242,153,74,0.55),transparent_70%)] [html[data-theme=dark]_&]:bg-[radial-gradient(closest-side,rgba(255,176,104,0.5),transparent_70%)]",
  brandOrbTrust:
    "bg-[radial-gradient(closest-side,rgba(43,179,163,0.45),transparent_70%)] [html[data-theme=dark]_&]:bg-[radial-gradient(closest-side,rgba(78,209,193,0.4),transparent_70%)]",
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
    "group/header fixed inset-x-0 top-0 z-50 will-change-transform border-b border-transparent",
    "translate-y-0 opacity-100 pointer-events-auto",
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
    hidden && "-translate-y-[110%] opacity-0 pointer-events-none",
    open ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");
}
