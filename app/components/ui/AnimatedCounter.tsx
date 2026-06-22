"use client";

import { useEffect, useRef, useState } from "react";

export type AnimatedCounterProps = {
  /** Display value, e.g. `150+`, `98%`, `24+`, `6` */
  value: string;
  className?: string;
  /** Animation length in ms */
  duration?: number;
  /** Start counting when the element enters the viewport */
  startOnView?: boolean;
};

export function parseCounterValue(value: string) {
  const match = value.trim().match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 };
  }

  const numeric = match[2];
  const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;

  return {
    prefix: match[1],
    end: Number(numeric),
    suffix: match[3],
    decimals,
  };
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

export default function AnimatedCounter({
  value,
  className = "",
  duration = 2000,
  startOnView = true,
}: AnimatedCounterProps) {
  const { prefix, end, suffix, decimals } = parseCounterValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(!startOnView);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!startOnView) {
      setDisplay(end);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, startOnView]);

  useEffect(() => {
    if (!started) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const current = easeOutExpo(progress) * end;
      setDisplay(current);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(end);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : String(Math.round(display));

  return (
    <span ref={ref} className={className} aria-label={value}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
