import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { ADVISORS } from "./team-data";

export default function AdvisorsSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl mb-10">
          <Eyebrow className="mb-5">Advisors</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`Medicine, regulation,\nand the families we serve.`}
          </RevealText>
        </div>
        <Reveal staggerChildren stagger={0.06}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADVISORS.map((a) => (
              <div
                key={a.name}
                className="rounded-2xl border border-line p-5 bg-surface flex items-center gap-4 group hover:bg-surface-strong hover:border-line-strong transition-colors"
                data-cursor="hover"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-xs font-mono text-muted shrink-0">
                  {a.name
                    .split(" ")
                    .filter((p) => !p.includes("."))
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <p className="font-display text-base leading-tight">
                    {a.name}
                  </p>
                  <p className="text-xs text-muted">{a.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
