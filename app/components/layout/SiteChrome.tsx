import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SmoothScroll from "./SmoothScroll";
import type { FooterData } from "../../lib/footer/types";
import type { Theme } from "../../lib/theme";
import EditorialMotion from "./EditorialMotion";
import SiteChromeGate from "./SiteChromeGate";

type Props = {
  children: ReactNode;
  initialTheme: Theme;
  footerData: FooterData;
};

export default function SiteChrome({
  children,
  initialTheme,
  footerData,
}: Props) {
  const site = (
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

  return <SiteChromeGate site={site}>{children}</SiteChromeGate>;
}
