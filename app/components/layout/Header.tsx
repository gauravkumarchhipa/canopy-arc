import HeaderShell from "./header/HeaderShell";
import Logo from "./header/Logo";
import DesktopNav from "./header/DesktopNav";
import ThemeToggle from "./ThemeToggle";
import HeaderCtaButtons from "./header/HeaderCtaButtons";
import type { Theme } from "../../lib/theme";

type Props = {
  initialTheme: Theme;
};

export default function Header({ initialTheme }: Props) {
  return (
    <HeaderShell
      logo={<Logo />}
      desktopNav={<DesktopNav />}
      desktopActions={
        <>
          <ThemeToggle initialTheme={initialTheme} />
          <HeaderCtaButtons />
        </>
      }
      mobileActions={<ThemeToggle initialTheme={initialTheme} />}
    />
  );
}
