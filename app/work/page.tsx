import { siteData } from "../content/site-data";
import WorkGrid from "../components/sections/work/WorkGrid";

export default function WorkPage() {
  const w = siteData.work;
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-52 -right-52 h-[680px] w-[680px] rounded-full blur-[110px] opacity-38 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.28),transparent_65%)]" />
          <div className="absolute -bottom-60 -left-60 h-[720px] w-[720px] rounded-full blur-[120px] opacity-35 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_65%)]" />
          <div className="absolute inset-0 opacity-18 grid-bg mask-fade-bottom" />
        </div>

        <div className="mx-auto max-w-350 px-6 lg:px-10 pb-10 sm:pb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            {w.hero.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight whitespace-pre-line">
            {w.hero.title}
          </h1>
          <p className="mt-5 text-muted max-w-3xl leading-relaxed">
            {w.hero.subtitle}
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {w.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface px-5 py-4">
                <p className="text-xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkGrid />
    </div>
  );
}

