import type { Metadata } from "next";
import { getFooterContact } from "../lib/footer/get-footer-data";
import CareersPageContent from "./CareersPageContent";

export const metadata: Metadata = {
  title: "Careers — Canopy Arc",
  description:
    "Join Canopy Arc — open roles in engineering, design, DevOps, and project delivery. Remote-friendly, modern stack, real products.",
};

export default async function CareersPage() {
  const contact = await getFooterContact();
  return <CareersPageContent contact={contact} />;
}
