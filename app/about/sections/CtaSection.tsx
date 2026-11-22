import Button from "../../components/ui/Button";
import ArrowIcon from "../../components/ui/ArrowIcon";
import StudioHero from "../../components/layout/StudioHero";
import Heading from "../../components/ui/Heading";

export default function CtaSection() {
  return (
    <div className="about-shell">
      <StudioHero className="about-closing flex flex-col items-start justify-between gap-6 md:flex-row md:items-center" aria-labelledby="about-closing-title">
        <div>
          <Heading id="about-closing-title" className="about-card-title">Ready to build something great?</Heading>
          <p className="about-section-copy">
            Tell us about your product, timeline, and goals. We&apos;ll respond with a clear
            plan — no pressure, no jargon.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="header-primary" href="/contact">
            Start a Project <ArrowIcon direction="right" />
          </Button>
          <Button variant="header-ghost" href="/work">
            View Our Work
          </Button>
        </div>
      </StudioHero>
    </div>
  );
}
