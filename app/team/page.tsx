import TeamGrid from "../components/sections/team/TeamGrid";
import TeamHero from "../components/sections/team/TeamHero";
import { tw } from "../lib/tw";

export default function TeamPage() {
  return (
    <div className={`${tw.pageShell} team-page`}>
      <TeamHero />
      <TeamGrid />
    </div>
  );
}
