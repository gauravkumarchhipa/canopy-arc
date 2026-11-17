"use client";
import dynamic from "next/dynamic";
const CanopyScene = dynamic(() => import("./CanopyScene"), { ssr: false });

export default function CanopyVisual() {
  return (
    <div className="canopy-visual" role="img" aria-label="Sculptural canopy: interconnected silver arches representing connected technology and protection">
      <svg className="canopy-fallback" viewBox="0 0 600 500" fill="none" aria-hidden="true">
        <defs><linearGradient id="canopy-metal" x1="80" y1="50" x2="510" y2="400"><stop stopColor="#b8b6b0" /><stop offset=".45" stopColor="#ecebe7" /><stop offset=".7" stopColor="#8c8c89" /><stop offset="1" stopColor="#c9c8c2" /></linearGradient></defs>
        {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M ${90 + i * 8} ${335 + i * 3} Q ${270 + i * 4} ${-70 + i * 8} ${510 - i * 7} ${310 + i * 4}`} stroke="url(#canopy-metal)" strokeWidth="8" />)}
      </svg>
      <CanopyScene />
    </div>
  );
}
