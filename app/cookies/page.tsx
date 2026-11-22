import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage, { type PolicySection } from "../components/layout/PolicyPage";
import SculptureVisual from "../components/three/SculptureVisual";
import { THEME_COOKIE } from "../lib/theme";

export const metadata: Metadata = {
  title: "Cookie Policy — Canopy Arc",
  description: "What the Canopy Arc website stores in your browser and how to manage it.",
};

const sections: PolicySection[] = [
  {
    id: "storage-we-use",
    title: "What the website stores",
    content: <>
      <p>Cookies are small pieces of data that a website can save in your browser and receive back on later requests. The site also uses local storage for your theme preference and can cache responses on your device for offline access.</p>
      <dl className="policy-storage">
        <div>
          <dt>Theme cookie and local storage</dt>
          <dd>The <code>{THEME_COOKIE}</code> value remembers your light or dark theme. The cookie can last up to one year. The local storage copy remains until cleared by you or your browser.</dd>
        </div>
        <div>
          <dt>Sign-in cookies</dt>
          <dd>When Supabase sign-in is enabled, session cookies keep you signed in and allow the site to refresh your session. Their lifetime depends on the authentication settings and your browser. When demo sign-in is enabled, its session cookies expire after seven days.</dd>
        </div>
        <div>
          <dt>Offline cache</dt>
          <dd>The website’s service worker can save pages, images, and other responses from this site for faster loading or offline access. Cached entries can be replaced when the site updates or removed by you or your browser.</dd>
        </div>
      </dl>
    </>,
  },
  {
    id: "manage-storage",
    title: "How to manage browser storage",
    content: <>
      <p>Use your browser’s cookie and site data settings to view, block, or clear storage for Canopy Arc. Clearing site data can reset the saved theme, remove offline content, and sign you out. Blocking sign-in cookies may prevent account access.</p>
      <p>The theme switch in the site header changes your saved display preference. Use the website’s sign-out control to end your current session.</p>
    </>,
  },
  {
    id: "external-websites",
    title: "When you follow an external link",
    content: <p>Other websites you open from a Canopy Arc page may set their own cookies or use other storage. See the destination website’s policy for details.</p>,
  },
  {
    id: "related-privacy-information",
    title: "Related privacy information",
    content: <p>Our <Link href="/privacy">Privacy Policy</Link> explains how Canopy Arc handles website inquiries, account information, and privacy requests.</p>,
  },
];

export default function CookiesPage() {
  return (
    <PolicyPage
      label="Cookie Policy"
      title="Cookies and"
      titleAccent="browser storage."
      summary="See what the site saves on your device, what each item is for, and how to clear it."
      visual={<SculptureVisual variant="cookies" compact />}
      fullHero
      sections={sections}
      contactTitle="Questions about browser storage?"
      contactBody="Contact Canopy Arc for details about cookies or storage used by this website."
      contactSubject="Canopy Arc cookie policy question"
    />
  );
}
