import PageIntro from "../components/layout/PageIntro";
import TeamGrid from "../components/sections/team/TeamGrid";
import { teamHero } from "../content/pages/team/hero";
import { tw } from "../lib/tw";

export default function TeamPage() {
  const t = teamHero;
  return (
    <div className={tw.pageShell}>
      <PageIntro eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle}>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {t.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-surface px-5 py-4">
              <p className="text-xl font-semibold tracking-tight text-foreground">{s.value}</p>
              <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </PageIntro>
      <TeamGrid />
    </div>
  );
}
