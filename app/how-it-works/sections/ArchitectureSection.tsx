import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { ARCH } from "./how-it-works-data";

export default function ArchitectureSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-5">Architecture</Eyebrow>
            <RevealText
              as="h2"
              className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight"
            >
              {`Five services.\nOne quiet boundary\nbetween AI and truth.`}
            </RevealText>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl">
                AI services interpret. They never directly write to the
                database. The Data Service is the single source of truth — and
                the Reliability Service runs reminders without ever asking the
                AI for permission.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal staggerChildren stagger={0.08}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-3xl overflow-hidden">
            {ARCH.map((a, i) => (
              <article
                key={a.name}
                className="bg-background p-8 md:p-10 group hover:bg-surface transition-colors relative"
                data-cursor="hover"
              >
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted mb-6">
                  Service {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                  {a.name}
                </h3>
                <p className="mt-4 text-muted leading-relaxed">{a.body}</p>

                <span className="absolute right-6 top-6 md:right-8 md:top-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong group-hover:border-accent group-hover:rotate-45 transition-all">
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

        <Reveal>
          <div className="mt-16 grid md:grid-cols-2 gap-8 text-sm">
            <div className="border-l border-line-strong pl-6">
              <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
                Tech stack
              </p>
              <ul className="space-y-2 text-foreground/85">
                <li>Backend — Django / FastAPI</li>
                <li>Database — PostgreSQL</li>
                <li>Queue — Redis (BullMQ)</li>
                <li>Mobile — React Native</li>
                <li>AI — Claude / OpenAI</li>
              </ul>
            </div>
            <div className="border-l border-line-strong pl-6">
              <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
                Offline support
              </p>
              <ul className="space-y-2 text-foreground/85">
                <li>Inputs stored locally, retried when online</li>
                <li>Reminders fire from the local queue</li>
                <li>SOS works through call + SMS without internet</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
