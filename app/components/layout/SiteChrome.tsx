"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SmoothScroll from "../layout/SmoothScroll";
import type { FooterData } from "../../lib/footer/types";
import type { Theme } from "../../lib/theme";
import EditorialMotion from "./EditorialMotion";

const AUTH_PREFIXES = ["/signin", "/signup"];

type Props = {
  children: ReactNode;
  initialTheme: Theme;
  footerData: FooterData;
};

function isAuthRoute(pathname: string | null) {
  if (!pathname) return false;
  return AUTH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function SiteChrome({
  children,
  initialTheme,
  footerData,
}: Props) {
  const pathname = usePathname();
  const authRoute = isAuthRoute(pathname);

  if (authRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="flex min-h-full flex-1 flex-col w-full">
        <SmoothScroll>
          <EditorialMotion />
          <Header
            initialTheme={initialTheme}
            contactEmail={footerData.contact.email}
          />
          <main id="main-content" tabIndex={-1} className="relative isolate flex-1">
            {children}
          </main>
          <Footer data={footerData} />
        </SmoothScroll>
      </div>
    </>
  );
}
