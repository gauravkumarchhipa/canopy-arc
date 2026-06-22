import PageIntro from "../components/layout/PageIntro";
import WorkGrid from "../components/sections/work/WorkGrid";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import { workHero } from "../content/pages/work/hero";
import { tw } from "../lib/tw";

export default function WorkPage() {
  const w = workHero;
  return (
    <div className={tw.pageShell}>
      <PageIntro eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle}>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {w.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-surface px-5 py-4">
              <AnimatedCounter
                value={s.value}
                className="block text-xl font-semibold tracking-tight text-foreground"
              />
              <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </PageIntro>
      <WorkGrid />
    </div>
  );
}
