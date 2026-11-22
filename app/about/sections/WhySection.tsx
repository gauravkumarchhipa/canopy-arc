import Heading from "../../components/ui/Heading";

export default function WhySection() {
  return (
    <section className="about-section">
      <div className="about-shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="about-eyebrow">Our mission</p>
            <Heading className="about-section-title">
              Software should move business forward — not hold it back.
            </Heading>
          </div>
          <div className="lg:col-span-8">
            <p className="about-mission-lead">
              Too many teams stall between a great idea and a product that actually ships.
              Scope creeps, tech debt piles up, and launches slip.
            </p>
            <p className="about-section-copy">
              Canopy Arc exists to close that gap — pairing sharp engineering with thoughtful
              design so you launch faster, scale confidently, and keep full ownership of what
              we build together.
            </p>
            <p className="about-section-copy">
              Whether you need an MVP, a platform rebuild, or a dedicated product squad, we
              bring the discipline of enterprise delivery with the speed of a focused startup
              team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
