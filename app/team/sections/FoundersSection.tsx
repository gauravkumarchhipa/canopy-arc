import Reveal from "../../components/Reveal";
import Eyebrow from "../../components/ui/Eyebrow";
import { FOUNDERS, HUES, type Member } from "./team-data";

export default function FoundersSection() {
  return (
    <section className="relative pb-12 sm:pb-20 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Eyebrow className="mb-8">Founders</Eyebrow>
        <Reveal staggerChildren stagger={0.12}>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {FOUNDERS.map((m) => (
              <FounderCard key={m.name} member={m} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FounderCard({ member }: { member: Member }) {
  return (
    <article
      className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-10 group hover:bg-surface-strong transition-colors"
      data-cursor="hover"
    >
      <div
        className={`absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl opacity-50 bg-gradient-to-br ${HUES[member.hue]} pointer-events-none`}
        aria-hidden
      />

      <span
        className={`relative inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${HUES[member.hue]} text-[#14161a] font-display text-4xl mb-8`}
      >
        {member.initial}
      </span>

      <h3 className="relative font-display text-3xl md:text-4xl tracking-tight">
        {member.name}
      </h3>
      <p className="relative mt-1 text-xs uppercase tracking-[0.25em] text-muted">
        {member.role}
      </p>

      <p className="relative mt-5 text-base text-foreground/85 leading-relaxed">
        {member.bio}
      </p>

      {member.links && (
        <div className="relative mt-6 flex flex-wrap gap-3">
          {member.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs hover:border-foreground transition-colors"
            >
              {l.label}
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
