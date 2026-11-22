import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage, { type PolicySection } from "../components/layout/PolicyPage";
import SculptureVisual from "../components/three/SculptureVisual";

export const metadata: Metadata = {
  title: "Terms of Service — Canopy Arc",
  description: "Terms for browsing and using the Canopy Arc website, contacting us, and using a website account.",
};

const sections: PolicySection[] = [
  {
    id: "scope",
    title: "What these terms cover",
    content: <p>These terms apply to using the Canopy Arc website, including browsing our work, contacting us, and using a website account. A separate agreement for a client project governs that project’s scope, fees, and deliverables.</p>,
  },
  {
    id: "acceptable-use",
    title: "Using the site responsibly",
    content: <>
      <p>Use the site lawfully and respect the rights of other people. When you interact with the site, please follow these rules.</p>
      <ul>
        <li>Keep the site accessible to others and avoid activity that interferes with its operation.</li>
        <li>Access only accounts, systems, and information you are authorized to use.</li>
        <li>Keep your credentials private and use accurate contact information when requesting a reply.</li>
      </ul>
    </>,
  },
  {
    id: "project-inquiries",
    title: "Project inquiries and proposals",
    content: <p>The contact form opens a draft in your email app so you can review it before sending. An inquiry starts a conversation. Any commitment to scope, pricing, or delivery dates is set out in the agreement for the project.</p>,
  },
  {
    id: "site-content",
    title: "Website content and external links",
    content: <>
      <p>Service descriptions and case studies describe our work and capabilities. Contact us to confirm what is available for your project.</p>
      <p>Canopy Arc branding and materials may be protected by intellectual property rights. Client names, marks, and third-party materials may belong to their respective owners. Check the applicable permissions before reproducing or reusing materials. External sites have their own terms and privacy notices.</p>
    </>,
  },
  {
    id: "privacy-and-updates",
    title: "Privacy and updates",
    content: <p>See our <Link href="/privacy">Privacy Policy</Link> for information about inquiries and accounts, and our <Link href="/cookies">Cookie Policy</Link> for details about browser storage. If these website terms change, the revised version will appear on this page.</p>,
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      label="Terms of Service"
      title="Plain words."
      titleAccent="Fair terms."
      summary="What to expect when you use the Canopy Arc website, get in touch, or discuss a project with us."
      visual={<SculptureVisual variant="terms" compact />}
      fullHero
      sections={sections}
      contactTitle="Questions about these terms?"
      contactBody="Contact Canopy Arc for clarification about using the website or starting a project."
      contactSubject="Canopy Arc website terms question"
    />
  );
}
