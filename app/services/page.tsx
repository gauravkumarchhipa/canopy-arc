import { Suspense } from "react";
import PageIntro from "../components/layout/PageIntro";
import ServicesGrid from "../components/sections/services/ServicesGrid";
import { servicesHero } from "../content/pages/services/hero";
import { tw } from "../lib/tw";

export default function ServicesPage() {
  const s = servicesHero;
  return (
    <div className={tw.pageShell}>
      <PageIntro eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
      <Suspense fallback={null}>
        <ServicesGrid />
      </Suspense>
    </div>
  );
}
