import { ServicesHero, ServicesImpact } from "./ServicesSections";
import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesGrid from "../components/sections/services/ServicesGrid";
import { servicesHero } from "../content/pages/services/hero";
import "./services-overview.css";

export const metadata: Metadata = {
  title: "IT Services — Canopy Arc",
  description: servicesHero.subtitle,
};

export default function ServicesPage() {
  return (
    <div className="services-overview">
      <ServicesHero />
      <ServicesImpact />
      <Suspense fallback={null}>
        <ServicesGrid />
      </Suspense>
    </div>
  );
}
