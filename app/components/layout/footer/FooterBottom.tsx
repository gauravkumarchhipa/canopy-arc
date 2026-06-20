import Link from "next/link";
import ThemeAwareMark from "../../ThemeAwareMark";
import { FOOTER_BOTTOM_LINKS } from "./footer-data";
import { footer } from "../../../content/layout/footer";
import { IconShield } from "./FooterIcons";

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="relative mt-12 border-t border-line pt-8 sm:mt-16">
      <div
        className="pointer-events-none absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
        aria-hidden
      >
        <span className="h-0.5 w-[4.5rem] bg-[radial-gradient(circle,rgba(59,130,246,0.75)_1px,transparent_1.5px)] bg-size-[7px_2px] bg-repeat-x opacity-85" />
        <span className="inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-full border border-line-strong bg-background shadow-[0_0_0_5px_var(--bg)]">
          <ThemeAwareMark
            alt=""
            width={48}
            height={48}
            className="h-[155%] w-[155%] max-w-none shrink-0 object-contain mix-blend-[var(--hero-mark-blend)] [filter:var(--hero-mark-filter)]"
          />
        </span>
        <span className="h-0.5 w-[4.5rem] scale-x-[-1] bg-[radial-gradient(circle,rgba(59,130,246,0.75)_1px,transparent_1.5px)] bg-size-[7px_2px] bg-repeat-x opacity-85" />
      </div>

      <div className="flex flex-col items-center gap-[0.85rem] pt-4 text-center md:flex-row md:items-center md:justify-between md:gap-6 md:text-left">
        <p className="inline-flex items-center gap-[0.45rem] text-xs leading-snug text-muted">
          <IconShield className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            © {year} {footer.copyright}
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {FOOTER_BOTTOM_LINKS.map((link, i) => (
            <span key={link.href} className="inline-flex items-center gap-3">
              {i > 0 ? (
                <span
                  className="h-1 w-1 rounded-full bg-accent opacity-70"
                  aria-hidden
                />
              ) : null}
              <Link
                href={link.href}
                className="text-xs text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
