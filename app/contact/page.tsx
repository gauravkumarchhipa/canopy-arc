import type { Metadata } from "next";
import ContactForm from "../components/sections/contact/ContactForm";
import ContactWave from "../components/sections/contact/ContactWave";
import { IconClock, IconLocation, IconMail, IconPhone } from "../components/layout/footer/FooterIcons";
import { getFooterContact } from "../lib/footer/get-footer-data";
import { getFooterFallback } from "../lib/footer/fallback";
import "./contact-overview.css";

export const metadata: Metadata = {
  title: "Contact Us — Canopy Arc",
  description:
    "Talk to the Canopy Arc team. Tell us what you want to build — we read every message.",
};

export default async function ContactPage() {
  const contact = await getFooterContact();
  const email = contact.email || getFooterFallback().contact.email;
  const callHref = `mailto:${email}?subject=Canopy%20Arc%20call%20request&body=Time%20zone%3A%0D%0APreferred%20times%3A%0D%0AProject%20overview%3A%0D%0A`;
  const details = [
    { label: "Address", icon: IconLocation, text: contact.address },
    { label: "Email", icon: IconMail, text: email, href: email ? `mailto:${email}` : undefined },
    { label: "Phone", icon: IconPhone, text: contact.phone, href: contact.phone ? `tel:${contact.phone.replace(/[^+0-9]/g, "")}` : undefined },
    { label: "Hours", icon: IconClock, text: contact.hours },
  ];

  return (
    <div className="contact-page">
      <ContactWave />

      <div className="contact-shell">
        <section className="contact-intro" aria-labelledby="contact-title">
          <p className="contact-eyebrow">Contact Us</p>
          <h1 id="contact-title">
            Let&apos;s build something{" "}
            <span>amazing</span> together.
          </h1>
          <p className="contact-summary">
            Share a quick overview of your project. We&apos;ll respond with next
            steps, timeline, and the right engagement model.
          </p>
        </section>

        <div className="contact-layout">
          {email && <ContactForm email={email} />}
          <aside className="contact-sidebar" aria-label="Contact information">
            <section className="contact-panel" aria-labelledby="contact-details-title">
              <h2 id="contact-details-title">Contact Details</h2>
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
              <h2 id="contact-next-title">What happens next?</h2>
              <ul className="contact-next-steps">
                <li>We review your message and scope the requirements.</li>
                <li>We schedule a quick call to align on goals and constraints.</li>
                <li>You get a proposal with timeline, milestones, and pricing.</li>
              </ul>
              {email && <a className="contact-book-link" href={callHref}>Request a call by email <span aria-hidden="true">↗</span></a>}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
