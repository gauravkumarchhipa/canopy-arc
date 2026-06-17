import Link from "next/link";
import type { FooterColumn } from "./footer-data";

function isExternal(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http");
}

export default function FooterLinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div className="footer-link-column">
      <div className="footer-column-accent" aria-hidden />
      <h4 className="footer-column-title">{column.heading}</h4>
      <ul className="mt-4 space-y-2.5">
        {column.links.map((link) => (
          <li key={link.href}>
            {isExternal(link.href) ? (
              <a href={link.href} className="footer-link">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="footer-link inline-flex flex-wrap items-center gap-2">
                {link.label}
                {link.label === "Careers" && (
                  <span className="footer-hiring-badge">We&apos;re Hiring</span>
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
