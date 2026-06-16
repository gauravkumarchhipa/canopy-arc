import Reveal from "../../components/Reveal";
import { SECTIONS } from "./privacy-data";

export default function SectionsSection() {
  return (
    <section className="relative py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal staggerChildren stagger={0.06}>
          <div>
            {SECTIONS.map((s) => (
              <div
                key={s.n}
                className="grid md:grid-cols-12 gap-6 md:gap-12 py-12 px-4 md:px-6 -mx-4 md:-mx-6 rounded-2xl border-t border-line hover:bg-surface transition-colors"
                data-cursor="hover"
              >
                <div className="md:col-span-3">
                  <p className="font-display text-3xl text-muted">{s.n}</p>
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
                    {s.title}
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {s.body.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-4 text-base text-foreground/85 leading-relaxed"
                      >
                        <span className="mt-2 h-px w-4 bg-foreground/40 shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
