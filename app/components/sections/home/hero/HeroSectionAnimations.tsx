"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type HeroSectionAnimationsProps = {
  children: ReactNode;
};

export default function HeroSectionAnimations({ children }: HeroSectionAnimationsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
        },
      );

      gsap.to("[data-node-float]", {
        y: (i: number) => (i % 2 === 0 ? -6 : 8),
        duration: 3.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.14,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
