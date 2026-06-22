import Link from "next/link";

export default function MetaSection() {
  return (
    <section className="relative py-16 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 grid md:grid-cols-3 gap-10">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
            Last updated
          </p>
          <p className="font-display text-xl">28 April 2026</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
            Data protection officer
          </p>
          <a
            href="mailto:support@canopy-arc.ai"
            className="font-display text-xl text-accent"
          >
            support@canopy-arc.ai
          </a>
        </div>
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
            Questions
          </p>
          <p className="text-foreground/85">
            Send a note via{" "}
            <Link href="/contact" className="text-accent">
              /contact
            </Link>{" "}
            and tag it as a privacy question.
          </p>
        </div>
      </div>
    </section>
  );
}
