import Heading from "../../components/ui/Heading";
import { TIMELINE } from "./about-data";

export default function TimelineSection() {
  return (
    <section className="about-section">
      <div className="about-shell">
        <div className="about-section-heading">
          <p className="about-eyebrow">Our journey</p>
          <Heading className="about-section-title">
            From a small studio to a trusted global partner.
          </Heading>
        </div>

        <ol className="about-timeline">
          {TIMELINE.map((entry) => (
            <li key={entry.date} className="about-milestone">
              <p className="about-milestone-date">{entry.date}</p>
              <div>
                <h3 className="about-card-title">{entry.title}</h3>
                <p className="about-card-copy">{entry.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
