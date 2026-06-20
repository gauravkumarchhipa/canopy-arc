export function getLoaderThemeClasses(isDark: boolean) {
  return {
    tagline: isDark ? "text-slate-200/90" : "text-slate-600",
    taglineMuted: isDark ? "text-slate-300" : "text-slate-700",
    progressLabel: isDark ? "text-white" : "text-slate-800",
    progressPct: isDark
      ? "text-cyan-200 drop-shadow-[0_0_24px_rgba(56,189,248,0.7)]"
      : "text-blue-700",
    titleGrad: isDark
      ? "bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent"
      : "bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 bg-clip-text text-transparent",
  };
}
