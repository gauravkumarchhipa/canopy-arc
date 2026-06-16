"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "./nav-data";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-0.5">
      {NAV.map((item) => {
        const hasChildren = !!item.children?.length;
        const active =
          pathname === item.href ||
          (hasChildren && pathname.startsWith("/services"));

        if (!hasChildren) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3.5 py-2 text-sm font-medium tracking-tight transition-colors ${
                active
                  ? "text-foreground"
                  : "text-foreground/75 hover:text-foreground"
              }`}
            >
              {item.label}
              {active && (
                <span className="absolute left-1/2 -bottom-0.5 -translate-x-1/2 h-0.5 w-6 rounded-full bg-accent shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              )}
            </Link>
          );
        }

        return (
          <div key={item.href} className="relative group">
            <Link
              href={item.href}
              className={`relative px-3.5 py-2 text-sm font-medium tracking-tight transition-colors inline-flex items-center gap-1 ${
                active ? "text-foreground" : "text-foreground/75 hover:text-foreground"
              }`}
            >
              {item.label}
              <svg
                width="11"
                height="11"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-60 translate-y-px"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {active && (
                <span className="absolute left-1/2 -bottom-0.5 -translate-x-1/2 h-0.5 w-6 rounded-full bg-accent shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              )}
            </Link>

            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
              <div className="min-w-64 rounded-2xl border border-line bg-background/90 backdrop-blur-xl shadow-[0_24px_80px_-32px_rgba(2,6,23,0.5)] p-2">
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm text-muted hover:text-foreground hover:bg-surface transition-colors"
                  >
                    <span>{child.label}</span>
                    <span className="text-muted/70">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
