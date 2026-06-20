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
    <div className="grid w-full max-w-80 grid-cols-5 gap-2 lg:flex lg:max-w-none lg:flex-wrap lg:items-center lg:gap-2.5">
      {social.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          className="inline-flex aspect-square h-auto w-full max-w-none items-center justify-center rounded-[0.7rem] border border-line-strong bg-surface text-foreground transition-[color,border-color,background,transform] duration-200 hover:-translate-y-px hover:border-accent/40 hover:bg-accent/8 hover:text-accent lg:aspect-auto lg:h-[2.65rem] lg:w-[2.65rem] lg:rounded-xl"
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
    <div className="flex min-w-0 flex-col items-center text-center sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
      <Link
        href="/"
        className="group inline-flex min-w-0 items-center justify-center gap-3 self-center lg:justify-start lg:self-start"
      >
        <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden">
          <ThemeAwareMark
            alt={siteData.brand.name}
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
            {siteData.brand.tagline}
          </span>
        </span>
      </Link>

      <p className="order-2 mx-auto mt-5 max-w-sm text-center text-sm leading-relaxed text-muted lg:mx-0 lg:text-left">
        {siteData.footer.description}
      </p>

      <div className="order-3 mt-5 flex w-full flex-col items-center lg:order-5 lg:mt-8 lg:block lg:w-auto">
        <p className="m-0 mb-3 text-center text-sm font-medium text-foreground lg:text-left">
          Follow Us
        </p>
        <FooterSocialLinks social={social} />
      </div>

      <div className="order-4 mx-auto mt-7 w-full max-w-[18.5rem] space-y-3.5 lg:mx-0 lg:mt-7 lg:max-w-none">
        <div className="flex items-center justify-center gap-3 text-left lg:justify-start">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.65rem] border border-line-strong bg-surface text-accent [&_svg]:block [&_svg]:h-4 [&_svg]:w-4">
            <IconLocation />
          </span>
          <p className="min-w-0 flex-[0_1_auto] text-sm leading-relaxed whitespace-pre-line text-muted">
            {contact.address}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 text-left lg:justify-start">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.65rem] border border-line-strong bg-surface text-accent [&_svg]:block [&_svg]:h-4 [&_svg]:w-4">
            <IconMail />
          </span>
          <a
            href={`mailto:${contact.email}`}
            className="min-w-0 flex-[0_1_auto] text-sm text-muted transition-colors hover:text-foreground"
          >
            {contact.email}
          </a>
        </div>
        <div className="flex items-center justify-center gap-3 text-left lg:justify-start">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.65rem] border border-line-strong bg-surface text-accent [&_svg]:block [&_svg]:h-4 [&_svg]:w-4">
            <IconPhone />
          </span>
          <a
            href={`tel:${contact.phone.replace(/[^+0-9]/g, "")}`}
            className="min-w-0 flex-[0_1_auto] text-sm text-muted transition-colors hover:text-foreground"
          >
            {contact.phone}
          </a>
        </div>
        <div className="flex items-center justify-center gap-3 text-left lg:justify-start">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.65rem] border border-line-strong bg-surface text-accent [&_svg]:block [&_svg]:h-4 [&_svg]:w-4">
            <IconClock />
          </span>
          <span className="min-w-0 flex-[0_1_auto] text-sm text-muted">
            {contact.hours}
          </span>
        </div>
      </div>
    </div>
  );
}
