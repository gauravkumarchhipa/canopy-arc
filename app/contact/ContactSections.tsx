import Heading from "../components/ui/Heading";
import StudioHero from "../components/layout/StudioHero";
import ContactHeroVisual from "../components/sections/contact/ContactHeroVisual";
import Button from "../components/ui/Button";
import ArrowIcon from "../components/ui/ArrowIcon";
import { IconClock, IconLocation, IconMail, IconPhone } from "../components/layout/footer/FooterIcons";
import type { FooterContact } from "../lib/footer/types";

export function ContactHero() {
  return (
    <StudioHero className="contact-intro" aria-labelledby="contact-title">
      <div className="contact-shell contact-intro-inner">
        <div className="contact-intro-copy">
          <p className="contact-eyebrow">Contact Us</p>
          <Heading level={1} id="contact-title">
            Let&apos;s build something <span>amazing together.</span>
          </Heading>
          <p className="contact-summary">
            Share a quick overview of your project. We&apos;ll respond with next
            steps, timeline, and the right engagement model.
          </p>
          <Button as="a" variant="unstyled" className="contact-submit contact-start" href="#contact-inquiry">
            Start an inquiry <span aria-hidden="true"><ArrowIcon direction="down" /></span>
          </Button>
        </div>
        <ContactHeroVisual />
      </div>
    </StudioHero>
  );
}

export function ContactSidebar({ contact, email }: { contact: FooterContact; email?: string }) {
  const callHref = `mailto:${email}?subject=Canopy%20Arc%20call%20request&body=Time%20zone%3A%0D%0APreferred%20times%3A%0D%0AProject%20overview%3A%0D%0A`;
  const details = [
    { label: "Address", icon: IconLocation, text: contact.address },
    { label: "Email", icon: IconMail, text: email, href: email ? `mailto:${email}` : undefined },
    { label: "Phone", icon: IconPhone, text: contact.phone, href: contact.phone ? `tel:${contact.phone.replace(/[^+0-9]/g, "")}` : undefined },
    { label: "Hours", icon: IconClock, text: contact.hours },
  ];
  return (
    <aside className="contact-sidebar" aria-label="Contact information">
      <section className="contact-panel" aria-labelledby="contact-details-title">
        <Heading id="contact-details-title">Contact Details</Heading>
        <dl className="contact-details">
          {details.map(({ label, icon: Icon, text, href }) => text && (
            <div key={label}>
              <dt><span aria-hidden="true"><Icon /></span><span className="sr-only">{label}</span></dt>
              <dd>{href ? <a href={href}>{text}</a> : text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="contact-panel" id="book" aria-labelledby="contact-next-title">
        <Heading id="contact-next-title">What happens next?</Heading>
        <ul className="contact-next-steps">
          <li>We review your message and scope the requirements.</li>
          <li>We schedule a quick call to align on goals and constraints.</li>
          <li>You get a proposal with timeline, milestones, and pricing.</li>
        </ul>
        {email && <Button as="a" variant="unstyled" className="contact-book-link" href={callHref}>Request a call by email <span aria-hidden="true"><ArrowIcon /></span></Button>}
      </section>
    </aside>
  );
}
