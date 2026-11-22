"use client";

import Button from "../ui/Button";
import { Cookie, Pause, Play, ScrollText, ShieldCheck } from "lucide-react";
import ArrowIcon from "../ui/ArrowIcon";
import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { SculptureVariant } from "./sculptures";
import { useModelHover } from "./useModelOrbit";

const Scene = dynamic(() => import("./SculptureScene"), { ssr: false });
const subscribe = (callback: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const sculptureLabels = {
  security: "Three-dimensional layered shield with a silver lock, representing security at every layer",
  team: "Eight interconnected sculptural modules around a shared core, representing the team working together",
  about: "Three layered architectural arches on a shared foundation",
  cookies: "Layered metal cookie with a bite and a privacy shield badge",
  terms: "Layered agreement pages with a bronze seal",
};

export default function SculptureVisual({
  variant,
  compact = false,
}: {
  variant: SculptureVariant;
  compact?: boolean;
}) {
  const reduced = useSyncExternalStore(subscribe, getReducedMotion, () => true);
  const [paused, setPaused] = useState(false);
  const [angle, setAngle] = useState(0);
  const [reset, setReset] = useState(0);
  const [load, setLoad] = useState(false);
  const [available, setAvailable] = useState<boolean>();
  const { hoverPose, moveHover, resetHover } = useModelHover();
  const root = useRef<HTMLElement>(null);
  const instructionsId = useId();
  const security = variant === "security";
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={root}
      className={`sculpture-visual sculpture-${variant}`}
      data-sculpture={variant}
      data-view-angle={angle}
    >
      {!compact && <div className="sculpture-overline editorial-label">
        <span>
          {security ? "PROTECTION BY DESIGN" : "A COLLECTIVE BY DESIGN"}
        </span>
        <span>{security ? "01 / SECURITY" : "01 / PEOPLE"}</span>
      </div>}
      <div
        className="sculpture-stage"
        role={compact && available ? "group" : "img"}
        tabIndex={compact && available ? 0 : undefined}
        aria-describedby={compact && available ? instructionsId : undefined}
        onPointerMove={compact && available ? moveHover : undefined}
        onPointerLeave={compact && available ? resetHover : undefined}
        onKeyDown={compact && available ? (event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            const direction = event.key === "ArrowLeft" ? -1 : 1;
            setAngle((value) => value + direction * Math.PI / 6);
          } else if (event.key === "Home") {
            setAngle(0);
            setReset((value) => value + 1);
          } else {
            return;
          }
          event.preventDefault();
        } : undefined}
        aria-label={sculptureLabels[variant]}
      >
        <svg
          className="sculpture-fallback"
          data-loading={compact && available === undefined ? "" : undefined}
          viewBox="0 0 480 400"
          aria-hidden="true"
          fill="none"
        >
          {security ? (
            <g stroke="currentColor">
              <path
                d="M240 55c35 24 73 29 108 35l-9 116c-4 62-55 102-99 130-44-28-95-68-99-130L132 90c35-6 73-11 108-35Z"
                strokeWidth="3"
              />
              <path d="M240 77c29 20 59 24 89 29l-8 97c-3 50-45 85-81 109-36-24-78-59-81-109l-8-97c30-5 60-9 89-29Z" />
              <rect
                x="210"
                y="185"
                width="60"
                height="54"
                rx="8"
                strokeWidth="3"
              />
              <path d="M220 185v-15a20 20 0 0 1 40 0v15" strokeWidth="3" />
              <circle cx="240" cy="207" r="4" fill="currentColor" />
            </g>
          ) : variant === "cookies" ? (
            <>
              <Cookie x="133" y="90" size={192} strokeWidth={1} />
              <ShieldCheck x="245" y="202" size={86} strokeWidth={1.4} fill="var(--story-studio-base)" />
            </>
          ) : variant === "terms" ? (
            <ScrollText x="144" y="104" size={192} strokeWidth={1} />
          ) : variant === "about" ? (
            <g stroke="currentColor" strokeWidth="2">
              <path d="M103 282V175a86 86 0 0 1 172 0v107M132 282V175a57 57 0 0 1 114 0v107" />
              <path opacity=".65" d="M154 282V153a94 94 0 0 1 188 0v129M182 282V153a66 66 0 0 1 132 0v129" />
              <path opacity=".45" d="M223 282V168a79 79 0 0 1 158 0v114M250 282V168a52 52 0 0 1 104 0v114" />
              <path d="M83 282h314l22 23H61z" />
            </g>
          ) : (
            <g stroke="currentColor">
              {Array.from({ length: 8 }, (_, index) => {
                const a = (index / 8) * Math.PI * 2;
                const x = 240 + Math.cos(a) * 130;
                const y = 200 + Math.sin(a) * 115;
                return (
                  <g key={index}>
                    <path d={`M${x} ${y} Q240 155 240 200`} />
                    <rect
                      x={x - 15}
                      y={y - 15}
                      width="30"
                      height="30"
                      rx="7"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
              <ellipse cx="240" cy="200" rx="130" ry="115" />
              <rect
                x="216"
                y="176"
                width="48"
                height="48"
                rx="10"
                strokeWidth="3"
              />
            </g>
          )}
        </svg>
        {load ? (
          <Scene
            variant={variant}
            paused={compact || paused || reduced}
            angle={angle}
            reset={reset}
            hoverPose={hoverPose}
            onAvailabilityChange={setAvailable}
          />
        ) : null}
      </div>
      {compact ? (
        <figcaption className="sr-only" id={instructionsId}>Drag the model or use the left and right arrow keys to rotate it. Press Home to reset the view.</figcaption>
      ) : <>
      <figcaption className="sculpture-caption">
        <div>
          <span>
            {security
              ? "Security, in every layer."
              : "Individual minds. Shared direction."}
          </span>
          <p>
            {security
              ? "Assess. Defend. Evolve."
              : "Different disciplines. One team."}
          </p>
        </div>
        <span className="sculpture-drag-hint">
          {available ? "Drag to explore" : "Sculptural study"}
        </span>
      </figcaption>
      <div
        className="sculpture-controls"
        role="group"
        aria-label={`${security ? "Security" : "Team"} model controls`}
      >
        <div>
          <Button variant="unstyled"
            type="button"
            aria-label="Rotate model left"
            disabled={!available}
            onClick={() => setAngle((value) => value - Math.PI / 6)}
          >
            <ArrowIcon direction="left" />
          </Button>
          <Button variant="unstyled"
            type="button"
            aria-label="Rotate model right"
            disabled={!available}
            onClick={() => setAngle((value) => value + Math.PI / 6)}
          >
            <ArrowIcon direction="right" />
          </Button>
          <Button variant="unstyled"
            type="button"
            className="sculpture-reset"
            disabled={!available}
            onClick={() => {
              setAngle(0);
              setReset((value) => value + 1);
            }}
          >
            Reset view
          </Button>
        </div>
        <Button variant="unstyled"
          type="button"
          className="sculpture-motion"
          disabled={reduced || !available}
          aria-pressed={paused || reduced}
          onClick={() => setPaused((value) => !value)}
          aria-label={
            !available
              ? "Static model view"
              : reduced
                ? "Motion reduced by device preference"
                : paused
                  ? "Play model motion"
                  : "Pause model motion"
          }
        >
          {!available
            ? "Static view"
            : reduced
              ? "Motion off"
              : paused
                ? "Play motion"
                : "Pause motion"}
          <span aria-hidden>
            {paused || reduced ? <Play size="1em" focusable="false" /> : <Pause size="1em" focusable="false" />}
          </span>
        </Button>
      </div>
      </>}
    </figure>
  );
}
