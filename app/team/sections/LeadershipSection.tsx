import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { HUES, LEADERSHIP } from "./team-data";

export default function LeadershipSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <Eyebrow className="mb-5">Leadership</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`The people who own\nthe critical paths.`}
          </RevealText>
        </div>

        <Reveal staggerChildren stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-3xl overflow-hidden">
            {LEADERSHIP.map((m) => (
              <article
                key={m.name}
                className="bg-background p-6 md:p-8 hover:bg-surface transition-colors"
                data-cursor="hover"
              >
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${HUES[m.hue]} text-[#14161a] font-display text-2xl mb-5`}
                >
                  {m.initial}
                </span>
                <h3 className="font-display text-xl md:text-2xl tracking-tight">
                  {m.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                  {m.role}
                </p>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  {m.bio}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
