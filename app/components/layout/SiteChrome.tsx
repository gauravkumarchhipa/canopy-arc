"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import HomeLoaderGate from "../home/HomeLoaderGate";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import PageGridBackground from "../layout/PageGridBackground";
import SmoothScroll from "../layout/SmoothScroll";
import type { FooterData } from "../../lib/footer/types";
import type { Theme } from "../../lib/theme";

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
      <HomeLoaderGate initialTheme={initialTheme} />
      <div data-app-content className="flex min-h-full flex-1 flex-col w-full">
        <SmoothScroll>
          <Header
            initialTheme={initialTheme}
            contactEmail={footerData.contact.email}
          />
          <main className="relative isolate flex-1">
            <PageGridBackground />
            {children}
          </main>
          <Footer data={footerData} />
        </SmoothScroll>
      </div>
    </>
  );
}
