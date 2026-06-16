import Link from "next/link";
import { notFound } from "next/navigation";
import { siteData } from "../../content/site-data";
import Button from "../../components/ui/Button";

export default async function TeamMemberPage({
  params
}: {
  params: { id: string };
}) {
  const id = params.id;
  const member = siteData.team.members.find((m) => m.id === id);

  if (!member) notFound();

  const details = member.details;

  if (!details) {
    return (
      <div className="pt-24 sm:pt-28 mx-auto max-w-350 px-6 lg:px-10 pb-18 sm:pb-24">
        <Link href="/team" className="text-sm text-muted hover:text-foreground">
          ← Back to Team
        </Link>
        <h1 className="mt-6 font-display text-4xl tracking-tight">
          {member.name}
        </h1>
        <p className="mt-2 text-muted">{member.role}</p>
        <p className="mt-8 text-muted">
          Detailed profile coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 pb-18 sm:pb-24">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <Link href="/team" className="text-sm text-muted hover:text-foreground">
          ← Back to Team
        </Link>

        <div className="mt-6 grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left card */}
          <aside className="lg:col-span-4 rounded-3xl border border-line bg-surface p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-3xl border border-line bg-background grid place-items-center">
                <span className="text-lg font-semibold text-foreground/90">
                  {member.avatar}
                </span>
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">
                  {member.name}
                </p>
                <p className="text-sm text-muted">{details.title}</p>
                <p className="text-xs text-muted mt-1">{member.group}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
                Expertise Overview
              </h3>
              <div className="space-y-3">
                {details.expertise.map((e) => (
                  <div key={e.label}>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{e.label}</span>
                      <span>{e.value}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-background border border-line overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-[#22d3ee] via-[#3b82f6] to-[#8b5cf6]"
                        style={{ width: `${e.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <h3 className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
                Quick Info
              </h3>
              <div className="space-y-2 text-sm text-muted">
                {details.quickInfo.map((q) => (
                  <div key={q.label} className="flex items-center justify-between gap-3">
                    <span>{q.label}</span>
                    <span className="text-foreground/85">{q.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-8 space-y-6">
            <section className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-muted">
                    {member.role}
                  </p>
                  <h1 className="mt-2 font-display text-4xl sm:text-5xl tracking-tight">
                    {member.name}
                  </h1>
                  <p className="mt-3 text-muted max-w-2xl">{details.bio}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button href="/contact" className="text-sm">
                    Book a Meeting →
                  </Button>
                  <Button href={`mailto:${member.links.email}`} variant="ghost" className="text-sm">
                    Send an Email
                  </Button>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {details.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-line bg-background/60 px-4 py-3">
                    <p className="text-lg font-semibold tracking-tight text-foreground">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-line bg-surface p-6">
                <h2 className="text-sm font-semibold text-foreground/90">Overview</h2>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {details.overview}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {details.skills.slice(0, 10).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line bg-background/60 px-3 py-1 text-xs text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-line bg-surface p-6">
                <h2 className="text-sm font-semibold text-foreground/90">Key Achievements</h2>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  {details.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-3xl border border-line bg-surface p-6">
              <h2 className="text-sm font-semibold text-foreground/90">
                Experience Timeline
              </h2>
              <div className="mt-5 space-y-4">
                {details.timeline.map((t) => (
                  <div key={`${t.from}-${t.title}`} className="rounded-2xl border border-line bg-background/60 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground/90">
                        {t.title} · {t.company}
                      </p>
                      <span className="text-xs text-muted">
                        {t.from} – {t.to}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted">{t.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-line bg-surface p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold text-foreground/90">
                  Featured Projects
                </h2>
                <Link href="/work" className="text-sm text-muted hover:text-foreground">
                  View All Projects →
                </Link>
              </div>
              <div className="mt-5 grid md:grid-cols-3 gap-4">
                {details.featuredProjects.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="rounded-2xl border border-line bg-background/60 p-4 hover:bg-surface transition-colors"
                  >
                    <p className="text-sm font-medium text-foreground/90">{p.title}</p>
                    <p className="mt-1 text-xs text-muted">{p.subtitle}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line bg-background px-2.5 py-1 text-[11px] text-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

