import { siteData } from "../content/site-data";
import ServicesGrid from "../components/sections/services/ServicesGrid";

export default function ServicesPage() {
  const s = siteData.services;
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-52 -right-52 h-[680px] w-[680px] rounded-full blur-[110px] opacity-45 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.40),transparent_65%)]" />
          <div className="absolute -bottom-60 -left-60 h-[720px] w-[720px] rounded-full blur-[120px] opacity-40 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.28),transparent_65%)]" />
          <div className="absolute inset-0 opacity-20 grid-bg mask-fade-bottom" />
        </div>

        <div className="mx-auto max-w-350 px-6 lg:px-10 pb-10 sm:pb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            {s.hero.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight whitespace-pre-line">
            {s.hero.title}
          </h1>
          <p className="mt-5 text-muted max-w-3xl leading-relaxed">
            {s.hero.subtitle}
          </p>
        </div>
      </section>

      <ServicesGrid />
    </div>
  );
}

