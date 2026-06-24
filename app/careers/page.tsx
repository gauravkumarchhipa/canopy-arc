import type { Metadata } from "next";
import CareersPageContent from "./CareersPageContent";

export const metadata: Metadata = {
  title: "Careers — Canopy Arc",
  description:
    "Join Canopy Arc — open roles in engineering, design, DevOps, and project delivery. Remote-friendly, modern stack, real products.",
};

export default function CareersPage() {
  return <CareersPageContent />;
}
