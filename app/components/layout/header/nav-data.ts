import { siteData } from "../../../content/site-data";

export type NavItem = {
  label: string;
  href: string;
};

export const NAV: NavItem[] = siteData.nav.items;
