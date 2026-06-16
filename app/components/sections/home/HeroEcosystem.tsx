"use client";

import ThemeAwareMark from "../../ThemeAwareMark";
import type { ReactNode } from "react";
import { useTheme } from "../../layout/ThemeProvider";
import { roundSvgCoord, SPHERE_MESH } from "./hero-sphere-mesh";

export type EcosystemNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type Props = {
  nodes: EcosystemNode[];
  icons: Record<string, ReactNode>;
};

const VB = 400;

function splitLines(s: string) {
  return s.split("\n").map((t) => t.trim());
}

export default function HeroEcosystem({ nodes, icons }: Props) {
  const mesh = SPHERE_MESH;
  const isLight = useTheme() === "light";

  const center = { x: 0.5, y: 0.54 };
  const sx = roundSvgCoord(center.x * VB);
  const sy = roundSvgCoord(center.y * VB);

  return (
    <div className="hero-ecosystem relative mx-auto w-full max-w-[580px] aspect-square">
      {/* wireframe sphere + interconnection lines */}
      <svg
        className="hero-ecosystem-svg absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${VB} ${VB}`}
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor={isLight ? "rgba(37, 99, 235, 0.62)" : "rgba(34,211,238,0.55)"}
            />
            <stop
              offset="100%"
              stopColor={isLight ? "rgba(6, 182, 212, 0.42)" : "rgba(59,130,246,0.35)"}
            />
          </linearGradient>
          <radialGradient id="hero-dot-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isLight ? "#2563eb" : "#67e8f9"} />
            <stop offset="100%" stopColor={isLight ? "#06b6d4" : "#3b82f6"} />
          </radialGradient>
          <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* bottom platform — dark floor, rings, beam */}
        <g className="hero-platform-graphic" aria-hidden>
          <defs>
            <radialGradient id="platform-floor-grad" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor={
                  isLight ? "rgba(37, 99, 235, 0.1)" : "rgba(5, 11, 24, 0.95)"
                }
              />
              <stop
                offset="55%"
                stopColor={
                  isLight ? "rgba(37, 99, 235, 0.05)" : "rgba(5, 11, 24, 0.72)"
                }
              />
              <stop offset="100%" stopColor="rgba(5, 11, 24, 0)" />
            </radialGradient>
            <radialGradient id="platform-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isLight ? "#dbeafe" : "#e0f7ff"} />
              <stop offset="35%" stopColor={isLight ? "#60a5fa" : "#67e8f9"} />
              <stop offset="70%" stopColor={isLight ? "#2563eb" : "#3b82f6"} />
              <stop
                offset="100%"
                stopColor={isLight ? "rgba(37, 99, 235, 0)" : "rgba(59, 130, 246, 0)"}
              />
            </radialGradient>
            <linearGradient id="platform-beam-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(103, 232, 249, 0)" />
              <stop
                offset="45%"
                stopColor={
                  isLight ? "rgba(37, 99, 235, 0.16)" : "rgba(103, 232, 249, 0.22)"
                }
              />
              <stop
                offset="78%"
                stopColor={
                  isLight ? "rgba(37, 99, 235, 0.42)" : "rgba(59, 130, 246, 0.55)"
                }
              />
              <stop
                offset="100%"
                stopColor={
                  isLight ? "rgba(6, 182, 212, 0.72)" : "rgba(103, 232, 249, 0.95)"
                }
              />
            </linearGradient>
            <linearGradient id="platform-sweep-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(103, 232, 249, 0)" />
              <stop
                offset="50%"
                stopColor={
                  isLight ? "rgba(37, 99, 235, 0.28)" : "rgba(103, 232, 249, 0.45)"
                }
              />
              <stop offset="100%" stopColor="rgba(103, 232, 249, 0)" />
            </linearGradient>
          </defs>

          <ellipse
            cx="200"
            cy="300"
            rx="102"
            ry="30"
            fill="url(#platform-floor-grad)"
            className="hero-platform-floor"
          />

          {[92, 74, 56, 40, 26].map((rx, i) => (
            <ellipse
              key={`platform-ring-${i}`}
              cx="200"
              cy="299"
              rx={rx}
              ry={roundSvgCoord(rx * 0.26)}
              fill="none"
              stroke={isLight ? "rgba(37, 99, 235, 0.38)" : "rgba(34, 211, 238, 0.35)"}
              strokeWidth={i === 0 ? 1 : 0.75}
              className="hero-platform-svg-ring"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}

          <line
            x1="200"
            y1="168"
            x2="200"
            y2="296"
            stroke="url(#platform-beam-grad)"
            strokeWidth="2"
            className="hero-platform-beam"
          />

          {[0, 1].map((i) => (
            <line
              key={`sweep-${i}`}
              x1={roundSvgCoord(138 + i * 10)}
              y1={roundSvgCoord(296 - i * 3)}
              x2={roundSvgCoord(262 - i * 10)}
              y2={roundSvgCoord(296 - i * 3)}
              stroke="url(#platform-sweep-grad)"
              strokeWidth="0.8"
              className="hero-platform-sweep"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          ))}

          <ellipse
            cx="200"
            cy="297"
            rx="22"
            ry="7"
            fill="url(#platform-core-grad)"
            className="hero-platform-svg-core"
          />
        </g>

        {/* sphere mesh lines */}
        {mesh.lines.map(([a, b], i) => (
          <line
            key={`mesh-${i}`}
            x1={mesh.dots[a].x}
            y1={mesh.dots[a].y}
            x2={mesh.dots[b].x}
            y2={mesh.dots[b].y}
            className="hero-mesh-line"
          />
        ))}

        {/* sphere mesh dots */}
        {mesh.dots.map((d, i) => (
          <circle
            key={`dot-${i}`}
            cx={d.x}
            cy={d.y}
            r={i % 5 === 0 ? 2.2 : 1.4}
            fill="url(#hero-dot-grad)"
            className={i % 5 === 0 ? "hero-mesh-dot--lg" : "hero-mesh-dot--sm"}
            filter={i % 5 === 0 ? "url(#hero-glow)" : "none"}
          />
        ))}

        {/* lines from center to each service node */}
        {nodes.map((n) => {
          const tx = roundSvgCoord(n.x * VB);
          const ty = roundSvgCoord(n.y * VB);
          return (
            <g key={`link-${n.id}`}>
              <line
                x1={sx}
                y1={sy}
                x2={tx}
                y2={ty}
                className="hero-link-base"
              />
              <line
                x1={sx}
                y1={sy}
                x2={tx}
                y2={ty}
                className="hero-link-pulse"
              />
            </g>
          );
        })}
      </svg>

      {/* central canopy mark */}
      <div className="hero-mark-wrap">
        <ThemeAwareMark
          alt="Canopy Arc"
          width={280}
          height={336}
          priority
          className="hero-mark"
          useNextImage
        />
      </div>

      {/* orbiting service nodes */}
      {nodes.map((n) => (
        <div
          key={n.id}
          data-node-float
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <div className="hero-orbit-icon">
              {icons[n.id]}
            </div>
            <p className="text-[10px] sm:text-[11px] leading-tight tracking-wide text-muted text-center whitespace-pre-line max-w-[92px]">
              {splitLines(n.label).join("\n")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
