"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNavLink({ href, label }: { href: string; label: string }) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative px-3.5 py-2 text-sm font-medium tracking-tight transition-colors ${
        active
          ? "text-foreground"
          : "text-foreground/75 hover:text-foreground"
      }`}
    >
      {label}
      {active && (
        <span className="absolute left-1/2 -bottom-0.5 -translate-x-1/2 h-px w-3 bg-foreground" />
      )}
    </Link>
  );
}
