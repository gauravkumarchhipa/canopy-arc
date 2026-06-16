import Link from "next/link";
import { FOOTER_BOTTOM_LINKS } from "./footer-data";
import { siteData } from "../../../content/site-data";

export default function FooterBottom() {
  return (
    <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-line flex flex-col md:flex-row items-center md:items-center justify-between gap-4 text-xs text-muted text-center md:text-left">
      <p>{siteData.footer.copyright}</p>
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
        {FOOTER_BOTTOM_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
