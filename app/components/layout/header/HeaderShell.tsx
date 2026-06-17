"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "../SmoothScroll";
import { headerShellClass, tw } from "../../../lib/tw";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

const TOP_THRESHOLD = 12;
const HIDE_DELTA = 4;

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
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const lastY = useRef(0);
  const wasHidden = useRef(false);

  useEffect(() => {
    const update = (y: number) => {
      const diff = y - lastY.current;
      const pastTop = y > TOP_THRESHOLD;
      let nextHidden = wasHidden.current;

      setScrolled(pastTop);

      if (open) {
        nextHidden = false;
      } else if (!pastTop) {
        nextHidden = false;
      } else if (Math.abs(diff) >= HIDE_DELTA) {
        nextHidden = diff > 0;
      }

      if (wasHidden.current && !nextHidden && pastTop) {
        setScrolled(true);
      }

      setHidden(nextHidden);
      wasHidden.current = nextHidden;
      lastY.current = y;
    };

    lastY.current = lenis?.scroll ?? window.scrollY;
    update(lastY.current);

    if (lenis) {
      const onLenisScroll = () => update(lenis.scroll);
      lenis.on("scroll", onLenisScroll);
      return () => lenis.off("scroll", onLenisScroll);
    }

    const onWindowScroll = () => update(window.scrollY);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [open, lenis]);

  const toggleMenu = () => {
    setHasOpened(true);
    setOpen((v) => !v);
  };

  const closeMenu = () => setOpen(false);

  const isElevated = scrolled || open;

  return (
    <>
      <header
        className={headerShellClass({ elevated: isElevated, hidden, open })}
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

      {hasOpened && <MobileMenu open={open} onClose={closeMenu} />}
    </>
  );
}
