import FooterBrand from "./footer/FooterBrand";
import FooterLinkColumn from "./footer/FooterLinkColumn";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterBottom from "./footer/FooterBottom";
import type { FooterData } from "../../lib/footer/types";
import { getFooterFallback } from "../../lib/footer/fallback";

type Props = {
  data: FooterData;
};

export default function Footer({ data }: Props) {
  const recipient = data.contact.email || getFooterFallback().contact.email;

  return (
    <footer className="site-footer">
      <div className="premium-shell">
        <div className="footer-main-grid" data-motion="footer">
          <FooterBrand data={data} />
          <nav className="footer-navigation" aria-label="Footer navigation">
            {data.columns.map((column) => (
              <FooterLinkColumn key={column.heading} column={column} />
            ))}
          </nav>
        </div>
        {data.support || (data.newsletter && recipient) ? (
          <FooterNewsletter
            newsletter={data.newsletter}
            support={data.support}
            recipient={recipient}
          />
        ) : null}
        <FooterBottom
          copyright={data.copyright}
          bottomLinks={data.bottomLinks}
        />
      </div>
    </footer>
  );
}
