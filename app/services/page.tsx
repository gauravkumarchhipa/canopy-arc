import { Suspense } from "react";
import { servicesHero } from "../content/pages/services/hero";
import ServicesGrid from "../components/sections/services/ServicesGrid";
export default function ServicesPage() {
  const s = servicesHero;
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-350 px-6 lg:px-10 pb-10 sm:pb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            {s.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight whitespace-pre-line">
            {s.title}
          </h1>
          <p className="mt-5 text-muted max-w-3xl leading-relaxed">
            {s.subtitle}
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <ServicesGrid />
      </Suspense>
    </div>
  );
}

