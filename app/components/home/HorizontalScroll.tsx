"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  VoiceVisual,
  MemoryVisual,
  ReliabilityVisual,
  FamilyVisual,
  CareVisual,
} from "../CardVisuals";
import Eyebrow from "../ui/Eyebrow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Card = {
  eyebrow: string;
  title: string;
  body: string;
  visual: React.ReactNode;
};

const CARDS: Card[] = [
  {
    eyebrow: "01 — Voice",
    title: "Speak, don't tap.",
    body:
      "SAHAI listens in Hindi, English, or a mix of both. The elder talks. We turn it into structured health data — symptoms, medicines, moments — without a single form.",
    visual: <VoiceVisual />,
  },
  {
    eyebrow: "02 — Memory",
    title: "A health diary that writes itself.",
    body:
      "Every conversation is appended, never overwritten. Confirmed inputs and repeated patterns become long-term, structured memory the family can trust.",
    visual: <MemoryVisual />,
  },
  {
    eyebrow: "03 — Reliability",
    title: "Reminders that don't fail.",
    body:
      "Medicines, water, appointments — escalated through notification, call, then SMS. SOS works even offline. The chain must always work.",
    visual: <ReliabilityVisual />,
  },
  {
    eyebrow: "04 — Family",
    title: "Quiet most days, loud when it matters.",
    body:
      "Family sees a calm dashboard daily and a phone call only when something is genuinely wrong. Clarity instead of constant worry.",
    visual: <FamilyVisual />,
  },
  {
    eyebrow: "05 — Care",
    title: "Doctors and caregivers, in the loop.",
    body:
      "Every event is tagged with its source. Caregivers act with permission. Doctors get context before consultations — not after.",
    visual: <CareVisual />,
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    let st: ScrollTrigger | undefined;
    let tween: gsap.core.Tween | undefined;

    const setup = () => {
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 0.5}`,
          scrub: 1,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      st = tween.scrollTrigger;
    };

    setup();
    ScrollTrigger.refresh();

    return () => {
      // kill the tween + ScrollTrigger first so the pin spacer is removed
      // BEFORE React unmounts the surrounding tree
      st?.kill(true);
      tween?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Heading — scrolls away normally before the pin starts */}
      <div className="relative px-6 lg:px-10 pt-16 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-20">
        <Eyebrow className="mb-3">How SAHAI thinks</Eyebrow>
        <h2 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-2xl">
          Five quiet ideas <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">behind</span>{" "}
          one calm companion.
        </h2>
      </div>

      {/* Pinned horizontal-scroll viewport. The GSAP effect translates the
          track horizontally as the user scrolls vertically — same behaviour
          on mobile and desktop. */}
      <div
        ref={pinRef}
        className="relative h-screen overflow-hidden bg-background"
      >
        <div className="bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px] absolute inset-0 opacity-40 pointer-events-none" />
        <div className="noise pointer-events-none" />

        <p className="absolute top-6 right-6 md:top-8 md:right-8 z-10 text-xs uppercase tracking-[0.25em] text-muted pointer-events-none">
          ← scroll →
        </p>

        <div
          ref={trackRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 flex flex-row items-center gap-6 md:gap-8 px-6 sm:px-8 md:px-[12vw] will-change-transform"
        >
          {CARDS.map((card, i) => (
            <article
              key={i}
              className="relative w-[82vw] sm:w-[60vw] md:w-[44vw] lg:w-[36vw] max-h-[82vh] aspect-3/4 border border-line bg-surface backdrop-blur-xl backdrop-saturate-140 rounded-3xl p-6 md:p-10 flex flex-col shrink-0 overflow-hidden"
              data-cursor="hover"
              data-lenis-prevent
            >
              <div className="pointer-events-none absolute rounded-full blur-[80px] opacity-55 bg-[radial-gradient(closest-side,rgba(242,153,74,0.55),transparent_70%)] [html[data-theme=dark]_&]:bg-[radial-gradient(closest-side,rgba(255,176,104,0.5),transparent_70%)] -top-32 -right-32 h-72 w-72 pulse-soft" />

              {/* header */}
              <div className="relative flex items-center justify-between">
                <p className="text-xs tracking-[0.25em] uppercase text-muted">
                  {card.eyebrow}
                </p>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted/60">
                  {String(i + 1).padStart(2, "0")} / {CARDS.length}
                </span>
              </div>

              {/* visual fills the middle */}
              <div className="relative flex-1 flex items-center justify-center my-6">
                <div className="w-full">{card.visual}</div>
              </div>

              {/* footer copy */}
              <div className="relative">
                <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
