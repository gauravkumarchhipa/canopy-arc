"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ThemeAwareMark from "../../components/ThemeAwareMark";
import { brand } from "../../content/shared/brand";
import { tw } from "../../lib/tw";
import AuthOrbScene from "./AuthOrbScene";

export default function AuthLeftPanel() {
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const items = el.querySelectorAll("[data-auth-reveal]");
    gsap.fromTo(
      items,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-bg-soft p-8 sm:p-10 lg:p-12">
      <AuthOrbScene className="absolute inset-0 h-full w-full" />

      <div
        className="pointer-events-none absolute inset-0 hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg-soft via-transparent to-transparent"
        aria-hidden
      />

      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-3 self-start"
        data-auth-reveal
      >
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden">
          <ThemeAwareMark alt={brand.name} width={48} height={48} className="h-[155%] w-[155%] max-w-none object-contain" />
        </span>
        <span className="font-display text-xl tracking-tight text-foreground">
          Canopy{" "}
          <span className={tw.gradientText}>Arc</span>
        </span>
      </Link>

      <div ref={copyRef} className="relative z-10 mt-auto max-w-md">
        <p
          data-auth-reveal
          className="text-xs font-medium tracking-[0.28em] uppercase text-muted"
        >
          {brand.tagline}
        </p>
        <h1
          data-auth-reveal
          className="mt-4 font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08] tracking-tight text-foreground"
        >
          Build digital experiences that{" "}
          <span className={tw.gradientText}>connect &amp; protect</span>
        </h1>
        <p
          data-auth-reveal
          className="mt-4 text-sm leading-relaxed text-muted"
        >
          Secure access to your Canopy Arc workspace. Sign in to manage projects,
          collaborate with your team, and ship with confidence.
        </p>

        <ul data-auth-reveal className="mt-8 space-y-3">
          {[
            "Enterprise-grade security",
            "Real-time collaboration",
            "Scalable cloud infrastructure",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-foreground"
            >
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
