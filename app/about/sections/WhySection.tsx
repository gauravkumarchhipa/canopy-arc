import {
  aboutSectionEyebrow,
  aboutSectionSubtitle,
  aboutSectionTitle,
} from "./about-styles";

export default function WhySection() {
  return (
    <section className="relative border-t border-line py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className={aboutSectionEyebrow}>Our mission</p>
            <h2 className={aboutSectionTitle}>
              Software should move business forward — not hold it back.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-2xl leading-[1.15] tracking-tight text-foreground sm:text-3xl">
              Too many teams stall between a great idea and a product that actually ships.
              Scope creeps, tech debt piles up, and launches slip.
            </p>
            <p className="mt-6 font-display text-2xl leading-[1.15] tracking-tight text-foreground/85 sm:text-3xl">
              Canopy Arc exists to close that gap — pairing sharp engineering with thoughtful
              design so you launch faster, scale confidently, and keep full ownership of what
              we build together.
            </p>
            <p className={aboutSectionSubtitle}>
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
