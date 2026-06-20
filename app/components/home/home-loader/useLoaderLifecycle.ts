"use client";

import { useEffect, useLayoutEffect, useState } from "react";

export type LoaderStage = "in" | "out" | "gone";

const LOADER_DURATION_MS = 2800;
const LOADER_FADE_MS = 700;

type Options = {
  autoFinish: boolean;
};

export function useLoaderLifecycle({ autoFinish }: Options) {
  const [stage, setStage] = useState<LoaderStage>("in");
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-app-mounted", "");
    document.documentElement.setAttribute("data-loader", "active");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (stage === "in") {
      document.documentElement.setAttribute("data-loader", "active");
      return;
    }
    document.documentElement.removeAttribute("data-loader");
  }, [stage]);

  useEffect(() => {
    if (!mounted || stage !== "in") return;

    const start = performance.now();
    let raf = 0;
    let finishTimeout = 0;
    let fadeTimeout = 0;
    let safetyTimeout = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / LOADER_DURATION_MS) * 100));
      setProgress(pct);

      if (!autoFinish && pct >= 100) {
        window.setTimeout(() => setProgress(0), 1200);
        raf = requestAnimationFrame(tick);
        return;
      }

      if (pct < 100) raf = requestAnimationFrame(tick);
    };

    const complete = () => {
      if (!autoFinish) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, LOADER_DURATION_MS - elapsed);

      finishTimeout = window.setTimeout(() => {
        setProgress(100);
        setStage("out");
        fadeTimeout = window.setTimeout(() => setStage("gone"), LOADER_FADE_MS);
      }, wait);
    };

    raf = requestAnimationFrame(tick);

    if (document.readyState === "complete") complete();
    else {
      window.addEventListener("load", complete, { once: true });
      safetyTimeout = window.setTimeout(complete, LOADER_DURATION_MS + 1200);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", complete);
      window.clearTimeout(finishTimeout);
      window.clearTimeout(fadeTimeout);
      window.clearTimeout(safetyTimeout);
    };
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
