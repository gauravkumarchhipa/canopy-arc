import { footer } from "../../content/layout/footer";
import type { FooterData } from "./types";

export function getFooterFallback(): FooterData {
  return {
    description: footer.description,
    copyright: footer.copyright,
    followUsLabel: "Follow Us",
    followUsVisible: true,
    contact: footer.contact,
    social: footer.social,
    columns: footer.columns.map((column) => ({
      heading: column.heading,
      links: column.links.map((link) => ({
        ...link,
        badge: link.label === "Careers" ? "We're Hiring" : null,
      })),
    })),
    bottomLinks: footer.bottomLinks,
    newsletter: {
      title: "Stay Updated",
      text: "Subscribe to our newsletter and get the latest updates, insights and exclusive offers.",
    },
    support: {
      title: "Need Support?",
      text: "We're here to help 24/7. Get in touch!",
      linkLabel: "Contact Support",
      linkHref: "/contact",
    },
  };
}
