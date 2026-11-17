"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Progressive, visibility-driven motion. Content is always readable without it. */
export default function EditorialMotion() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const selector =
      "[data-motion], .premium-page-intro h1, .premium-service-card, .premium-work-card, .premium-glow-card, .section-heading, .commitment-editorial, .work-heading, .editorial-project, .home-contact";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          entry.target.setAttribute("data-in-view", "true");
          if (media.matches) return;
          const title = entry.target.tagName === "H1";
          const frames = title
            ? [
                {
                  clipPath: "inset(0 0 100% 0)",
                  transform: "translateY(16px)",
                },
                { clipPath: "inset(0)", transform: "translateY(0)" },
              ]
            : [
                { opacity: 0.35, transform: "translateY(20px)" },
                { opacity: 1, transform: "translateY(0)" },
              ];
          const animation = entry.target.animate(frames, {
            duration: title ? 1050 : 800,
            easing: "cubic-bezier(.22,1,.36,1)",
          });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      },
      { threshold: 0.12 },
    );
    const register = (element: Element) => {
      if (
        seen.has(element) ||
        element.closest("[data-reveal-owned]") ||
        element.parentElement?.closest(selector)
      )
        return;
      seen.add(element);
      observer.observe(element);
    };
    const scan = (element: Element) => {
      if (element.matches(selector)) register(element);
      element.querySelectorAll(selector).forEach(register);
    };
    const main = document.getElementById("main-content");
    if (main) scan(main);
    const mutations = new MutationObserver((records) =>
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        });
      }),
    );
    if (main) mutations.observe(main, { childList: true, subtree: true });
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current)
          progress.current.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
      });
    };
    const onReducedMotion = () => {
      if (media.matches) animations.forEach((animation) => animation.cancel());
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    media.addEventListener("change", onReducedMotion);
    updateProgress();
    return () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach((animation) => animation.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      media.removeEventListener("change", onReducedMotion);
    };
  }, [pathname]);

  return (
    <div ref={progress} className="site-scroll-progress" aria-hidden="true" />
  );
}
