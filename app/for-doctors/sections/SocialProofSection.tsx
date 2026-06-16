import Reveal from "../../components/Reveal";

export default function SocialProofSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight max-w-4xl">
            &ldquo;The best part is walking into a follow-up already knowing
            what the patient took, what they skipped, and how they felt all
            week. I&apos;m not chasing memory anymore — I&apos;m treating.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f2994a] via-[#2bb3a3] to-[#2a2f6b] text-[#14161a] font-display text-xl">
              R
            </span>
            <div>
              <p className="font-display text-lg leading-tight">
                Dr. Rashmi Iyer
              </p>
              <p className="text-sm text-muted">
                Geriatrician · Bengaluru · 14 years on practice
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
