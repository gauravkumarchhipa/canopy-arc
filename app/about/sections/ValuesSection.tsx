import Heading from "../../components/ui/Heading";
import { VALUES } from "./about-data";

export default function ValuesSection() {
  return (
    <section id="our-values" className="about-section">
      <div className="about-shell">
        <div className="about-section-heading">
          <p className="about-eyebrow">What we believe</p>
          <Heading className="about-section-title">
            Four principles behind every project we take on.
          </Heading>
        </div>

        <div className="about-card-grid sm:grid-cols-2">
          {VALUES.map((value) => (
            <article key={value.n} className="about-card about-value">
              <h3 className="about-card-title">{value.title}</h3>
              <p className="about-card-copy">{value.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
