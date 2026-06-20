import Reveal from "../../components/Reveal";

export default function SummarySection() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <div className="border border-line bg-surface backdrop-blur-xl backdrop-saturate-140 rounded-3xl p-6 sm:p-8 md:p-12">
            <p className="text-xs tracking-[0.25em] uppercase text-muted mb-4">
              Welcome to SAHAI
            </p>
            <p className="font-display text-2xl md:text-3xl leading-snug tracking-tight">
              These Terms &amp; Conditions explain how you can use the SAHAI
              app, website, services, devices, reminders, voice assistant,
              family features, and related tools. By using SAHAI, you agree
              to these Terms. If you do not agree, please do not use SAHAI.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
