export default function PrincipleQuoteSection() {
  return (
    <section className="relative border-t border-line py-20 sm:py-28 md:py-36">
      <div className="mx-auto max-w-350 px-6 text-center lg:px-10">
        <p className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] tracking-tight text-foreground">
          Quality, clarity, and ownership matter more than{" "}
          <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">
            speed for its own sake.
          </span>
        </p>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
          The Canopy Arc principle
        </p>
      </div>
    </section>
  );
}
