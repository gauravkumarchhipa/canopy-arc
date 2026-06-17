import FooterBrand from "./footer/FooterBrand";
import FooterLinkColumn from "./footer/FooterLinkColumn";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterBottom from "./footer/FooterBottom";
import { FOOTER_COLUMNS } from "./footer/footer-data";

export default function Footer() {
  return (
    <footer className="site-footer relative mt-16 sm:mt-24 border-t border-line bg-background">
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-[#3b82f6]/35 to-transparent" />

      <div className="mx-auto max-w-350 px-6 lg:px-10 pt-14 sm:pt-20 pb-8 sm:pb-10">
        <div className="footer-main">
          <FooterBrand />
          <div className="footer-link-columns">
            {FOOTER_COLUMNS.map((column) => (
              <FooterLinkColumn key={column.heading} column={column} />
            ))}
          </div>
          <FooterNewsletter />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
