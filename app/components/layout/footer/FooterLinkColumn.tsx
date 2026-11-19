import Link from "next/link";
import type { FooterColumn } from "./footer-data";

function isExternal(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http");
}

export default function FooterLinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div className="min-w-0">
      <div
        className="hidden"
        aria-hidden
      />
      <h4 className="text-[0.95rem] font-semibold tracking-tight text-foreground">
        {column.heading}
      </h4>
      <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
        {column.links.map((link) => (
          <li key={`${column.heading}-${link.href}-${link.label}`}>
            {isExternal(link.href) ? (
              <a
                href={link.href}
                className="inline-flex flex-wrap items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
                {link.badge ? (
                  <span className="footer-link-badge inline-flex items-center rounded-sm bg-surface-strong px-2 py-[0.15rem] font-semibold tracking-wide whitespace-nowrap text-foreground">
                    {link.badge}
                  </span>
                ) : null}
              </a>
            ) : (
              <Link
                href={link.href}
                className="inline-flex flex-wrap items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
                {link.badge ? (
                  <span className="footer-link-badge inline-flex items-center rounded-sm bg-surface-strong px-2 py-[0.15rem] font-semibold tracking-wide whitespace-nowrap text-foreground">
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
