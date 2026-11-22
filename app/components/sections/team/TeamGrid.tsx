import ArrowIcon from "../../ui/ArrowIcon";
import Button from "../../ui/Button";
import { teamGrid } from "../../../content/pages/team/grid";
import TeamDirectory from "./TeamDirectory";

export default function TeamGrid() {
  return (
    <section id="team-directory" className="team-shell team-directory" aria-labelledby="team-directory-title">
      <TeamDirectory filters={teamGrid.filters} roster={teamGrid.members} />
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
