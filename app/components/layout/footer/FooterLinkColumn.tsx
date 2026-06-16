import Link from "next/link";
import type { FooterColumn } from "./footer-data";

function isExternal(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http");
}

export default function FooterLinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h4 className="text-xs tracking-[0.2em] uppercase text-muted mb-5">
        {column.heading}
      </h4>
      <ul className="space-y-3 text-sm">
        {column.links.map((link) => (
          <li key={link.href}>
            {isExternal(link.href) ? (
              <a
                href={link.href}
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
