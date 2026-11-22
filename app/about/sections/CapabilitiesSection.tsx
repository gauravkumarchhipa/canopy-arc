import Link from "next/link";
import Heading from "../../components/ui/Heading";
import ArrowIcon from "../../components/ui/ArrowIcon";
import { CAPABILITIES } from "./about-data";

export default function CapabilitiesSection() {
  return (
    <section className="about-section">
      <div className="about-shell">
        <div className="about-section-heading">
          <p className="about-eyebrow">What we do</p>
          <Heading className="about-section-title">Capabilities across the full product stack.</Heading>
          <p className="about-section-copy">
            From first wireframe to production deployment — we cover the disciplines modern
            digital products need to win.
          </p>
        </div>

        <div className="about-card-grid sm:grid-cols-2">
          {CAPABILITIES.map((cap) => (
            <Link key={cap.title} href={cap.href} className="about-card about-capability">
              <h3 className="about-card-title">{cap.title}</h3>
              <p className="about-card-copy">{cap.body}</p>
              <span className="about-card-link">Explore service <ArrowIcon direction="right" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
