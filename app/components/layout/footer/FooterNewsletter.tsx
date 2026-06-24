import Link from "next/link";
import { nav } from "../../../content/shared/nav";
import GlowHoverCard from "../../ui/GlowHoverCard";
import { IconHeadset } from "./FooterIcons";
import {
  footerSupportGlow,
  footerSupportIcon,
  footerSupportLink,
  footerSupportText,
  footerSupportTitle,
} from "./footer-card-styles";
import NewsletterFormLazy from "./NewsletterFormLazy";

export default function FooterNewsletter() {
  return (
    <div className="min-w-0 sm:col-span-2 lg:col-span-1">
      <div
        className="mb-[0.85rem] h-[3px] w-8 rounded-full bg-[linear-gradient(90deg,#3b82f6,#22d3ee)]"
        aria-hidden
      />
      <h4 className="text-[0.95rem] font-semibold tracking-tight text-foreground">
        Stay Updated
      </h4>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Subscribe to our newsletter and get the latest updates, insights and
        exclusive offers.
      </p>
      <NewsletterFormLazy />

      <GlowHoverCard className={footerSupportGlow}>
        <span className={footerSupportIcon}>
          <IconHeadset />
        </span>
        <div className="min-w-0">
          <p className={footerSupportTitle}>Need Support?</p>
          <p className={footerSupportText}>
            We&apos;re here to help 24/7. Get in touch!
          </p>
          <Link href={nav.ctaPrimary.href} className={footerSupportLink}>
            Contact Support
            <span aria-hidden>→</span>
          </Link>
        </div>
      </GlowHoverCard>
    </div>
  );
}
