import HeaderShell from "./header/HeaderShell";
import Logo from "./header/Logo";
import DesktopNav from "./header/DesktopNav";
import ThemeToggle from "./ThemeToggle";
import Button from "../ui/Button";
import { siteData } from "../../content/site-data";

export default function Header() {
  return (
    <HeaderShell
      logo={<Logo />}
      desktopNav={<DesktopNav />}
      desktopActions={
        <>
          <ThemeToggle />
          <Button href={siteData.nav.ctaSecondary.href} variant="ghost" className="text-sm">
            {siteData.nav.ctaSecondary.label}
          </Button>
          <Button href={siteData.nav.ctaPrimary.href} className="text-sm">
            {siteData.nav.ctaPrimary.label} →
          </Button>
        </>
      }
      mobileActions={<ThemeToggle />}
    />
  );
}
