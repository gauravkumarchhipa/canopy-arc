import { nav } from "../../../content/shared/nav";

export type NavItem = {
  label: string;
  href: string;
};

export const NAV: NavItem[] = nav.items;
