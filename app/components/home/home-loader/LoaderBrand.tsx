import ThemeAwareMark from "../../ThemeAwareMark";

type LoaderBrandProps = {
  isDark: boolean;
  tagline: string;
  taglineMuted: string;
  titleGrad: string;
};

export default function LoaderBrand({
  isDark,
  tagline,
  taglineMuted,
  titleGrad,
}: LoaderBrandProps) {
  return (
    <div className="loader-brand-zone absolute left-1/2 top-[14%] z-20 w-full max-w-lg -translate-x-1/2 px-6 text-center">
      <div className="flex flex-col items-center">
        <div className="relative mb-3 flex h-[5.5rem] w-[5.5rem] items-center justify-center sm:h-[6rem] sm:w-[6rem]">
          <div
            className={`absolute inset-0 rounded-full border ${isDark ? "border-cyan-400/40" : "border-blue-400/30"}`}
            aria-hidden
          />
          <div
            className={`absolute -inset-3 rounded-full border border-dashed ${isDark ? "border-cyan-400/20" : "border-blue-400/20"}`}
            aria-hidden
          />
          <div className={`scale-[1.3] ${isDark ? "loader-mark-glow" : "loader-mark-glow--light"}`}>
            <ThemeAwareMark
              alt="Canopy Arc"
              width={76}
              height={76}
              priority
              imgClassName="h-[4.25rem] w-[4.25rem] object-contain sm:h-[4.75rem] sm:w-[4.75rem]"
            />
          </div>
        </div>

        <p
          className={`mt-3 text-[0.625rem] font-medium tracking-[0.38em] uppercase sm:text-[0.6875rem] ${tagline}`}
        >
          Building digital solutions
        </p>

        <h1
          className="mt-2 font-display text-[clamp(2.85rem,9vw,4.75rem)] leading-none tracking-tight"
          style={{ fontWeight: 500 }}
        >
          <span className={titleGrad}>CANOPY</span>
        </h1>

        <p
          className={`mt-3 text-[0.625rem] tracking-[0.32em] uppercase sm:text-[0.6875rem] ${taglineMuted}`}
        >
          Enterprise-grade digital solutions
        </p>
      </div>
    </div>
  );
}
