import PageIntro from "../components/layout/PageIntro";
import TeamGrid from "../components/sections/team/TeamGrid";
import { teamStatLabel, teamStatValue } from "../components/sections/team/team-card-styles";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import { teamHero } from "../content/pages/team/hero";
import { tw } from "../lib/tw";

export default function TeamPage() {
  const t = teamHero;
  return (
    <div className={tw.pageShell}>
      <PageIntro
        eyebrow={t.eyebrow}
        title={t.title}
        titleAccent={t.titleAccent}
        subtitle={t.subtitle}
        eyebrowPill
      >
        <div className="mt-8 grid grid-cols-2 gap-4 overflow-visible p-1 md:grid-cols-4">
          {t.stats.map((s) => (
            <GlowHoverCard key={s.label} className="rounded-2xl px-5 py-4">
              <AnimatedCounter value={s.value} className={teamStatValue} />
              <p className={teamStatLabel}>{s.label}</p>
            </GlowHoverCard>
          ))}
        </div>
      </PageIntro>
      <TeamGrid />
    </div>
  );
}
