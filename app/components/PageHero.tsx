"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Eyebrow from "./ui/Eyebrow";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  blurb?: string;
};

export default function PageHero({ eyebrow, title, blurb }: Props) {
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
    <section className="relative pt-24 sm:pt-32 md:pt-44 lg:pt-52 pb-12 sm:pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none mask-fade-bottom" />
      <div
        ref={blob1}
        className="brand-orb brand-orb-warm -top-20 -left-32 h-72 w-72 sm:h-96 sm:w-96 md:h-[36rem] md:w-[36rem]"
      />
      <div
        ref={blob2}
        className="brand-orb brand-orb-trust top-20 -right-32 h-64 w-64 sm:h-80 sm:w-80 md:h-[28rem] md:w-[28rem]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Eyebrow className="mb-5 md:mb-6">{eyebrow}</Eyebrow>
        <h1 className="font-display text-5xl sm:text-6xl md:text-[8vw] lg:text-[6.5vw] leading-[0.95] tracking-tight max-w-5xl break-words hyphens-auto">
          {title}
        </h1>
        {blurb && (
          <p className="mt-8 md:mt-10 max-w-2xl text-base md:text-lg text-muted leading-relaxed">
            {blurb}
          </p>
        )}
      </div>
    </section>
  );
}
