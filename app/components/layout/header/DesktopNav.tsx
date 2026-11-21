import DesktopNavLink from "./DesktopNavLink";
import { NAV } from "./nav-data";

export default function DesktopNav() {
  return (
    <nav aria-label="Main navigation" className="flex items-center gap-0.5">
      {NAV.map(({ href, label }) => (
        <DesktopNavLink key={href} href={href} label={label} />
      ))}
    </nav>
  );
}
