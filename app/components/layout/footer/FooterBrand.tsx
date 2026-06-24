import Link from "next/link";
import ThemeAwareMark from "../../ThemeAwareMark";
import GlowHoverCard from "../../ui/GlowHoverCard";
import { brand } from "../../../content/shared/brand";
import { footer } from "../../../content/layout/footer";
import {
  footerSocialGlow,
  footerSocialIcon,
} from "./footer-card-styles";
import {
  IconClock,
  IconLocation,
  IconMail,
  IconPhone,
  SocialIcon,
} from "./FooterIcons";

type SocialLink = (typeof footer.social)[number];

const contactIconClass =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.65rem] border border-line-strong bg-surface text-accent [&_svg]:block [&_svg]:h-4 [&_svg]:w-4";

const contactTextClass = "min-w-0 text-sm text-muted";

function FooterSocialLinks({ social }: { social: SocialLink[] }) {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-2 overflow-visible p-0.5 lg:justify-start lg:gap-2.5">
      {social.map((s) => (
        <GlowHoverCard
          key={s.label}
          as="a"
          href={s.href}
          aria-label={s.label}
          className={footerSocialGlow}
        >
          <span className={footerSocialIcon}>
            <SocialIcon id={s.id} label={s.label} />
          </span>
        </GlowHoverCard>
      ))}
    </div>
  );
}

export default function FooterBrand() {
  const contact = footer.contact;
  const social = footer.social;

  return (
    <div className="flex min-w-0 flex-col items-center text-center sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
      <Link
        href="/"
        className="group inline-flex min-w-0 items-center justify-center gap-3 self-center lg:justify-start lg:self-start"
      >
        <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden">
          <ThemeAwareMark
            alt={brand.name}
            width={64}
            height={64}
            className="h-[160%] w-[160%] max-w-none shrink-0 object-contain transition-transform duration-200 ease-out group-hover:scale-[1.04]"
          />
        </span>
        <span className="flex min-w-0 flex-col gap-2 sm:gap-2.5">
          <span className="font-display text-[1.65rem] sm:text-[1.85rem] leading-none tracking-tight">
            Canopy{" "}
            <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">
              Arc
            </span>
          </span>
          <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-muted">
            {brand.tagline}
          </span>
        </span>
      </Link>

      <p className="order-2 mx-auto mt-5 max-w-sm text-center text-sm leading-relaxed text-muted lg:mx-0 lg:text-left">
        {footer.description}
      </p>

      <div className="order-3 mt-5 flex w-full flex-col items-center lg:order-5 lg:mt-8 lg:block lg:w-auto">
        <p className="m-0 mb-3 text-center text-sm font-medium text-foreground lg:text-left">
          Follow Us
        </p>
        <FooterSocialLinks social={social} />
      </div>

      <div className="order-4 mt-7 w-full lg:max-w-none">
        <div className="mx-auto flex w-full max-w-[20rem] flex-col gap-3.5 lg:mx-0">
          <div className="flex items-start gap-3 text-left">
            <span className={contactIconClass}>
              <IconLocation />
            </span>
            <p className={`${contactTextClass} flex-1 leading-relaxed whitespace-pre-line`}>
              {contact.address}
            </p>
          </div>

          <div className="flex items-start gap-3 text-left">
            <span className={contactIconClass}>
              <IconMail />
            </span>
            <a
              href={`mailto:${contact.email}`}
              className={`${contactTextClass} flex-1 transition-colors hover:text-foreground`}
            >
              {contact.email}
            </a>
          </div>

          <div className="flex items-start gap-3 text-left">
            <span className={contactIconClass}>
              <IconPhone />
            </span>
            <a
              href={`tel:${contact.phone.replace(/[^+0-9]/g, "")}`}
              className={`${contactTextClass} flex-1 transition-colors hover:text-foreground`}
            >
              {contact.phone}
            </a>
          </div>

          <div className="flex items-start gap-3 text-left">
            <span className={contactIconClass}>
              <IconClock />
            </span>
            <span className={`${contactTextClass} flex-1`}>{contact.hours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
