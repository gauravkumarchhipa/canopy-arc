"use client";

import { DOME_MESH, VB_H, VB_W, arcPath } from "./loader-dome";

type DomeLayerProps = {
  isDark: boolean;
};

export default function DomeLayer({ isDark }: DomeLayerProps) {
  const { allArcs, nodes, topRimLines, meshTransform } = DOME_MESH;
  const stroke = isDark ? "rgba(186, 230, 253, 0.32)" : "rgba(37, 99, 235, 0.28)";
  const rimStroke = isDark ? "rgba(186, 230, 253, 0.38)" : "rgba(37, 99, 235, 0.34)";
  const nodeFill = isDark ? "#e0f2fe" : "#2563eb";

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
