import ArrowIcon from "../../ui/ArrowIcon";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { teamGrid } from "../../../content/pages/team/grid";
import TeamDirectory from "./TeamDirectory";

export default function TeamGrid() {
  return (
    <section id="team-directory" className="team-shell team-directory" aria-labelledby="team-directory-title">
      <TeamDirectory filters={teamGrid.filters} roster={teamGrid.members} heading={
        <div>
          <p className="team-label">The People</p>
          <Heading id="team-directory-title">Talent, with a shared purpose.</Heading>
          <p className="team-directory-summary">A diverse team of strategists, engineers, designers and problem-solvers who bring ideas to life.</p>
        </div>
      } />
      <div className="team-closing">
        <div>
          <h3>United by passion. Driven by innovation.</h3>
          <p>Our diverse team works together to bring your ideas to life.</p>
        </div>
        <Button variant="unstyled"
          href="/careers"
          className="team-primary"
        >
          Join Our Team <span aria-hidden><ArrowIcon /></span>
        </Button>
      </div>
    </section>
  );
}
