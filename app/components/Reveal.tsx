"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  /** when true, animates immediate children individually with stagger */
  staggerChildren?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  stagger = 0.1,
  staggerChildren = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: Element[] = staggerChildren
      ? Array.from(el.children)
      : [el];

    if (targets.length === 0) return;

    gsap.set(targets, { opacity: 0, y });

    const play = () => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        delay,
        overwrite: true,
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    io.observe(el);

    // safety net so content never gets stuck hidden
    const safety = window.setTimeout(() => {
      play();
      io.disconnect();
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
      gsap.killTweensOf(targets);
    };
  }, [delay, y, stagger, staggerChildren]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
