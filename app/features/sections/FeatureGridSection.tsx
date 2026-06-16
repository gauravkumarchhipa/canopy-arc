import Reveal from "../../components/Reveal";
import { FEATURES } from "./features-data";

export default function FeatureGridSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal staggerChildren stagger={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-3xl overflow-hidden">
            {FEATURES.map((f, i) => (
              <article
                key={f.tag}
                className="bg-background p-6 sm:p-10 md:p-14 group hover:bg-surface transition-colors relative"
                data-cursor="hover"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xs tracking-[0.25em] uppercase text-muted">
                    {f.tag}
                  </span>
                  <span className="font-mono text-xs text-muted/60">
                    {String(i + 1).padStart(2, "0")} / 08
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tight max-w-md">
                  {f.title}
                </h3>
                <p className="mt-5 text-muted leading-relaxed max-w-md">
                  {f.body}
                </p>

                <ul className="mt-8 space-y-3">
                  {f.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-foreground/80"
                    >
                      <span className="mt-2 h-1 w-3 shrink-0 bg-gradient-to-r from-[#f2994a] to-[#2a2f6b]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <span className="absolute right-8 top-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong group-hover:border-accent group-hover:rotate-45 transition-all">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
