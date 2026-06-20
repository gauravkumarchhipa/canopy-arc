"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { hasSeenLoader, markLoaderSeen } from "./loader-session";

export type LoaderStage = "in" | "out" | "gone";

type Options = {
  autoFinish: boolean;
};

export function useLoaderLifecycle({ autoFinish }: Options) {
  // Always "in" on server + first client render so hydration matches.
  const [stage, setStage] = useState<LoaderStage>("in");
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-app-mounted", "");

    if (hasSeenLoader()) {
      setStage("gone");
    } else {
      document.documentElement.setAttribute("data-loader", "active");
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (stage === "gone") {
      document.documentElement.removeAttribute("data-loader");
      return;
    }
    if (mounted) {
      document.documentElement.setAttribute("data-loader", "active");
    }
  }, [stage, mounted]);

  useEffect(() => {
    if (stage !== "gone") return;
    markLoaderSeen();
  }, [stage]);

  useEffect(() => {
    if (!mounted || stage === "gone") return;

    const duration = 2400;
    const start = performance.now();
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (!autoFinish && pct >= 100) {
        window.setTimeout(() => setProgress(0), 1200);
        raf = requestAnimationFrame(tick);
        return;
      }

      if (pct < 100) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (!autoFinish) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, duration - elapsed);
      window.setTimeout(() => {
        setProgress(100);
        setStage("out");
        window.setTimeout(() => setStage("gone"), 700);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else {
      window.addEventListener("load", finish, { once: true });
      const safety = window.setTimeout(finish, 3400);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("load", finish);
        window.clearTimeout(safety);
      };
    }

    return () => cancelAnimationFrame(raf);
  }, [autoFinish, mounted, stage]);

  useEffect(() => {
    if (stage === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [stage]);

  return { stage, progress, mounted };
}
