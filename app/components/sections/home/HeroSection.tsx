"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import Button from "../../ui/Button";
import { siteData } from "../../../content/site-data";

type OrbitNode = {
  id: string;
  label: string;
  x: number; // 0..1
  y: number; // 0..1
};

function splitLines(s: string) {
  return s.split("\n").map((t) => t.trim());
}

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const nodes = useMemo<OrbitNode[]>(() => {
    // Hand-tuned positions to match the reference screenshots.
    const pos: Record<string, { x: number; y: number }> = {
      ai: { x: 0.52, y: 0.14 },
      cloud: { x: 0.84, y: 0.26 },
      data: { x: 0.92, y: 0.52 },
      ux: { x: 0.82, y: 0.76 },
      ecom: { x: 0.55, y: 0.88 },
      cyber: { x: 0.27, y: 0.78 },
      mobile: { x: 0.18, y: 0.52 },
      web: { x: 0.28, y: 0.28 }
    };

    return siteData.home.hero.orbitLabels.map((n) => ({
      id: n.id,
      label: n.label,
      x: pos[n.id]?.x ?? 0.5,
      y: pos[n.id]?.y ?? 0.5
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
          stagger: 0.08
        }
      );

      gsap.to("[data-orbit-spin]", {
        rotate: 360,
        duration: 48,
        ease: "none",
        repeat: -1
      });

      gsap.to("[data-node-float]", {
        y: (i: number) => (i % 2 === 0 ? -8 : 10),
        duration: 3.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.14
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
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-[90px] opacity-55 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.55),transparent_65%)]" />
        <div className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full blur-[100px] opacity-50 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.40),transparent_65%)]" />
        <div className="absolute inset-0 opacity-25 grid-bg mask-fade-bottom" />
      </div>

      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <div data-hero-fade className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs text-muted">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#3b82f6] shadow-[0_0_18px_rgba(59,130,246,0.6)]" />
              <span className="tracking-[0.12em] uppercase">{hero.eyebrow}</span>
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

            <div data-hero-fade className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button href={hero.primaryCta.href} className="text-sm">
                {hero.primaryCta.label} →
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost" className="text-sm">
                ▶ {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[560px] aspect-square">
              <div
                data-orbit-spin
                className="absolute inset-0 rounded-full border border-line"
              />
              <div className="absolute inset-[10%] rounded-full border border-line opacity-80" />
              <div className="absolute inset-[22%] rounded-full border border-line opacity-60" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[42%] w-[42%] rounded-full bg-surface border border-line backdrop-blur-xl grid place-items-center shadow-[0_30px_90px_-50px_rgba(2,6,23,0.6)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/canopy-arc-mark.svg"
                    alt={siteData.brand.name}
                    className="h-[54%] w-[54%] object-contain"
                  />
                </div>
              </div>

              {nodes.map((n) => (
                <div
                  key={n.id}
                  data-node-float
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
                >
                  <div className="group flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-2xl border border-line bg-background/80 backdrop-blur-xl grid place-items-center shadow-[0_20px_70px_-40px_rgba(2,6,23,0.55)]">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#22d3ee] shadow-[0_0_18px_rgba(34,211,238,0.6)]" />
                    </div>
                    <div className="text-[11px] leading-tight tracking-wide text-muted text-center whitespace-pre-line">
                      {splitLines(n.label).join("\n")}
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[78%] w-[78%] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_62%)] blur-[2px]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[88%] w-[88%] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12),transparent_66%)]" />
              </div>
            </div>
          </div>
        </div>

        <div data-hero-fade className="mt-12 sm:mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {hero.highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-2xl border border-line bg-surface px-5 py-4 shadow-[0_24px_80px_-60px_rgba(2,6,23,0.6)]"
            >
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                {h.value}
              </p>
              <p className="mt-1 text-xs text-muted leading-snug">{h.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

