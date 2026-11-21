import Button from "../components/ui/Button";
import ArrowIcon from "../components/ui/ArrowIcon";
import PageIntro from "../components/layout/PageIntro";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import { teamStatLabel, teamStatValue } from "../components/sections/team/team-card-styles";
import { aboutHero } from "../content/pages/about/hero";

export function AboutHero() {
  const hero = aboutHero;
  return (
    <PageIntro
      eyebrow={hero.eyebrow}
      title={hero.title}
      titleAccent={hero.titleAccent}
      subtitle={hero.subtitle}
      eyebrowPill
    >
      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button variant="header-primary" href="/work">
          View Our Work <ArrowIcon direction="right" />
        </Button>
        <Button variant="header-ghost" href="/contact">
          Let&apos;s Talk
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 overflow-visible p-1 md:grid-cols-4">
        {hero.stats.map((stat) => (
          <GlowHoverCard key={stat.label} className="rounded-2xl px-5 py-4">
            <AnimatedCounter value={stat.value} className={teamStatValue} />
            <p className={teamStatLabel}>{stat.label}</p>
          </GlowHoverCard>
        ))}
      </div>
    </PageIntro>
  );
}
