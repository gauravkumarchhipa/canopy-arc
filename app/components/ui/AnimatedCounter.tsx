"use client";

import { useEffect, useRef } from "react";

export type AnimatedCounterProps = {
  value: string;
  className?: string;
  duration?: number;
  startOnView?: boolean;
  viewportInset?: number;
};

export function parseCounterValue(value: string) {
  const match = value.trim().match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", end: 0, suffix: value, decimals: 0 };
  return {
    prefix: match[1],
    end: Number(match[2].replaceAll(",", "")),
    suffix: match[3],
    decimals: match[2].split(".")[1]?.length ?? 0,
  };
}

/** Server-render the real figure; enhance once in view without layout shifts. */
export default function AnimatedCounter({
  value,
  className = "",
  duration = 1800,
  startOnView = true,
  viewportInset = 0,
}: AnimatedCounterProps) {
  const root = useRef<HTMLSpanElement>(null);
  const visual = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = root.current;
    const text = visual.current;
    if (!element || !text) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const { prefix, end, suffix, decimals } = parseCounterValue(value);
    let frame = 0;
    let started = false;
    text.textContent = value;
    element.dataset.counterState = "ready";
    const finish = () => {
      cancelAnimationFrame(frame);
      text.textContent = value;
      element.dataset.counterState = "complete";
    };
    const start = () => {
      if (started) return;
      started = true;
      if (media.matches || duration <= 0 || end === 0) {
        finish();
        return;
      }
      const began = performance.now();
      element.dataset.counterState = "counting";
      const tick = (now: number) => {
        const progress = Math.max(0, Math.min(1, (now - began) / duration));
        const eased = 1 - Math.pow(1 - progress, 4);
        let number = decimals
          ? (eased * end).toFixed(decimals)
          : String(Math.round(eased * end));
        if (value.includes(","))
          number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        text.textContent = `${prefix}${number}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      text.textContent = `${prefix}0${suffix}`;
      frame = requestAnimationFrame(tick);
    };
    const threshold = 0.35;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          start();
          observer.disconnect();
        }
      },
      { threshold, rootMargin: `0px 0px ${-viewportInset}px 0px` },
    );
    if (startOnView) observer.observe(element);
    else start();
    const onMotionChange = () => {
      if (media.matches) finish();
    };
    media.addEventListener("change", onMotionChange);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", onMotionChange);
    };
  }, [value, duration, startOnView, viewportInset]);

  return (
    <span
      ref={root}
      className={`animated-counter ${className}`}
      data-counter
      aria-label={value}
    >
      <span className="counter-reserve" aria-hidden="true">
        {value}
      </span>
      <span ref={visual} className="counter-value" aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
