import PageIntro from "../components/layout/PageIntro";
import WorkGrid from "../components/sections/work/WorkGrid";
import { teamStatLabel, teamStatValue } from "../components/sections/team/team-card-styles";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import { workHero } from "../content/pages/work/hero";
import { tw } from "../lib/tw";
export default function WorkPage() {
  const w = workHero;
  return (
    <div className={tw.pageShell}>
      <PageIntro
        eyebrow={w.eyebrow}
        title={w.title}
        titleAccent={w.titleAccent}
        subtitle={w.subtitle}
        eyebrowPill
      >
        <div className="mt-8 grid grid-cols-2 gap-4 overflow-visible p-1 md:grid-cols-4">
          {w.stats.map((s) => (
            <GlowHoverCard key={s.label} className="rounded-2xl px-5 py-4">
              <AnimatedCounter value={s.value} className={teamStatValue} />
              <p className={teamStatLabel}>{s.label}</p>
            </GlowHoverCard>
          ))}
        </div>      </PageIntro>
      <WorkGrid />
    </div>
  );
}
