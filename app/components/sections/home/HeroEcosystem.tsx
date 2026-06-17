"use client";

import Link from "next/link";
import ThemeAwareMark from "../../ThemeAwareMark";
import type { ReactNode } from "react";
import { useState } from "react";
import { useTheme } from "../../layout/ThemeProvider";
import { roundSvgCoord, SPHERE_MESH } from "./hero-sphere-mesh";
import "./hero-ecosystem.css";

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

const ORBIT_HREFS: Record<string, string> = {
  web: "/services#web-development",
  mobile: "/services#app-development",
  ai: "/services#ai-ml",
  cloud: "/services#cloud-devops",
  data: "/services#data-engineering",
  ux: "/services#ui-ux",
  ecom: "/services#ecommerce",
  cyber: "/services#cybersecurity",
};

const VB = 400;
/** Shift link endpoint up from node layout center to icon center (viewBox units). */
const LINE_ICON_OFFSET_Y = 14;

function splitLines(s: string) {
  return s.split("\n").map((t) => t.trim());
}

function buildZigzagPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  zigCount = 6,
  amplitude = 7
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const perpX = -dy / len;
  const perpY = dx / len;

  let d = `M ${x1} ${y1}`;
  for (let i = 1; i <= zigCount; i++) {
    const t = i / (zigCount + 1);
    const bx = x1 + dx * t;
    const by = y1 + dy * t;
    const sign = i % 2 === 0 ? -1 : 1;
    d += ` L ${roundSvgCoord(bx + perpX * amplitude * sign)} ${roundSvgCoord(by + perpY * amplitude * sign)}`;
  }
  d += ` L ${x2} ${y2}`;
  return d;
}

export default function HeroEcosystem({ nodes, icons }: Props) {
  const mesh = SPHERE_MESH;
  const isLight = useTheme() === "light";
  const [activeId, setActiveId] = useState<string | null>(null);

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
          <filter id="hero-link-glow-filter" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
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
            filter={i % 5 === 0 ? "url(#hero-link-glow-filter)" : "none"}
          />
        ))}

        {/* lines from center to each service node */}
        {nodes.map((n, i) => {
          const tx = roundSvgCoord(n.x * VB);
          const ty = roundSvgCoord(n.y * VB - LINE_ICON_OFFSET_Y);
          const isActive = activeId === n.id;
          const zigPath = buildZigzagPath(sx, sy, tx, ty);
          return (
            <g
              key={`link-${n.id}`}
              className={isActive ? "hero-link-group is-active" : "hero-link-group"}
            >
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
                className="hero-link-glow"
              />
              <line
                x1={sx}
                y1={sy}
                x2={tx}
                y2={ty}
                className="hero-link-beam"
              />
              <path d={zigPath} className="hero-link-zigzag" />
              <line
                x1={sx}
                y1={sy}
                x2={tx}
                y2={ty}
                className="hero-link-pulse"
                style={{ animationDelay: `${i * 0.45}s` }}
              />
              <circle
                r={isActive ? 3.8 : 0}
                className="hero-link-dot"
                fill="url(#hero-dot-grad)"
                filter="url(#hero-link-glow-filter)"
              >
                {isActive ? (
                  <animateMotion dur="0.85s" repeatCount="indefinite" path={zigPath} />
                ) : null}
              </circle>
            </g>
          );
        })}
      </svg>

      {/* central canopy mark */}
      <div className={`hero-mark-wrap${activeId ? " is-link-active" : ""}`}>
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
      {nodes.map((n) => {
        const isActive = activeId === n.id;
        return (
          <div
            key={n.id}
            className={`hero-orbit-anchor${isActive ? " is-active" : ""}`}
            style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
            onPointerEnter={() => setActiveId(n.id)}
            onPointerLeave={() => setActiveId(null)}
          >
            <div data-node-float className="hero-orbit-float">
              <Link
                href={ORBIT_HREFS[n.id] ?? "/services"}
                className="hero-orbit-node"
                onFocus={() => setActiveId(n.id)}
                onBlur={() => setActiveId(null)}
              >
                <span className="hero-orbit-icon-wrap">
                  <span className="hero-orbit-ring" aria-hidden />
                  <span className="hero-orbit-icon">{icons[n.id]}</span>
                </span>
                <p className="hero-orbit-label">
                  {splitLines(n.label).join("\n")}
                </p>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
