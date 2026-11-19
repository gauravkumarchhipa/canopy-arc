import Link from "next/link";
import type { FooterLink } from "./footer-data";
import { IconShield } from "./FooterIcons";

type Props = {
  copyright: string;
  bottomLinks: FooterLink[];
};

export default function FooterBottom({ copyright, bottomLinks }: Props) {
  const year = new Date().getFullYear();

  return (
    <div className="footer-bottom relative mt-12 border-t border-line pt-8 sm:mt-16">
      <div className="flex flex-col items-center gap-[0.85rem] pt-4 text-center md:flex-row md:items-center md:justify-between md:gap-6 md:text-left">
        <p className="inline-flex items-center gap-[0.45rem] leading-snug text-muted">
          <IconShield className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            © {year} {copyright}
          </span>
        </p>

        {bottomLinks.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {bottomLinks.map((link, i) => (
              <span key={link.href} className="inline-flex items-center gap-3">
                {i > 0 ? (
                  <span
                    className="h-1 w-1 rounded-full bg-accent opacity-70"
                    aria-hidden
                  />
                ) : null}
                <Link
                  href={link.href}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
