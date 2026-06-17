import Reveal from "../../components/Reveal";
import ContactForm from "../../components/ContactForm";
import { REASONS } from "./contact-data";

export default function ContactFormSection() {
  return (
    <section className="relative pb-12 sm:pb-24">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <Reveal staggerChildren stagger={0.08}>
              <div className="flex flex-col gap-3">
                {REASONS.map((r) => (
                  <a
                    key={r.label}
                    href={`mailto:${r.email}`}
                    className="block p-5 sm:p-6 rounded-2xl border border-line group hover:bg-surface hover:border-line-strong transition-colors relative"
                    data-cursor="hover"
                  >
                    <div className="flex items-start justify-between gap-4 sm:gap-6 pr-10">
                      <div className="min-w-0">
                        <p className="text-xs tracking-[0.25em] uppercase text-muted mb-3">
                          {r.label}
                        </p>
                        <p className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                          {r.body}
                        </p>
                        <p className="mt-3 text-sm text-accent wrap-break-word">
                          {r.email}
                        </p>
                      </div>
                    </div>
                    <span className="absolute top-5 right-5 sm:top-6 sm:right-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong group-hover:border-accent group-hover:rotate-45 transition-all">
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
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-12 border border-line bg-surface backdrop-blur-xl backdrop-saturate-140 rounded-2xl p-8">
                <p className="text-xs tracking-[0.25em] uppercase text-muted mb-4">
                  Studio
                </p>
                <p className="font-display text-2xl tracking-tight leading-tight">
                  SAHAI Health
                  <br />
                  Ahmedabad ·  Gujarat
                  <br />
                  India
                </p>
                <p className="mt-6 text-sm text-muted leading-relaxed">
                  Live across India in Hindi and English. More Indian
                  languages rolling out through the year. Support replies
                  within two working days.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
