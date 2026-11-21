"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { tw } from "../lib/tw";

export default function PageHeroOrbs({ warmGlow }: { warmGlow: boolean }) {
  const blob1 = useRef<HTMLDivElement | null>(null);
  const blob2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      gsap.to(blob1.current, { x, y, duration: 1.5, ease: "expo.out" });
      gsap.to(blob2.current, { x: -x * 0.6, y: -y * 0.6, duration: 1.5, ease: "expo.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {warmGlow ? (
        <div
          ref={blob1}
          className={`${tw.brandOrb} ${tw.brandOrbWarm} -top-20 -left-32 h-72 w-72 sm:h-96 sm:w-96 md:h-[36rem] md:w-[36rem]`}
        />
      ) : null}
      <div
        ref={blob2}
        className={`${tw.brandOrb} ${tw.brandOrbTrust} top-20 -right-32 h-64 w-64 sm:h-80 sm:w-80 md:h-[28rem] md:w-[28rem]`}
      />
    </>
  );
}
