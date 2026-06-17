import Link from "next/link";
import { siteData } from "../../../content/site-data";
import { IconHeadset } from "./FooterIcons";
import NewsletterFormLazy from "./NewsletterFormLazy";

export default function FooterNewsletter() {
  return (
    <div className="footer-newsletter">
      <div className="footer-column-accent" aria-hidden />
      <h4 className="footer-column-title">Stay Updated</h4>
      <p className="mt-4 text-sm text-muted leading-relaxed">
        Subscribe to our newsletter and get the latest updates, insights and
        exclusive offers.
      </p>
      <NewsletterFormLazy />

      <div className="footer-support-card mt-8">
        <span className="footer-support-icon">
          <IconHeadset />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Need Support?</p>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            We&apos;re here to help 24/7. Get in touch!
          </p>
          <Link
            href={siteData.nav.ctaPrimary.href}
            className="footer-support-link mt-3 inline-flex items-center gap-1.5 text-sm font-medium"
          >
            Contact Support
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
