import Link from "next/link";
import GlowHoverCard from "../../ui/GlowHoverCard";
import type { FooterNewsletter, FooterSupport } from "./footer-data";
import { IconHeadset } from "./FooterIcons";
import {
  footerSupportGlow,
  footerSupportIcon,
  footerSupportLink,
  footerSupportText,
  footerSupportTitle,
} from "./footer-card-styles";
import NewsletterFormLazy from "./NewsletterFormLazy";

type Props = {
  newsletter: FooterNewsletter | null;
  support: FooterSupport | null;
};

export default function FooterNewsletter({ newsletter, support }: Props) {
  return (
    <div className="min-w-0 sm:col-span-2 lg:col-span-1">
      {newsletter ? (
        <>
          <div
            className="mb-[0.85rem] h-[3px] w-8 rounded-full bg-[linear-gradient(90deg,#3b82f6,#22d3ee)]"
            aria-hidden
          />
          <h4 className="text-[0.95rem] font-semibold tracking-tight text-foreground">
            {newsletter.title}
          </h4>
          <p className="mt-4 text-sm leading-relaxed text-muted">{newsletter.text}</p>
          <NewsletterFormLazy />
        </>
      ) : null}

      {support ? (
        <GlowHoverCard className={`${footerSupportGlow} ${newsletter ? "mt-6" : ""}`}>
          <span className={footerSupportIcon}>
            <IconHeadset />
          </span>
          <div className="min-w-0">
            <p className={footerSupportTitle}>{support.title}</p>
            <p className={footerSupportText}>{support.text}</p>
            <Link href={support.linkHref} className={footerSupportLink}>
              {support.linkLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </GlowHoverCard>
      ) : null}
    </div>
  );
}
