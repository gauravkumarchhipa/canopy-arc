"use client";

import { useEffect, useMemo, useRef } from "react";

type Props = {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
  splitBy?: "line" | "word";
};

/**
 * Renders text split into line/word spans that slide in from below.
 *
 * The reveal is driven by adding a `.is-revealed` class — pure CSS
 * transition takes over from there. No runtime DOM mutation, no GSAP
 * inline-style juggling, so React Strict Mode re-mounts and hydration
 * can't strand the text in a hidden state.
 */
export default function RevealText({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
  trigger = true,
  splitBy = "line",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const text = typeof children === "string" ? children : "";
  const segments = useMemo(
    () => (splitBy === "word" ? text.split(/(\s+)/) : text.split("\n")),
    [text, splitBy],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add("is-revealed");

    if (!trigger) {
      reveal();
      return;
    }

    // If already in view (above-the-fold) reveal immediately.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    io.observe(el);

    // Safety net — if the observer never fires, reveal anyway.
    const safety = window.setTimeout(reveal, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [trigger]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {segments.map((seg, i) => {
        if (splitBy === "word" && !seg.trim()) {
          return seg;
        }
        const lineDelay = delay + i * stagger;
        return (
          <span key={i} className="reveal-line">
            <span style={{ transitionDelay: `${lineDelay}s` }}>
              {seg.length ? seg : " "}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
