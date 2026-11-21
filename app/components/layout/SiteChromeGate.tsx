"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function SiteChromeGate({
  children,
  site,
}: {
  children: ReactNode;
  site: ReactNode;
}) {
  const pathname = usePathname();
  const authRoute = ["/signin", "/signup"].some(
    (prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`),
  );

  return authRoute ? children : site;
}
