import { footer } from "../../../content/layout/footer";

export type FooterLink = {
  href: string;
  label: string;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export const FOOTER_COLUMNS: FooterColumn[] = footer.columns;
export const FOOTER_BOTTOM_LINKS: FooterLink[] = footer.bottomLinks;
