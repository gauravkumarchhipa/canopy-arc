import Reveal from "../../components/Reveal";
import { FLOW } from "./how-it-works-data";

export default function FlowStepsSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal staggerChildren stagger={0.08}>
          <div>
            {FLOW.map((s) => (
              <div
                key={s.step}
                className="grid md:grid-cols-12 gap-6 md:gap-12 py-12 border-t border-line group hover:bg-surface transition-colors px-2 md:px-6 -mx-2 md:-mx-6 rounded-2xl"
                data-cursor="hover"
              >
                <div className="md:col-span-3 flex md:flex-col md:justify-between items-baseline gap-4">
                  <span className="font-display text-6xl md:text-8xl leading-none tracking-tight bg-[image:var(--grad)] bg-clip-text text-transparent">
                    {s.step}
                  </span>
                  <span className="hidden md:inline-block text-xs tracking-[0.3em] uppercase text-muted">
                    step
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-3xl md:text-5xl leading-[1] tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base md:text-lg text-muted leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
