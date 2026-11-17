import Link from "next/link";
import type { FooterNewsletter, FooterSupport } from "./footer-data";
import NewsletterFormLazy from "./NewsletterFormLazy";

type Props = {
  newsletter: FooterNewsletter | null;
  support: FooterSupport | null;
};

export default function FooterNewsletter({ newsletter, support }: Props) {
  return (
    <div className="footer-connect-row">
      {newsletter ? (
        <div className="footer-newsletter">
          <div>
            <h4>{newsletter.title}</h4>
            <p>{newsletter.text}</p>
          </div>
          <NewsletterFormLazy />
        </div>
      ) : null}
      {support ? (
        <div className="footer-support">
          <h4>{support.title}</h4>
          <p>{support.text}</p>
          <Link className="editorial-link" href={support.linkHref}>
            {support.linkLabel}
            <span aria-hidden>↗</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
