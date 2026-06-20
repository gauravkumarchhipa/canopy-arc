type LoaderProgressProps = {
  isDark: boolean;
  progress: number;
  progressLabel: string;
  progressPct: string;
};

export default function LoaderProgress({
  isDark,
  progress,
  progressLabel,
  progressPct,
}: LoaderProgressProps) {
  return (
    <div className="loader-progress-zone absolute bottom-[10%] left-1/2 z-20 w-full max-w-[20rem] -translate-x-1/2 px-6 text-center">
      <p
        className={`text-[0.625rem] font-medium tracking-[0.34em] uppercase sm:text-[0.6875rem] ${progressLabel}`}
      >
        Finalizing experience
      </p>
      <p className={`mt-2 text-[2rem] font-semibold leading-none tracking-tight ${progressPct}`}>
        {progress}%
      </p>
      <div className={`relative mt-3 h-px w-full ${isDark ? "bg-cyan-500/20" : "bg-blue-300/50"}`}>
        <div
          className={
            isDark
              ? "absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-sky-300 to-cyan-200 shadow-[0_0_18px_rgba(56,189,248,0.85)]"
              : "absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(37,99,235,0.45)]"
          }
          style={{ width: `${progress}%` }}
        />
        <span
          className={`loader-progress-thumb absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ${
            isDark
              ? "bg-white shadow-[0_0_14px_#fff,0_0_28px_rgba(56,189,248,0.95)]"
              : "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)]"
          }`}
          style={{ left: `clamp(0px, calc(${progress}% - 6px), calc(100% - 12px))` }}
        />
      </div>
    </div>
  );
}
