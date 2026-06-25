export type FooterLink = {
  href: string;
  label: string;
  badge?: string | null;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export type FooterSocialLink = {
  id: string;
  label: string;
  href: string;
};

export type FooterContact = {
  address?: string;
  email?: string;
  phone?: string;
  hours?: string;
};

export type FooterNewsletter = {
  title: string;
  text: string;
};

export type FooterSupport = {
  title: string;
  text: string;
  linkLabel: string;
  linkHref: string;
};

export type FooterData = {
  description: string;
  copyright: string;
  followUsLabel: string;
  followUsVisible: boolean;
  contact: FooterContact;
  social: FooterSocialLink[];
  columns: FooterColumn[];
  bottomLinks: FooterLink[];
  newsletter: FooterNewsletter | null;
  support: FooterSupport | null;
};
