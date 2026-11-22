import type { Metadata } from "next";
import PolicyPage from "../components/layout/PolicyPage";
import SculptureVisual from "../components/three/SculptureVisual";

export const metadata: Metadata = {
  title: "Privacy Policy — Canopy Arc",
  description: "How Canopy Arc handles website inquiries, account information, cookies, and privacy requests.",
};

const sections = [
  {
    id: "inquiries",
    title: "Inquiries and correspondence",
    paragraphs: [
      "The Contact page prepares a draft in your email app using the name, email address, and message you enter. Canopy Arc receives the message when you send it from that app.",
      "We use the details you share to respond, discuss your project, and follow up on your request. Please keep passwords and sensitive personal information out of your message.",
    ],
  },
  {
    id: "accounts",
    title: "Account information",
    paragraphs: [
      "If you create or sign in to a website account, we use your email address and password to set up or verify your sign-in. Where Supabase authentication is enabled, Supabase handles sign-up, email confirmation, and sign-in.",
      "Session cookies keep you signed in. Signing out clears the site's active session.",
    ],
  },
  {
    id: "cookies-and-storage",
    title: "Cookies and browser storage",
    paragraphs: [
      "When you change the color theme, the site saves your preference in the canopy-theme cookie and in browser storage. The cookie lasts up to one year.",
      "The website can cache public pages and assets in your browser for faster loading and offline access. You can clear cookies, cached files, and site storage in your browser settings. Clearing them may reset your theme or sign you out.",
    ],
  },
  {
    id: "website-providers",
    title: "Website providers and external links",
    paragraphs: [
      "Hosting and authentication services may process information needed to deliver the site or verify sign-ins. Hosting services may receive technical request information such as your IP address, browser details, and the pages requested.",
      "Links to external sites and actions that open your email app are handled by those services. Their own privacy notices explain how they process information.",
    ],
  },
  {
    id: "retention-and-requests",
    title: "Retention and privacy requests",
    paragraphs: [
      "How long information is kept depends on the type of record, why it is needed, and any applicable obligations. Use the contact details below to ask about a specific record or retention period.",
      "You can ask about your personal information or request access, correction, or deletion. Available rights depend on the law that applies to your request. We may ask for enough information to verify your identity before responding.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <PolicyPage
      label="Privacy Policy"
      title="Your data,"
      titleAccent="handled responsibly."
      summary="This notice explains what happens to your information when you browse the Canopy Arc website, contact us, or use a website account."
      visual={<SculptureVisual variant="security" compact />}
      sections={sections.map(({ id, title, paragraphs }) => ({
        id,
        title,
        content: paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
      }))}
      contactId="privacy-contact"
      contactTitle="Privacy questions?"
      contactBody="Contact Canopy Arc about this notice or a privacy request."
      contactSubject="Canopy Arc privacy request"
    />
  );
}
