"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "../SmoothScroll";
import { headerShellClass, tw } from "../../../lib/tw";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

const TOP_ALWAYS_SHOW = 64;
const SCROLL_DELTA = 6;

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
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const lastY = useRef(0);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
    if (open) setHidden(false);
  }, [open]);

  useEffect(() => {
    const applyScroll = (y: number) => {
      const prevY = lastY.current;
      const delta = y - prevY;

      setScrolled(y > 12);

      if (openRef.current || y <= TOP_ALWAYS_SHOW) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      if (delta > SCROLL_DELTA) {
        setHidden(true);
      } else if (delta < -SCROLL_DELTA) {
        setHidden(false);
      }

      lastY.current = y;
    };

    if (!lenis) return;

    lastY.current = lenis.scroll;
    applyScroll(lenis.scroll);

    const onLenisScroll = () => applyScroll(lenis.scroll);
    lenis.on("scroll", onLenisScroll);
    return () => lenis.off("scroll", onLenisScroll);
  }, [lenis]);

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

      {hasOpened && (
        <MobileMenu open={open} onClose={closeMenu} contactEmail={contactEmail} />
      )}
    </>
  );
}
