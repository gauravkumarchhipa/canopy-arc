import Link from "next/link";
import ThemeAwareMark from "../../ThemeAwareMark";
import { FOOTER_BOTTOM_LINKS } from "./footer-data";
import { siteData } from "../../../content/site-data";
import { IconShield } from "./FooterIcons";

export default function FooterBottom() {
  return (
    <div className="footer-bottom mt-12 sm:mt-16">
      <div className="footer-bottom-ornament" aria-hidden>
        <span className="footer-bottom-dots footer-bottom-dots--left" />
        <span className="footer-bottom-mark">
          <ThemeAwareMark alt="" width={48} height={48} className="footer-bottom-mark-img" />
        </span>
        <span className="footer-bottom-dots footer-bottom-dots--right" />
      </div>

      <div className="footer-bottom-bar">
        <p className="footer-copyright">
          <IconShield className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span>{siteData.footer.copyright}</span>
        </p>

        <div className="footer-legal-links">
          {FOOTER_BOTTOM_LINKS.map((link, i) => (
            <span key={link.href} className="inline-flex items-center gap-3">
              {i > 0 ? <span className="footer-legal-dot" aria-hidden /> : null}
              <Link href={link.href} className="footer-legal-link">
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
