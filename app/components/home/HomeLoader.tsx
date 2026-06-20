"use client";

import { useEffect, useMemo, useState } from "react";
import ThemeAwareMark from "../ThemeAwareMark";
import { useTheme } from "../layout/ThemeProvider";
import "./home-loader.css";

/** Served from /public — use root paths, not /public/... imports */
const LOADER_EARTH = {
  dark: "/images/loader-earth-dark.jpg",
  light: "/images/loader-earth-light.jpg",
} as const;

interface HomeLoaderProps {
  /** Override theme for design preview */
  isDark?: boolean;
  /** When false, progress loops for preview; production uses true */
  autoFinish?: boolean;
}

const BAR_HEIGHTS = [30, 42, 54, 66, 78, 90, 66, 50];

const VB_W = 1200;
const VB_H = 900;
const HORIZON_Y = 560;
const APEX_X = 600;
const APEX_Y = 150;

const qb = (
  t: number,
  p0: [number, number],
  c: [number, number],
  p1: [number, number],
): [number, number] => {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0],
    u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1],
  ];
};

function meridian(spread: number) {
  const controlY = 2 * APEX_Y - HORIZON_Y;
  return {
    p0: [APEX_X - spread, HORIZON_Y] as [number, number],
    c: [APEX_X, controlY] as [number, number],
    p1: [APEX_X + spread, HORIZON_Y] as [number, number],
  };
}

function arc(x0: number, y0: number, x1: number, y1: number, cx: number, cy: number) {
  return {
    p0: [x0, y0] as [number, number],
    c: [cx, cy] as [number, number],
    p1: [x1, y1] as [number, number],
  };
}

const MERIDIAN_SPREADS = [1300, 1050, 850, 680, 520, 380, 260, 160, 80];

const CROSS_ARCS = [
  arc(120, 360, 1080, 360, 600, 230),
  arc(60, 440, 1140, 440, 600, 310),
  arc(220, 290, 980, 290, 600, 200),
  arc(320, 240, 880, 240, 600, 175),
  arc(-40, 540, 720, 230, 280, 320),
  arc(1240, 540, 480, 230, 920, 320),
  arc(80, 480, 820, 200, 380, 280),
  arc(1120, 480, 380, 200, 820, 280),
];

function sampleArc(
  a: { p0: [number, number]; c: [number, number]; p1: [number, number] },
  count: number,
) {
  const pts: [number, number, number][] = [];
  for (let i = 1; i < count; i++) {
    const t = i / count;
    const [x, y] = qb(t, a.p0, a.c, a.p1);
    const apexNess = 1 - Math.min(1, Math.abs(t - 0.5) * 2);
    pts.push([x, y, 0.55 + apexNess * 0.6]);
  }
  return pts;
}

function useDome() {
  return useMemo(() => {
    const meridians = MERIDIAN_SPREADS.map((s) => meridian(s));
    const allArcs = [...meridians, ...CROSS_ARCS];

    const nodes: [number, number, number, number][] = [];
    let idx = 0;
    meridians.forEach((m, i) => {
      const samples = sampleArc(m, 14 - Math.min(8, Math.floor(i / 1.5)));
      samples.forEach(([x, y, s]) => {
        if (y > HORIZON_Y - 6) return;
        nodes.push([x, y, 1.1 * s, idx++]);
      });
    });
    CROSS_ARCS.forEach((a) => {
      const samples = sampleArc(a, 8);
      samples.forEach(([x, y, s]) => {
        if (y > HORIZON_Y - 6) return;
        nodes.push([x, y, 0.95 * s, idx++]);
      });
    });

    return { allArcs, nodes };
  }, []);
}

function DomeLayer({ isDark }: { isDark: boolean }) {
  const { allArcs, nodes } = useDome();
  const stroke = isDark ? "rgba(125, 211, 252, 0.32)" : "rgba(37, 99, 235, 0.28)";
  const nodeFill = isDark ? "#bae6fd" : "#1d4ed8";

  return (
    <svg
      className="loader-dome-svg"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <filter id="dome-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g stroke={stroke} strokeWidth={isDark ? 0.55 : 0.5} fill="none" strokeLinecap="round">
        {allArcs.map((a, i) => (
          <path
            key={i}
            d={`M ${a.p0[0]} ${a.p0[1]} Q ${a.c[0]} ${a.c[1]} ${a.p1[0]} ${a.p1[1]}`}
          />
        ))}
      </g>

      <g filter={isDark ? "url(#dome-glow)" : undefined}>
        {nodes.map(([x, y, r, i]) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill={nodeFill}
            className="dome-node"
            style={{ animationDelay: `${(i % 11) * 0.18}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

function LoaderScene({ isDark }: { isDark: boolean }) {
  const earthSrc = isDark ? LOADER_EARTH.dark : LOADER_EARTH.light;

  return (
    <>
      <div
        className={`absolute inset-0 ${isDark ? "loader-bg-dark" : "loader-bg-light"}`}
        aria-hidden
      />
      {isDark && <div className="loader-stars" aria-hidden />}

      <div className="loader-earth-photo" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={earthSrc} alt="" draggable={false} fetchPriority="high" decoding="async" />
        <div
          className={`loader-earth-fade ${isDark ? "loader-earth-fade--dark" : "loader-earth-fade--light"}`}
        />
      </div>

      <DomeLayer isDark={isDark} />
    </>
  );
}

function LoaderBars({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex h-7 items-end justify-center gap-[3px]" aria-hidden>
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className={
            isDark
              ? "w-[3px] rounded-[1px] bg-gradient-to-t from-blue-700 via-sky-400 to-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
              : "w-[3px] rounded-[1px] bg-gradient-to-t from-blue-700 via-blue-500 to-sky-400"
          }
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default function HomeLoader({ isDark: isDarkProp, autoFinish = true }: HomeLoaderProps) {
  const theme = useTheme();
  const isDark = isDarkProp ?? theme === "dark";
  const [stage, setStage] = useState<"in" | "out" | "gone">("in");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const duration = 2400;
    const start = performance.now();
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (!autoFinish && pct >= 100) {
        window.setTimeout(() => setProgress(0), 1200);
        raf = requestAnimationFrame(tick);
        return;
      }

      if (pct < 100) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (!autoFinish) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, duration - elapsed);
      window.setTimeout(() => {
        setProgress(100);
        setStage("out");
        window.setTimeout(() => setStage("gone"), 700);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else {
      window.addEventListener("load", finish, { once: true });
      const safety = window.setTimeout(finish, 3400);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("load", finish);
        window.clearTimeout(safety);
      };
    }

    return () => cancelAnimationFrame(raf);
  }, [autoFinish]);

  useEffect(() => {
    if (stage === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [stage]);

  if (stage === "gone") return null;

  const tagline = isDark ? "text-slate-200/90" : "text-slate-600";
  const taglineMuted = isDark ? "text-slate-300" : "text-slate-700";
  const progressLabel = isDark ? "text-white" : "text-slate-800";
  const progressPct = isDark
    ? "text-cyan-200 drop-shadow-[0_0_24px_rgba(56,189,248,0.7)]"
    : "text-blue-700";
  const titleGrad = isDark
    ? "bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent"
    : "bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 bg-clip-text text-transparent";

  return (
    <div
      className={`fixed inset-0 z-[9990] overflow-hidden transition-opacity duration-700 ease-out ${
        stage === "out" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden
      aria-busy={stage === "in"}
    >
      <LoaderScene isDark={isDark} />

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
            <div className={isDark ? "loader-mark-glow" : "loader-mark-glow--light"}>
              <ThemeAwareMark
                alt="Canopy Arc"
                width={76}
                height={76}
                priority
                imgClassName="h-[4.25rem] w-[4.25rem] object-contain sm:h-[4.75rem] sm:w-[4.75rem]"
              />
            </div>
          </div>

          <LoaderBars isDark={isDark} />

          <p className={`mt-3 text-[0.625rem] font-medium tracking-[0.38em] uppercase sm:text-[0.6875rem] ${tagline}`}>
            Building digital solutions
          </p>

          <h1
            className="mt-2 font-display text-[clamp(2.85rem,9vw,4.75rem)] leading-none tracking-tight"
            style={{ fontWeight: 500 }}
          >
            <span className={titleGrad}>CANOPY</span>
          </h1>

          <p className={`mt-3 text-[0.625rem] tracking-[0.32em] uppercase sm:text-[0.6875rem] ${taglineMuted}`}>
            Enterprise-grade digital solutions
          </p>
        </div>
      </div>

      <div className="loader-progress-zone absolute bottom-[10%] left-1/2 z-20 w-full max-w-[20rem] -translate-x-1/2 px-6 text-center">
        <p className={`text-[0.625rem] font-medium tracking-[0.34em] uppercase sm:text-[0.6875rem] ${progressLabel}`}>
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
    </div>
  );
}
