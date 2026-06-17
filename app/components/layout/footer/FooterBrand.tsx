import Link from "next/link";
import ThemeAwareMark from "../../ThemeAwareMark";
import { siteData } from "../../../content/site-data";
import {
  IconClock,
  IconLocation,
  IconMail,
  IconPhone,
  SocialIcon,
} from "./FooterIcons";

type SocialLink = (typeof siteData.footer.social)[number];

function FooterSocialLinks({ social }: { social: SocialLink[] }) {
  return (
    <div className="footer-social-row">
      {social.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          className="footer-social-btn"
        >
          <SocialIcon id={s.id} label={s.label} />
        </a>
      ))}
    </div>
  );
}

export default function FooterBrand() {
  const contact = siteData.footer.contact;
  const social = siteData.footer.social;

  return (
    <div className="footer-brand">
      <Link href="/" className="footer-brand-identity group">
        <span className="footer-brand-mark">
          <ThemeAwareMark
            alt={siteData.brand.name}
            width={64}
            height={64}
            className="footer-brand-mark-img"
          />
        </span>
        <span className="flex flex-col gap-2 sm:gap-2.5 min-w-0">
          <span className="font-display text-[1.65rem] sm:text-[1.85rem] leading-none tracking-tight">
            Canopy{" "}
            <span className="gradient-text">Arc</span>
          </span>
          <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-muted">
            {siteData.brand.tagline}
          </span>
        </span>
      </Link>

      <p className="footer-brand-desc mt-5 max-w-sm text-sm text-muted leading-relaxed">
        {siteData.footer.description}
      </p>

      <div className="footer-social-block">
        <p className="footer-social-label">Follow Us</p>
        <FooterSocialLinks social={social} />
      </div>

      <div className="footer-contact-block mt-7 space-y-3.5">
        <div className="footer-contact-row">
          <span className="footer-contact-icon">
            <IconLocation />
          </span>
          <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
            {contact.address}
          </p>
        </div>
        <div className="footer-contact-row">
          <span className="footer-contact-icon">
            <IconMail />
          </span>
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {contact.email}
          </a>
        </div>
        <div className="footer-contact-row">
          <span className="footer-contact-icon">
            <IconPhone />
          </span>
          <a
            href={`tel:${contact.phone.replace(/[^+0-9]/g, "")}`}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {contact.phone}
          </a>
        </div>
        <div className="footer-contact-row">
          <span className="footer-contact-icon">
            <IconClock />
          </span>
          <span className="text-sm text-muted">{contact.hours}</span>
        </div>
      </div>
    </div>
  );
}
