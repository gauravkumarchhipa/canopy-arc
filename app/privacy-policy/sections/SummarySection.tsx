import Reveal from "../../components/Reveal";

export default function SummarySection() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <div className="border border-line bg-surface backdrop-blur-xl backdrop-saturate-140 rounded-3xl p-6 sm:p-8 md:p-12">
            <p className="text-xs tracking-[0.25em] uppercase text-muted mb-4">
              In one paragraph
            </p>
            <p className="font-display text-2xl md:text-3xl leading-snug tracking-tight">
              We only collect what we need to keep your loved ones safe. We
              encrypt every health detail. A family member sees only the
              elders they are linked to. Our team only sees aggregated,
              anonymised insights — never individual patient data without an
              audit-logged reason. You can export your full memory and close
              your account whenever you choose.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
