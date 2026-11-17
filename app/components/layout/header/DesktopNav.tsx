"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "./nav-data";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="flex items-center gap-0.5">
      {NAV.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative px-3.5 py-2 text-sm font-medium tracking-tight transition-colors ${
              active
                ? "text-foreground"
                : "text-foreground/75 hover:text-foreground"
            }`}
          >
            {item.label}
            {active && (
              <span className="absolute left-1/2 -bottom-0.5 -translate-x-1/2 h-px w-3 bg-foreground" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
