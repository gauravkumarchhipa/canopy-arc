import { siteData } from "../../../content/site-data";

export type FooterLink = {
  href: string;
  label: string;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export const FOOTER_COLUMNS: FooterColumn[] = siteData.footer.columns;
export const FOOTER_BOTTOM_LINKS: FooterLink[] = siteData.footer.bottomLinks;
