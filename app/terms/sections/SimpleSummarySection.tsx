import Reveal from "../../components/Reveal";
import { SIMPLE_SUMMARY } from "./terms-data";

export default function SimpleSummarySection() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <div className="border border-line bg-surface backdrop-blur-xl backdrop-saturate-140 rounded-3xl p-6 sm:p-8 md:p-12">
            <p className="text-xs tracking-[0.25em] uppercase text-muted mb-4">
              Simple summary
            </p>
            <p className="font-display text-2xl md:text-3xl leading-snug tracking-tight mb-8">
              By using SAHAI, you understand that:
            </p>
            <ul className="space-y-4">
              {SIMPLE_SUMMARY.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-4 text-base md:text-lg text-foreground/85 leading-relaxed"
                >
                  <span className="mt-3 h-px w-4 bg-foreground/40 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-foreground/85 text-base md:text-lg">
              We are building SAHAI to help people stay safer, more connected,
              and better supported.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
