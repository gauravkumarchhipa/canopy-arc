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
const APEX_Y = 102;

type ArcDef = {
  p0: [number, number];
  c: [number, number];
  p1: [number, number];
};

/** Fewer bands = cleaner linked grid */
const LATITUDE_LEVELS = [0.14, 0.26, 0.38, 0.5, 0.62, 0.74, 0.86];

const MERIDIAN_SPREADS = [640, 520, 400, 290, 195, 115, 55, 20];

/** Horizontal stretch from top center — wider edge reach */
const MESH_STRETCH_X = 1.28;

/** Full-width top rim */
const TOP_RIM_ARCS: ArcDef[] = [
  arc(-20, 0, 1220, 0, APEX_X, 42),
  arc(-20, 0, 1220, 0, APEX_X, 78),
  arc(-40, 58, 1240, 58, APEX_X, 12),
];

const TOP_RIM_LINES: [number, number, number, number][] = [
  [0, 0, APEX_X, APEX_Y],
  [1200, 0, APEX_X, APEX_Y],
  [0, 0, 360, 175],
  [1200, 0, 840, 175],
];

/** Outer wrap curves — reach screen edges */
const SIDE_ARCS: ArcDef[] = [
  arc(-20, 530, 700, 230, 260, 320),
  arc(1220, 530, 500, 230, 940, 320),
  arc(40, 460, 790, 200, 360, 275),
  arc(1160, 460, 410, 200, 840, 275),
];

function arc(x0: number, y0: number, x1: number, y1: number, cx: number, cy: number): ArcDef {
  return {
    p0: [x0, y0],
    c: [cx, cy],
    p1: [x1, y1],
  };
}

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

function meridian(spread: number): ArcDef {
  const controlY = 2 * APEX_Y - HORIZON_Y;
  return {
    p0: [APEX_X - spread, HORIZON_Y],
    c: [APEX_X, controlY],
    p1: [APEX_X + spread, HORIZON_Y],
  };
}

function pointOnArc(a: ArcDef, t: number): [number, number] {
  return qb(t, a.p0, a.c, a.p1);
}

/** Latitude arc linking meridian points at the same depth — true grid connectivity */
function latitudeArcThrough(meridians: ArcDef[], t: number): ArcDef {
  const pts = meridians.map((m) => pointOnArc(m, t));
  const left = pts[0];
  const right = pts[pts.length - 1];
  const mid = pts[Math.floor(pts.length / 2)];
  const cy = Math.min(mid[1] - 6, APEX_Y + (mid[1] - APEX_Y) * 0.42);
  return arc(left[0], left[1], right[0], right[1], APEX_X, cy);
}

function arcPath(a: ArcDef) {
  return `M ${a.p0[0]} ${a.p0[1]} Q ${a.c[0]} ${a.c[1]} ${a.p1[0]} ${a.p1[1]}`;
}

function useDome() {
  return useMemo(() => {
    const meridians = MERIDIAN_SPREADS.map((s) => meridian(s));
    const latArcs = LATITUDE_LEVELS.map((t) => latitudeArcThrough(meridians, t));
    const allArcs = [...meridians, ...latArcs, ...TOP_RIM_ARCS, ...SIDE_ARCS];

    /** x, y, radius, index, brightness */
    const nodes: [number, number, number, number, number][] = [];
    let idx = 0;

    meridians.forEach((m, mi) => {
      LATITUDE_LEVELS.forEach((t, ti) => {
        const sparse = mi % 2 === 0 && ti % 2 === 0;
        const topHighlight = t <= 0.28 && (mi === 0 || mi === meridians.length - 1 || mi % 3 === 0);
        if (!sparse && !topHighlight) return;

        const [x, y] = pointOnArc(m, t);
        if (y > HORIZON_Y - 12) return;

        const depth = 1 - t;
        const edgeFade = 1 - Math.abs(mi / (meridians.length - 1) - 0.5) * 0.22;
        const r = (0.65 + depth * 0.85) * edgeFade;
        const bright = 0.4 + depth * 0.5;
        nodes.push([x, y, r, idx++, bright]);
      });
    });

    nodes.push([APEX_X, APEX_Y, 2, idx++, 1]);
    [[0, 0], [1200, 0], [600, 0]].forEach(([x, y]) => {
      nodes.push([x, y, 1.5, idx++, 0.95]);
    });

    return { allArcs, nodes, topRimLines: TOP_RIM_LINES };
  }, []);
}

function DomeLayer({ isDark }: { isDark: boolean }) {
  const { allArcs, nodes, topRimLines } = useDome();
  const stroke = isDark ? "rgba(186, 230, 253, 0.32)" : "rgba(37, 99, 235, 0.28)";
  const rimStroke = isDark ? "rgba(186, 230, 253, 0.38)" : "rgba(37, 99, 235, 0.34)";
  const nodeFill = isDark ? "#e0f2fe" : "#2563eb";
  const meshTransform = `translate(${APEX_X} 0) scale(${MESH_STRETCH_X} 1) translate(${-APEX_X} 0)`;

  return (
    <div className="loader-dome-wrap" aria-hidden>
      <svg
        className="loader-dome-svg"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        aria-hidden
      >
      <defs>
        <filter id="dome-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dome-line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={meshTransform}>
        <g
          stroke={rimStroke}
          strokeWidth={isDark ? 0.52 : 0.5}
          fill="none"
          strokeLinecap="round"
          filter={isDark ? "url(#dome-line-glow)" : undefined}
        >
          {topRimLines.map(([x0, y0, x1, y1], i) => (
            <line key={`rim-${i}`} x1={x0} y1={y0} x2={x1} y2={y1} />
          ))}
        </g>

        <g
          stroke={stroke}
          strokeWidth={isDark ? 0.48 : 0.45}
          fill="none"
          strokeLinecap="round"
          filter={isDark ? "url(#dome-line-glow)" : undefined}
        >
          {allArcs.map((a, i) => (
            <path key={i} d={arcPath(a)} />
          ))}
        </g>

        <g filter={isDark ? "url(#dome-glow)" : undefined}>
          {nodes.map(([x, y, r, i, bright]) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={nodeFill}
              className="dome-node"
              style={{
                animationDelay: `${(i % 9) * 0.2}s`,
                opacity: 0.45 + bright * 0.45,
              }}
            />
          ))}
        </g>
      </g>
    </svg>
    </div>
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
