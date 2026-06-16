import Link from "next/link";

export default function MetaSection() {
  return (
    <section className="relative py-16 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 grid md:grid-cols-3 gap-10">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
            Effective date
          </p>
          <p className="font-display text-xl">23 May 2026</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
            Support &amp; legal contact
          </p>
          <a
            href="mailto:support@sahai.ai  "
            className="font-display text-xl text-accent"
          >
            support@sahai.ai
          </a>
        </div>
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
            Related
          </p>
          <p className="text-foreground/85">
            See our{" "}
            <Link href="/privacy-policy" className="text-accent">
              privacy policy
            </Link>{" "}
            for how data is collected and used.
          </p>
        </div>
      </div>
    </section>
  );
}
