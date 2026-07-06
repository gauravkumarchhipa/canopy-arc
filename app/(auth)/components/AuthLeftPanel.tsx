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
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#070b14] p-8 sm:p-10 lg:p-12 [html[data-theme=light]_&]:bg-[#eef4ff]">
      <AuthOrbScene className="absolute inset-0 h-full w-full" />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(59,130,246,0.22),transparent_55%)] [html[data-theme=light]_&]:bg-[radial-gradient(ellipse_at_30%_20%,rgba(59,130,246,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#070b14] via-transparent to-transparent [html[data-theme=light]_&]:from-[#eef4ff]"
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
        <span className="font-display text-xl tracking-tight text-white [html[data-theme=light]_&]:text-[#0b1220]">
          Canopy{" "}
          <span className={tw.gradientText}>Arc</span>
        </span>
      </Link>

      <div ref={copyRef} className="relative z-10 mt-auto max-w-md">
        <p
          data-auth-reveal
          className="text-xs font-medium tracking-[0.28em] uppercase text-[#94a3b8] [html[data-theme=light]_&]:text-[#64748b]"
        >
          {brand.tagline}
        </p>
        <h1
          data-auth-reveal
          className="mt-4 font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08] tracking-tight text-white [html[data-theme=light]_&]:text-[#0b1220]"
        >
          Build digital experiences that{" "}
          <span className={tw.gradientText}>connect &amp; protect</span>
        </h1>
        <p
          data-auth-reveal
          className="mt-4 text-sm leading-relaxed text-[#cbd5e1] [html[data-theme=light]_&]:text-[#475569]"
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
              className="flex items-center gap-2.5 text-sm text-[#e2e8f0] [html[data-theme=light]_&]:text-[#334155]"
            >
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3b82f6,#22d3ee)] text-[10px] text-white">
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
