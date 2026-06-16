import Reveal from "../../components/Reveal";
import { SECTIONS, type TermsBodyItem } from "./terms-data";

function BodyItem({ item }: { item: TermsBodyItem }) {
  if (typeof item === "string") {
    return (
      <li className="flex items-start gap-4 text-base text-foreground/85 leading-relaxed">
        <span className="mt-2 h-px w-4 bg-foreground/40 shrink-0" />
        <span>{item}</span>
      </li>
    );
  }

  return (
    <li className="flex items-start gap-4 text-base text-foreground/85 leading-relaxed">
      <span className="mt-2 h-px w-4 bg-foreground/40 shrink-0" />
      <div className="flex-1">
        <p>{item.lead}</p>
        <ul className="mt-3 space-y-2 pl-2">
          {item.items.map((sub) => (
            <li
              key={sub}
              className="flex items-start gap-3 text-base text-foreground/75 leading-relaxed"
            >
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
              <span>{sub}</span>
            </li>
          ))}
        </ul>
        {item.trail ? <p className="mt-3">{item.trail}</p> : null}
      </div>
    </li>
  );
}

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
                    {s.body.map((item, idx) => (
                      <BodyItem
                        key={typeof item === "string" ? item : `${s.n}-${idx}`}
                        item={item}
                      />
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
