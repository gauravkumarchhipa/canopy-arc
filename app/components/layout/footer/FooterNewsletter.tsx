import ArrowIcon from "../../ui/ArrowIcon";
import Link from "next/link";
import type { FooterNewsletter, FooterSupport } from "./footer-data";
import NewsletterFormLazy from "./NewsletterFormLazy";

type Props = {
  newsletter: FooterNewsletter | null;
  support: FooterSupport | null;
  recipient?: string;
};

export default function FooterNewsletter({ newsletter, support, recipient }: Props) {
  return (
    <div className="footer-connect-row">
      {newsletter && recipient ? (
        <div className="footer-newsletter">
          <div>
            <h4>{newsletter.title}</h4>
            <p>{newsletter.text}</p>
          </div>
          <NewsletterFormLazy recipient={recipient} />
        </div>
      ) : null}
      {support ? (
        <div className="footer-support">
          <h4>{support.title}</h4>
          <p>{support.text}</p>
          <Link className="editorial-link" href={support.linkHref}>
            {support.linkLabel}
            <span aria-hidden><ArrowIcon /></span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
