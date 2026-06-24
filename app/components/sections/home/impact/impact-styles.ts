export const impactCardGradient =
  "bg-[linear-gradient(145deg,#1d4ed8_0%,#2563eb_42%,#1e40af_100%)]";

export const impactCardPattern =
  "bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.14),transparent_42%),repeating-radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08)_0_1px,transparent_1px_18px)]";

export const impactCardGlow =
  "shadow-[0_24px_60px_-28px_rgba(37,99,235,0.65)]";

export const impactCardHoverZoom =
  "origin-center transition-[transform,box-shadow,border-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100";

export const impactStatCard =
  `group relative z-0 flex min-h-[9.5rem] flex-col overflow-hidden rounded-2xl border border-line bg-[var(--service-card-bg)] p-[1.15rem_1.1rem_1.25rem] ${impactCardHoverZoom} hover:border-transparent hover:shadow-[0_28px_64px_-24px_rgba(37,99,235,0.72)]`;

export const impactStatCardGradient =
  `pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 ${impactCardGradient}`;

export const impactStatCardPattern =
  `pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-90 ${impactCardPattern}`;

export const impactStatIconBox =
  "relative z-1 inline-flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[0.7rem] border border-line-strong bg-[var(--service-card-arrow-bg)] text-accent [&_svg]:block [&_svg]:h-4.5 [&_svg]:w-4.5 transition-[border-color,background-color,color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/28 group-hover:bg-white/12 group-hover:text-white";

export const impactStatValue =
  "relative z-1 m-0 text-[clamp(1.65rem,2.5vw,2rem)] leading-none font-semibold tracking-tight text-accent transition-colors duration-[400ms] group-hover:text-white";

export const impactStatLabel =
  "relative z-1 mt-3.5 text-[0.9375rem] leading-snug font-semibold text-foreground transition-colors duration-[400ms] group-hover:text-white";

export const impactStatAccentLine =
  "relative z-1 mt-2.5 mb-2 block h-0.5 w-8 rounded-full bg-[linear-gradient(90deg,var(--accent),rgba(6,182,212,0.65))] transition-[width,background-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12 group-hover:bg-white/55";

export const impactStatDescription =
  "relative z-1 m-0 text-xs leading-snug text-muted transition-colors duration-[400ms] group-hover:text-white/82";

export const impactCommitmentCard =
  `group relative z-0 mt-8 overflow-hidden rounded-[1.15rem] border border-line bg-[var(--service-card-bg)] p-5 sm:mt-10 lg:p-6 ${impactCardHoverZoom} hover:border-transparent hover:shadow-[0_28px_64px_-24px_rgba(37,99,235,0.72)] flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8`;

export const impactCommitmentLeadIcon =
  "relative z-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.8rem] border border-line-strong bg-[var(--service-card-arrow-bg)] text-accent [&_svg]:h-5 [&_svg]:w-5 transition-[border-color,background-color,color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/28 group-hover:bg-white/12 group-hover:text-white";

export const impactCommitmentTitle =
  "relative z-1 m-0 text-[1.05rem] font-semibold text-foreground transition-colors duration-[400ms] group-hover:text-white";

export const impactCommitmentDescription =
  "relative z-1 mt-1.75 text-[0.8125rem] leading-snug text-muted transition-colors duration-[400ms] group-hover:text-white/82";

export const impactCommitmentLead =
  "relative z-1 flex min-w-0 items-start gap-4 lg:flex-[0_0_34%] lg:border-r lg:border-line lg:pr-6 transition-[border-color] duration-[400ms] group-hover:border-white/20";

export const impactCommitmentPillarIcon =
  "relative z-1 inline-flex h-9 w-9 items-center justify-center rounded-[0.65rem] border border-line-strong bg-[var(--service-card-arrow-bg)] text-accent [&_svg]:h-4 [&_svg]:w-4 transition-[border-color,background-color,color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/28 group-hover:bg-white/12 group-hover:text-white";

export const impactCommitmentPillarTitle =
  "relative z-1 mt-2.5 text-[0.8125rem] font-semibold text-foreground transition-colors duration-[400ms] group-hover:text-white";

export const impactCommitmentPillarDescription =
  "relative z-1 mt-1 text-[0.6875rem] leading-snug text-muted transition-colors duration-[400ms] group-hover:text-white/75";

export const impactFeaturedCard =
  `group relative z-0 flex min-h-72 flex-col justify-end overflow-hidden rounded-2xl p-6 text-white ${impactCardGradient} ${impactCardGlow} ${impactCardHoverZoom} hover:shadow-[0_32px_72px_-22px_rgba(37,99,235,0.78)] lg:min-h-full lg:p-8`;

export const impactFeaturedIcon =
  "relative z-1 mb-auto inline-flex h-13 w-13 items-center justify-center rounded-full border border-white/28 bg-white/12 shadow-[0_0_28px_rgba(255,255,255,0.18)] transition-[background-color,border-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/40 group-hover:bg-white/18 [&_svg]:h-5.5 [&_svg]:w-5.5";
