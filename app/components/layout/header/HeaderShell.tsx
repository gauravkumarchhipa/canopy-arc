"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

const TOP_THRESHOLD = 80;
const HIDE_DELTA = 8;

type Props = {
  logo: ReactNode;
  desktopNav: ReactNode;
  desktopActions: ReactNode;
  mobileActions: ReactNode;
};

export default function HeaderShell({
  logo,
  desktopNav,
  desktopActions,
  mobileActions,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      setScrolled(y > 24);

      if (open) {
        setHidden(false);
      } else if (y < TOP_THRESHOLD) {
        setHidden(false);
      } else if (Math.abs(diff) > HIDE_DELTA) {
        setHidden(diff > 0);
      }

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const toggleMenu = () => {
    setHasOpened(true);
    setOpen((v) => !v);
  };

  const closeMenu = () => setOpen(false);

  const isElevated = scrolled || open;

  return (
    <>
      <header
        className={`header-shell fixed top-0 inset-x-0 z-50 will-change-transform ${
          isElevated ? "is-scrolled py-3" : "py-5"
        }${open ? " is-open" : ""}`}
        style={{
          transform: hidden
            ? "translate3d(0, -110%, 0)"
            : "translate3d(0, 0, 0)",
          opacity: hidden ? 0 : 1,
          transition: hidden
            ? "transform 360ms cubic-bezier(0.55, 0, 0.7, 0.2), opacity 240ms ease-out, padding 400ms ease, background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease"
            : undefined,
        }}
      >
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div className="justify-self-start">{logo}</div>
            <div className="justify-self-center">{desktopNav}</div>
            <div className="justify-self-end flex items-center gap-3">
              {desktopActions}
            </div>
          </div>

          <div className="md:hidden flex items-center justify-between">
            {logo}

            <div className="flex items-center gap-2">
              {mobileActions}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="header-icon-btn"
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

      {hasOpened && <MobileMenu open={open} onClose={closeMenu} />}
    </>
  );
}
