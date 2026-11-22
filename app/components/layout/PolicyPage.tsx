import type { ReactNode } from "react";
import { getFooterFallback } from "../../lib/footer/fallback";
import { getFooterContact } from "../../lib/footer/get-footer-data";
import ArrowIcon from "../ui/ArrowIcon";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import StudioHero from "./StudioHero";
import "./policy-page.css";

export type PolicySection = { id: string; title: string; content: ReactNode };

type Props = {
  label: string;
  title: string;
  titleAccent: string;
  summary: string;
  visual: ReactNode;
  fullHero?: boolean;
  sections: readonly PolicySection[];
  contactId?: string;
  contactTitle: string;
  contactBody: string;
  contactSubject: string;
};

export default async function PolicyPage({
  label, title, titleAccent, summary, visual, fullHero = false, sections,
  contactId = "policy-contact", contactTitle, contactBody, contactSubject,
}: Props) {
  const contact = await getFooterContact();
  const email = contact.email || getFooterFallback().contact.email;
  const contactHref = email ? `mailto:${email}?subject=${encodeURIComponent(contactSubject)}` : "/contact";

  return (
    <div className="policy-page">
      <StudioHero className={`policy-hero${fullHero ? " policy-hero-full" : ""}`} aria-labelledby="policy-title">
        <div className="policy-shell policy-hero-inner">
          <div className="policy-copy">
            <p className="policy-eyebrow">{label}</p>
            <Heading level={1} id="policy-title">{title} <span>{titleAccent}</span></Heading>
            <p>{summary}</p>
            <Button as="a" variant="unstyled" href={`#${sections[0]?.id ?? contactId}`} className="policy-primary">
              Read the policy <ArrowIcon direction="down" />
            </Button>
          </div>
          {visual}
        </div>
      </StudioHero>

      <div className="policy-shell policy-layout">
        <nav className="policy-contents" aria-label={`${label} contents`}>
          <Heading id="policy-contents-title">On this page</Heading>
          <ul aria-labelledby="policy-contents-title">
            {sections.map(({ id, title: sectionTitle }) => (
              <li key={id}><a href={`#${id}`}>{sectionTitle}</a></li>
            ))}
            <li><a href={`#${contactId}`}>Contact us</a></li>
          </ul>
        </nav>

        <article className="policy-document" aria-label={label}>
          {sections.map(({ id, title: sectionTitle, content }) => (
            <section key={id} id={id} className="policy-section" aria-labelledby={`${id}-title`}>
              <Heading id={`${id}-title`}>{sectionTitle}</Heading>
              {content}
            </section>
          ))}
          <section id={contactId} className="policy-contact" aria-labelledby={`${contactId}-title`}>
            <div>
              <Heading id={`${contactId}-title`}>{contactTitle}</Heading>
              <p>{contactBody}</p>
            </div>
            <Button as="a" variant="unstyled" className="policy-primary" href={contactHref}>
              Contact us <ArrowIcon />
            </Button>
          </section>
        </article>
      </div>
    </div>
  );
}
