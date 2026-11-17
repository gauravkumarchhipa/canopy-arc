import Link from "next/link";
import ThemeAwareMark from "../../ThemeAwareMark";
import { brand } from "../../../content/shared/brand";
import type { FooterData } from "../../../lib/footer/types";
import {
  IconClock,
  IconLocation,
  IconMail,
  IconPhone,
  SocialIcon,
} from "./FooterIcons";

export default function FooterBrand({ data }: { data: FooterData }) {
  const { contact, social } = data;
  return (
    <div className="footer-brand">
      <Link
        href="/"
        className="footer-brand-lockup"
        aria-label={`${brand.name} home`}
      >
        <ThemeAwareMark
          alt=""
          width={52}
          height={52}
          className="footer-brand-mark"
        />
        <span>
          <strong>{brand.name}</strong>
          <span className="editorial-label">{brand.tagline}</span>
        </span>
      </Link>
      <p className="footer-description">{data.description}</p>
      <address className="footer-contact-list">
        {contact.email ? (
          <a href={`mailto:${contact.email}`}>
            <IconMail />
            <span>{contact.email}</span>
          </a>
        ) : null}
        {contact.phone ? (
          <a href={`tel:${contact.phone.replace(/[^+0-9]/g, "")}`}>
            <IconPhone />
            <span>{contact.phone}</span>
          </a>
        ) : null}
        {contact.address ? (
          <p>
            <IconLocation />
            <span className="whitespace-pre-line">{contact.address}</span>
          </p>
        ) : null}
        {contact.hours ? (
          <p>
            <IconClock />
            <span>{contact.hours}</span>
          </p>
        ) : null}
      </address>
      {data.followUsVisible && social.length > 0 ? (
        <div className="footer-socials" aria-label={data.followUsLabel}>
          {social.map((item) => (
            <a key={item.id} href={item.href} aria-label={item.label}>
              <SocialIcon id={item.id} label={item.label} />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
