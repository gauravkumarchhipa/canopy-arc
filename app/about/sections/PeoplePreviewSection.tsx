import Link from "next/link";
import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { PEOPLE } from "./about-data";

export default function PeoplePreviewSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-end mb-12">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-5">The people</Eyebrow>
            <RevealText
              as="h2"
              className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight"
            >
              {`A small team.\nDeeply personal work.`}
            </RevealText>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-base md:text-lg text-muted leading-relaxed max-w-md">
                Co-founders, engineers, and clinical advisors — most of us
                came to SAHAI through caring for someone we love. The product
                is the answer to a problem we lived first.
              </p>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 mt-6 text-sm tracking-[0.15em] uppercase border-b border-foreground/20 hover:border-foreground transition-colors pb-1"
              >
                Meet the team
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>

        <Reveal staggerChildren stagger={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PEOPLE.map((p) => (
              <Link
                key={p.name}
                href="/team"
                className="rounded-2xl border border-line p-6 bg-surface hover:bg-surface-strong transition-colors"
                data-cursor="hover"
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${p.hue} text-[#14161a] font-display text-xl mb-4`}
                >
                  {p.initial}
                </span>
                <p className="font-display text-lg leading-tight tracking-tight">
                  {p.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                  {p.role}
                </p>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
