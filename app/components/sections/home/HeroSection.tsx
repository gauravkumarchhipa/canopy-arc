"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { siteData } from "../../../content/site-data";
import HeroEcosystem from "./HeroEcosystem";

type OrbitNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

const ORBIT_ICONS: Record<string, ReactNode> = {
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M7 18h10a4 4 0 0 0 0-8 5 5 0 0 0-9.5-1.5A3.5 3.5 0 0 0 7 18z" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  ux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  ecom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  cyber: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  ),
};

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const nodes = useMemo<OrbitNode[]>(() => {
    const pos: Record<string, { x: number; y: number }> = {
      ai: { x: 0.5, y: 0.06 },
      cloud: { x: 0.82, y: 0.18 },
      data: { x: 0.94, y: 0.48 },
      ux: { x: 0.82, y: 0.78 },
      ecom: { x: 0.5, y: 0.92 },
      cyber: { x: 0.18, y: 0.78 },
      mobile: { x: 0.06, y: 0.48 },
      web: { x: 0.18, y: 0.18 },
    };

    return siteData.home.hero.orbitLabels.map((n) => ({
      id: n.id,
      label: n.label,
      x: pos[n.id]?.x ?? 0.5,
      y: pos[n.id]?.y ?? 0.5,
    }));
  }, []);

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
        }
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

  const hero = siteData.home.hero;

  return (
    <section
      ref={rootRef}
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-18 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg mask-fade-bottom hero-grid-overlay" />
      </div>

      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div
              data-hero-fade
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-xs text-muted"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-3.5 w-3.5 text-accent shrink-0"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.05-2.91a2.18 2.18 0 0 0-2.91-.05z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              </svg>
              <span className="tracking-[0.08em] uppercase">{hero.eyebrow}</span>
            </div>

            <h1
              data-hero-fade
              className="mt-7 font-display text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.02] tracking-tight"
            >
              {hero.titleLines[0]}
              <br />
              {hero.titleLines[1]}{" "}
              <span className="gradient-text">{hero.titleLines[2]}</span>
            </h1>

            <p
              data-hero-fade
              className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-xl"
            >
              {hero.subtitle}
            </p>

            <div
              data-hero-fade
              className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Link
                href={hero.primaryCta.href}
                className="btn-header btn-header-primary no-underline"
              >
                {hero.primaryCta.label} →
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="btn-header btn-header-ghost no-underline gap-2.5"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/30">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <HeroEcosystem nodes={nodes} icons={ORBIT_ICONS} />
          </div>
        </div>
      </div>
    </section>
  );
}
