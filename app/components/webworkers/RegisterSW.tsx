"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    let cancelled = false;

    // Dev mode: aggressively clean up any SW registered from a prior `npm run
    // start` session — they cause hydration mismatches by serving stale HTML.
    if (process.env.NODE_ENV !== "production") {
      (async () => {
        try {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.unregister()));
          if (typeof caches !== "undefined") {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => caches.delete(k)));
          }
        } catch {
          /* ignore */
        }
      })();
      return;
    }

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        if (cancelled) return;

        // Check for updates after each load
        reg.update().catch(() => {});

        // If a new worker takes control, soft-reload so the user sees fresh
        // assets the next time they navigate.
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (refreshing) return;
          refreshing = true;
          // Slight delay so the user isn't yanked mid-action.
          setTimeout(() => {
            try {
              window.location.reload();
            } catch {}
          }, 300);
        });
      } catch {
        /* registration failed (e.g. http://, private mode) — fail silently */
      }
    };

    // Wait for full load so we don't compete with the initial render
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
