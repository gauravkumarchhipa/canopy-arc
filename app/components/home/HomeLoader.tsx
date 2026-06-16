"use client";

import { useEffect, useState } from "react";

/**
 * First-load animated overlay for the home page.
 *
 * Shows a brand moment while the page paints, then
 * fades out. Only renders on the very first visit per session — fast on
 * subsequent navigations back home.
 */
export default function HomeLoader() {
  const [stage, setStage] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don't lock scroll for too long even if `load` is delayed.
    const minShow = 1100; // ms — let the brand moment breathe
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minShow - elapsed);
      window.setTimeout(() => {
        setStage("out");
        window.setTimeout(() => setStage("gone"), 700);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      // safety fallback in case `load` never fires (e.g. service worker)
      const safety = window.setTimeout(finish, 2400);
      return () => {
        window.removeEventListener("load", finish);
        window.clearTimeout(safety);
      };
    }
  }, []);

  // lock body scroll while visible
  useEffect(() => {
    if (stage === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [stage]);

  if (stage === "gone") return null;

  return (
    <div
      className={`home-loader ${stage === "out" ? "is-out" : ""}`}
      aria-hidden
    >
      <div className="home-loader-inner">
        <div className="home-loader-mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/canopy-arc-mark.svg"
            alt="Canopy Arc"
            width={120}
            height={120}
          />
        </div>
        <div className="home-loader-bars" aria-hidden>
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${i * 90}ms` }} />
          ))}
        </div>
        <div className="home-loader-word">
          {"CANOPY".split("").map((ch, i) => (
            <span key={i} style={{ animationDelay: `${200 + i * 70}ms` }}>
              {ch}
            </span>
          ))}
        </div>
        <div className="home-loader-cap">
          enterprise-grade digital solutions
        </div>
      </div>
    </div>
  );
}
