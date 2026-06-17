"use client";

import { useEffect, useRef } from "react";

/* ────────── 01 — VOICE: live audio-waveform bars ────────── */
export function VoiceVisual() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const bars = svg.querySelectorAll<SVGRectElement>("rect[data-bar]");
    let raf = 0;
    const start = performance.now();

    const tick = () => {
      const t = (performance.now() - start) / 1000;
      bars.forEach((bar, i) => {
        const phase = i * 0.4;
        const a = Math.sin(t * 3.2 + phase) * 0.5 + 0.5;
        const b = Math.sin(t * 1.7 + phase * 1.3) * 0.5 + 0.5;
        const h = 8 + (a * 0.6 + b * 0.4) * 80;
        bar.setAttribute("height", String(h));
        bar.setAttribute("y", String(60 - h / 2));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-[0.2em] uppercase text-muted">
        <span>● live</span>
        <span>hi · en</span>
      </div>
      <svg
        ref={ref}
        viewBox="0 0 240 140"
        className="w-full h-auto"
        aria-hidden
      >
        <defs>
          <linearGradient id="voiceGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="50%" stopColor="var(--accent-2)" />
            <stop offset="100%" stopColor="var(--accent-3)" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="70"
          x2="240"
          y2="70"
          stroke="currentColor"
          strokeOpacity="0.1"
        />
        {Array.from({ length: 28 }).map((_, i) => (
          <rect
            key={i}
            data-bar
            x={i * 9}
            y={60}
            width={4}
            height={20}
            rx={2}
            fill="url(#voiceGrad)"
          />
        ))}
        <circle cx="220" cy="70" r="6" fill="var(--accent-3)">
          <animate
            attributeName="r"
            values="5;9;5"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["headache", "BP medicine", "8 AM", "feeling tired"].map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-line text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ────────── 02 — MEMORY: scrolling event log ────────── */
const EVENTS = [
  { t: "07:42", k: "symptom", v: "headache, mild" },
  { t: "08:01", k: "medicine", v: "BP — taken" },
  { t: "10:15", k: "water", v: "+1 border border-line bg-surface backdrop-blur-xl backdrop-saturate-140" },
  { t: "12:30", k: "symptom", v: "dizzy briefly" },
  { t: "14:00", k: "appointment", v: "Dr. Mehta" },
  { t: "18:20", k: "medicine", v: "Sugar — taken" },
];

export function MemoryVisual() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-[0.2em] uppercase text-muted">
        <span>append-only</span>
        <span>· today</span>
      </div>
      <div className="relative w-full h-56 overflow-hidden rounded-xl border border-line bg-surface">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px] opacity-30" />
        <ul className="relative animate-scroll-up py-3">
          {[...EVENTS, ...EVENTS].map((e, i) => (
            <li
              key={i}
              className="flex items-center gap-3 px-4 py-2 text-[11px] font-mono"
            >
              <span className="text-muted">{e.t}</span>
              <span className="rounded-sm px-1.5 py-px bg-surface-strong text-foreground/80 uppercase tracking-wider text-[9px]">
                {e.k}
              </span>
              <span className="text-foreground/85 truncate">{e.v}</span>
            </li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-bg-soft to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-bg-soft to-transparent" />
      </div>
    </div>
  );
}

/* ────────── 03 — RELIABILITY: escalation chain ────────── */
export function ReliabilityVisual() {
  const steps = [
    { label: "PUSH", sub: "0:00", icon: "🔔", delay: "0s" },
    { label: "CALL", sub: "10:00", icon: "📞", delay: "0.6s" },
    { label: "SMS", sub: "15:00", icon: "✉", delay: "1.2s" },
  ];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 text-[10px] font-mono tracking-[0.2em] uppercase text-muted">
        <span>missed · BP</span>
        <span>auto-escalate</span>
      </div>

      <div className="relative">
        <div
          className="absolute top-7 left-[16%] right-[16%] h-px"
          style={{
            background:
              "linear-gradient(to right, var(--accent), var(--accent-2), var(--accent-3))",
            opacity: 0.5,
          }}
        />
        <div className="relative grid grid-cols-3 gap-2">
          {steps.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div
                className="relative h-14 w-14 rounded-2xl border border-line-strong flex items-center justify-center text-2xl bg-surface"
                style={{
                  animation: `node-pulse 2.4s ease-in-out ${s.delay} infinite`,
                }}
              >
                {s.icon}
              </div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-foreground">
                {s.label}
              </span>
              <span className="text-[9px] font-mono text-muted">+{s.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-lg border border-line p-3 bg-surface">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full status-dot" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
            family acknowledged · 14:32
          </span>
        </div>
        <span className="text-[10px] font-mono text-[color:var(--teal)]">
          ✓ ok
        </span>
      </div>
    </div>
  );
}

/* ────────── 04 — FAMILY: mini dashboard preview ────────── */
export function FamilyVisual() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-[0.2em] uppercase text-muted">
        <span>family dashboard</span>
        <span>preview</span>
      </div>

      <div className="relative w-full rounded-2xl border border-line p-4 bg-surface">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full status-dot" />
            <span className="text-[10px] tracking-wider uppercase text-muted">
              Mom · today
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted">8 / 9</span>
        </div>

        <div className="grid grid-cols-9 gap-1 mb-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-2 rounded-full"
              style={{
                background:
                  i === 5
                    ? "var(--accent-3)"
                    : "linear-gradient(to right, var(--accent), var(--accent-2))",
                opacity: i === 5 ? 1 : 0.85,
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <Stat label="Meds" value="8/9" />
          <Stat label="Water" value="5" />
          <Stat label="Mood" value="Calm" />
        </div>

        <div className="rounded-lg border border-line p-2.5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
          <span className="text-[10px] font-mono text-foreground/80 truncate">
            mentioned headache · 14:30
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-strong p-2">
      <p className="text-[9px] tracking-wider uppercase text-muted">{label}</p>
      <p className="font-display text-lg leading-tight">{value}</p>
    </div>
  );
}

/* ────────── 05 — CARE: connected network ────────── */
export function CareVisual() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-[0.2em] uppercase text-muted">
        <span>care network</span>
        <span>5 nodes</span>
      </div>
      <svg viewBox="0 0 240 180" className="w-full h-auto" aria-hidden>
        <defs>
          <linearGradient id="careLink" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent-3)" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* lines */}
        <line x1="120" y1="90" x2="40" y2="40" stroke="url(#careLink)" strokeWidth="1.4" />
        <line x1="120" y1="90" x2="40" y2="140" stroke="url(#careLink)" strokeWidth="1.4" />
        <line x1="120" y1="90" x2="200" y2="40" stroke="url(#careLink)" strokeWidth="1.4" />
        <line x1="120" y1="90" x2="200" y2="140" stroke="url(#careLink)" strokeWidth="1.4" />

        {/* travelling pulse along one link */}
        <circle r="2.5" fill="var(--accent-3)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M120,90 L40,40" />
        </circle>
        <circle r="2.5" fill="var(--accent)">
          <animateMotion dur="3.6s" repeatCount="indefinite" path="M120,90 L200,140" />
        </circle>

        {/* nodes */}
        <Node x={120} y={90} label="elder" big />
        <Node x={40} y={40} label="family" />
        <Node x={40} y={140} label="caregiver" />
        <Node x={200} y={40} label="doctor" />
        <Node x={200} y={140} label="nurse" />
      </svg>
    </div>
  );
}

function Node({
  x,
  y,
  label,
  big = false,
}: {
  x: number;
  y: number;
  label: string;
  big?: boolean;
}) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={big ? 12 : 7}
        fill="var(--bg-soft)"
        stroke="var(--accent-2)"
        strokeWidth="1.5"
      />
      {big && (
        <circle cx={x} cy={y} r={18} fill="none" stroke="var(--accent-2)">
          <animate
            attributeName="r"
            values="18;26;18"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <text
        x={x}
        y={y + (big ? 30 : 22)}
        textAnchor="middle"
        fontSize="9"
        fill="currentColor"
        opacity="0.7"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.15em"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}
