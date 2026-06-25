"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "./nav-data";
import HeaderCtaButtons from "./HeaderCtaButtons";
import { tw } from "../../../lib/tw";

type Props = {
  open: boolean;
  onClose: () => void;
  contactEmail?: string;
};

export default function MobileMenu({ open, onClose, contactEmail }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className={`md:hidden fixed inset-0 z-40 transition-[opacity,visibility] duration-500 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-background backdrop-blur-2xl transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative h-full w-full overflow-y-auto overscroll-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0" : "-translate-y-6"
        }`}
        data-lenis-prevent
      >
        <div className="relative min-h-full flex flex-col px-6 pt-24 pb-10">
          <div className={`${tw.brandOrb} ${tw.brandOrbWarm} -top-24 -right-24 h-72 w-72`} />
          <div className={`${tw.brandOrb} ${tw.brandOrbTrust} -bottom-24 -left-24 h-72 w-72`} />

          <nav className="relative flex flex-col gap-1 flex-1">
            {NAV.map((item, i) => {
              const active = pathname === item.href;
              return (
                <div
                  key={item.href}
                  className={`border-b border-line transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between py-4"
                  >
                    <span
                      className={`font-display text-3xl sm:text-4xl leading-none tracking-tight ${
                        active ? tw.gradientText : ""
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-muted">
                      0{i + 1}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>

          <div
            className={`relative mt-8 flex flex-col gap-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: open
                ? `${120 + NAV.length * 70 + 50}ms`
                : "0ms",
            }}
          >
            <HeaderCtaButtons stacked className="[&_a]:w-full" />
            {contactEmail ? (
              <a
                href={`mailto:${contactEmail}`}
                className="text-center text-sm text-muted hover:text-foreground transition-colors"
              >
                {contactEmail}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
