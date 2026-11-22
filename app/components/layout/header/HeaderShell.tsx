"use client";

import Button from "../../ui/Button";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
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
    let frame = 0;

    const sync = () => {
      frame = 0;
      bar.toggleAttribute("data-scrolled", window.scrollY > 12);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

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
        <div className="premium-header-inner premium-shell">
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
              <Button variant="unstyled"
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
              </Button>
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
