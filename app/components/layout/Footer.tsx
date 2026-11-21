import FooterBrand from "./footer/FooterBrand";
import FooterLinkColumn from "./footer/FooterLinkColumn";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterBottom from "./footer/FooterBottom";
import type { FooterData } from "../../lib/footer/types";

type Props = {
  data: FooterData;
};

export default function Footer({ data }: Props) {
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
        {data.newsletter || data.support ? (
          <FooterNewsletter
            newsletter={data.newsletter}
            support={data.support}
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
