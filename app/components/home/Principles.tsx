import React from 'react'
import RevealText from '../RevealText'
import Reveal from '../Reveal'
import Eyebrow from '../ui/Eyebrow'

const PRINCIPLES = [
  {
    n: "01",
    title: "Continuous, not episodic.",
    body:
      "Healthcare today only listens when something is already wrong. SAHAI listens every day — quietly building a continuous understanding of the people you love.",
  },
  {
    n: "02",
    title: "Voice before screens.",
    body:
      "Buttons, menus and forms are obstacles for an 80-year-old. A short conversation is not. SAHAI is voice-first by design — Hindi, English, or both.",
  },
  {
    n: "03",
    title: "Reliability over cleverness.",
    body:
      "AI helps SAHAI understand. AI does not run reminders, escalation or SOS. The critical paths are deterministic, tested, and never silent.",
  },
  {
    n: "04",
    title: "Quiet most days.",
    body:
      "Family receives one calm summary in the morning. The phone only rings when something genuinely matters. Less noise, more signal.",
  },
];
const Principles = () => {
  return (
    <section className="relative py-12 sm:py-20 md:py-44">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px] opacity-20 [mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)]" />
      <div className="hidden md:block absolute inset-y-0 left-1/4 right-0 bg-linear-to-l from-background from-45% via-background/95 to-transparent pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-5">The promise</Eyebrow>
            <RevealText
              as="h2"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight wrap-break-word"
            >
              {`Healthcare today is\nreactive and fragmented.\nWe quietly fix that.`}
            </RevealText>
          </div>

          <div className="lg:col-span-7">
            <Reveal staggerChildren stagger={0.12}>
              {PRINCIPLES.map((p) => (
                <div
                  key={p.n}
                  className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-8 border-t border-line first:border-t-0"
                >
                  <span className="font-display text-xl text-muted">{p.n}</span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-muted leading-relaxed max-w-xl">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Principles
