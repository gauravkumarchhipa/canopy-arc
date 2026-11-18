import TeamGrid from "../components/sections/team/TeamGrid";
import TeamHero from "../components/sections/team/TeamHero";
import "./team-overview.css";

export default function TeamPage() {
  return (
    <div className="team-page">
      <TeamHero />
      <TeamGrid />
    </div>
  );
}
