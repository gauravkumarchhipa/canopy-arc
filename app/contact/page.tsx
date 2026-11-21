import { ContactHero, ContactSidebar } from "./ContactSections";
import type { Metadata } from "next";
import ContactForm from "../components/sections/contact/ContactForm";
import ContactWave from "../components/sections/contact/ContactWave";
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
  return (
    <div className="contact-page">
      <ContactWave />

      <div className="contact-shell">
        <ContactHero />

        <div className="contact-layout">
          {email && <ContactForm email={email} />}
          <ContactSidebar contact={contact} email={email} />
        </div>
      </div>
    </div>
  );
}
