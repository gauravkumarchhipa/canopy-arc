"use client";

import { useMemo } from "react";
import Image from "next/image";
import type { ReactNode } from "react";

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
const CX = 200;
const CY = 205;

function splitLines(s: string) {
  return s.split("\n").map((t) => t.trim());
}

/** Plexus-style sphere nodes on concentric ellipses */
function useSphereMesh() {
  return useMemo(() => {
    const dots: { x: number; y: number }[] = [];
    const lines: [number, number][] = [];

    const rings = [
      { rx: 52, ry: 48, count: 10, phase: 0 },
      { rx: 88, ry: 82, count: 14, phase: 0.22 },
      { rx: 124, ry: 116, count: 18, phase: 0.11 },
      { rx: 158, ry: 148, count: 22, phase: 0.05 },
    ];

    const ringDots: number[][] = [];

    rings.forEach((ring, ri) => {
      const indices: number[] = [];
      for (let i = 0; i < ring.count; i++) {
        const a = (i / ring.count) * Math.PI * 2 + ring.phase;
        const x = CX + Math.cos(a) * ring.rx;
        const y = CY + Math.sin(a) * ring.ry;
        const idx = dots.length;
        dots.push({ x, y });
        indices.push(idx);

        if (i > 0) lines.push([indices[i - 1], idx]);
      }
      if (indices.length > 1) lines.push([indices[indices.length - 1], indices[0]]);
      ringDots.push(indices);
    });

    // cross-ring connections
    ringDots.forEach((indices, ri) => {
      if (ri >= ringDots.length - 1) return;
      const next = ringDots[ri + 1];
      indices.forEach((from, i) => {
        const to = next[Math.floor((i / indices.length) * next.length) % next.length];
        lines.push([from, to]);
      });
    });

    // extra interior mesh lines for density
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 2; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 55 && (i + j) % 7 === 0) lines.push([i, j]);
      }
    }

    return { dots, lines };
  }, []);
}

export default function HeroEcosystem({ nodes, icons }: Props) {
  const mesh = useSphereMesh();

  const center = { x: 0.5, y: 0.54 };

  return (
    <div className="hero-ecosystem relative mx-auto w-full max-w-[580px] aspect-square">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 h-[72%] w-[72%] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_68%)]" />
      </div>

      {/* wireframe sphere + interconnection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
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
            stroke="url(#hero-line-grad)"
            strokeWidth="0.6"
            opacity="0.35"
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
            opacity={i % 5 === 0 ? 0.85 : 0.45}
            filter={i % 5 === 0 ? "url(#hero-glow)" : undefined}
          />
        ))}

        {/* lines from center to each service node */}
        {nodes.map((n) => {
          const tx = n.x * VB;
          const ty = n.y * VB;
          const sx = center.x * VB;
          const sy = center.y * VB;
          return (
            <g key={`link-${n.id}`}>
              <line
                x1={sx}
                y1={sy}
                x2={tx}
                y2={ty}
                stroke="rgba(59,130,246,0.25)"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="hero-link-line"
              />
              <line
                x1={sx}
                y1={sy}
                x2={tx}
                y2={ty}
                stroke="rgba(34,211,238,0.45)"
                strokeWidth="0.8"
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
