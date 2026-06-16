import FooterBrand from "./footer/FooterBrand";
import FooterLinkColumn from "./footer/FooterLinkColumn";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterBottom from "./footer/FooterBottom";
import { FOOTER_COLUMNS } from "./footer/footer-data";
import { siteData } from "../../content/site-data";

export default function Footer() {
  return (
    <footer className="relative mt-16 sm:mt-24 border-t border-line bg-background">
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-[#3b82f6]/35 to-transparent" />

      <div className="mx-auto max-w-350 px-6 lg:px-10 pt-12 sm:pt-20 pb-10 sm:pb-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <FooterBrand />

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-10">
            {FOOTER_COLUMNS.map((column) => (
              <FooterLinkColumn key={column.heading} column={column} />
            ))}
            <FooterNewsletter />
          </div>
        </div>

        <div className="mt-10 sm:mt-14 flex flex-col lg:flex-row items-stretch gap-6">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
            <p className="text-sm text-muted">
              <span className="text-foreground/90 font-medium">
                Need Support?
              </span>{" "}
              We&apos;re here to help 24/7. Get in touch!
            </p>
            <a
              href={siteData.nav.ctaPrimary.href}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Contact Support →
            </a>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
            <p className="text-sm text-muted">
              Follow Us
              <span className="block text-xs mt-1">
                {siteData.brand.tagline}
              </span>
            </p>
            <div className="flex items-center gap-2">
              {siteData.footer.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-background hover:bg-surface transition-colors"
                >
                  <span className="text-foreground/80 text-sm">
                    {s.label.slice(0, 1)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
