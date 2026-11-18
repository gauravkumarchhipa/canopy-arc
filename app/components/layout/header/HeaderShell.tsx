"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { tw } from "../../../lib/tw";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

type Props = {
  logo: ReactNode;
  desktopNav: ReactNode;
  desktopActions: ReactNode;
  mobileActions: ReactNode;
  contactEmail?: string;
};

export default function HeaderShell({
  logo,
  desktopNav,
  desktopActions,
  mobileActions,
  contactEmail,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const header = useRef<HTMLElement>(null);
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const onScreenChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onScreenChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onScreenChange);
    };
  }, [open, closeMenu]);

  useEffect(() => {
    const bar = header.current;
    if (!bar) return;
    const story = pathname === "/" ? document.querySelector<HTMLElement>(".story-track") : null;
    const stage = story?.querySelector(".story-stage");
    const chapters = Array.from(story?.querySelectorAll<HTMLElement>("[data-story-chapter]") ?? []);
    let frame = 0;

    const sync = () => {
      frame = 0;
      bar.toggleAttribute("data-scrolled", window.scrollY > 12);
      const sampleY = bar.offsetHeight * 0.5;
      const coversHeader = (surface: Element | null | undefined) => {
        const bounds = surface?.getBoundingClientRect();
        return bounds && bounds.top <= sampleY && bounds.bottom > sampleY;
      };
      let graphite = false;
      if (!open && story) {
        if (story.dataset.enhanced === "true") {
          graphite = story.dataset.graphite === "true" && Boolean(coversHeader(stage));
        } else {
          graphite = chapters.some((chapter, index) => index % 2 === 1 && coversHeader(chapter));
        }
      }
      bar.toggleAttribute("data-story-graphite", graphite);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    const observer = story && new MutationObserver(sync);
    if (observer && story) {
      observer.observe(story, { attributes: true, attributeFilter: ["data-enhanced", "data-graphite"] });
    }
    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [pathname, open]);

  const toggleMenu = () => {
    setHasOpened(true);
    setOpen((v) => !v);
  };

  return (
    <>
      <header
        ref={header}
        className="premium-site-header fixed inset-x-0 top-0 z-50 py-3"
      >
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div className="justify-self-start">{logo}</div>
            <div className="justify-self-center">{desktopNav}</div>
            <div className="justify-self-end flex items-center gap-3">
              {desktopActions}
            </div>
          </div>

          <div className="lg:hidden flex items-center justify-between">
            {logo}

            <div className="flex items-center gap-2">
              {mobileActions}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className={tw.headerIconBtn}
                onClick={toggleMenu}
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ${
                      open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {hasOpened && (
        <MobileMenu open={open} onClose={closeMenu} contactEmail={contactEmail} />
      )}
    </>
  );
}
