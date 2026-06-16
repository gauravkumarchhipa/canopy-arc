"use client";

import Image from "next/image";
import type { ReactNode } from "react";
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

  const center = { x: 0.5, y: 0.54 };
  const sx = roundSvgCoord(center.x * VB);
  const sy = roundSvgCoord(center.y * VB);

  return (
    <div className="hero-ecosystem relative mx-auto w-full max-w-[580px] aspect-square">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 h-[72%] w-[72%] rounded-full hero-ecosystem-ambient" />
      </div>

      {/* wireframe sphere + interconnection lines */}
      <svg
        className="hero-ecosystem-svg absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${VB} ${VB}`}
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.55)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.35)" />
          </linearGradient>
          <radialGradient id="hero-dot-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#3b82f6" />
          </radialGradient>
          <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

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

      {/* bottom glowing platform */}
      <div className="hero-platform" aria-hidden>
        <span className="hero-platform-ring hero-platform-ring--1" />
        <span className="hero-platform-ring hero-platform-ring--2" />
        <span className="hero-platform-ring hero-platform-ring--3" />
        <span className="hero-platform-ring hero-platform-ring--4" />
        <span className="hero-platform-core" />
      </div>

      {/* central canopy mark */}
      <div className="hero-mark-wrap">
        <Image
          src="/canopy-arc-mark.png"
          alt="Canopy Arc"
          width={280}
          height={336}
          priority
          className="hero-mark"
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
