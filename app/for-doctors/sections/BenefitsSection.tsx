import Reveal from "../../components/Reveal";
import { BENEFITS } from "./for-doctors-data";

export default function BenefitsSection() {
  return (
    <section className="relative pb-12 sm:pb-20 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal staggerChildren stagger={0.1}>
          <div className="grid md:grid-cols-2 gap-px bg-line border border-line rounded-3xl overflow-hidden">
            {BENEFITS.map((b) => (
              <article
                key={b.n}
                className="bg-background p-6 sm:p-8 md:p-12 hover:bg-surface transition-colors"
                data-cursor="hover"
              >
                <p className="font-display text-sm text-muted mb-6">{b.n}</p>
                <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                  {b.title}
                </h3>
                <p className="mt-4 text-muted leading-relaxed max-w-md">
                  {b.body}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
