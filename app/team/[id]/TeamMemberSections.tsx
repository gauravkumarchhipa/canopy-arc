import Heading from "../../components/ui/Heading";
import StudioHero from "../../components/layout/StudioHero";
import ArrowIcon from "../../components/ui/ArrowIcon";
import Link from "next/link";
import { teamGrid } from "../../content/pages/team/grid";
import Button from "../../components/ui/Button";

type Member = (typeof teamGrid.members)[number];
type Details = NonNullable<Member["details"]>;
type DetailsProps = { details: Details };
type MemberProps = DetailsProps & { member: Member };

export function MemberSidebar({ member, details }: MemberProps) {
  return (
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
                  className="h-full rounded-full bg-foreground"
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
  );
}

export function MemberHero({ member, details }: MemberProps) {
  return (
    <StudioHero className="rounded-3xl border border-line p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            {member.role}
          </p>
          <Heading level={1} className="mt-2 font-display text-4xl sm:text-5xl tracking-tight">
            {member.name}
          </Heading>
          <p className="mt-3 text-muted max-w-2xl">{details.bio}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button href="/contact" className="text-sm">
            Book a Meeting <ArrowIcon direction="right" />
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
    </StudioHero>
  );
}

export function MemberOverview({ details }: DetailsProps) {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="rounded-3xl border border-line bg-surface p-6">
        <Heading className="text-sm font-semibold text-foreground/90">Overview</Heading>
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
        <Heading className="text-sm font-semibold text-foreground/90">Key Achievements</Heading>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          {details.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MemberTimeline({ details }: DetailsProps) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-6">
      <Heading className="text-sm font-semibold text-foreground/90">
        Experience Timeline
      </Heading>
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
  );
}

export function MemberProjects({ details }: DetailsProps) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-6">
      <div className="flex items-center justify-between gap-4">
        <Heading className="text-sm font-semibold text-foreground/90">
          Featured Projects
        </Heading>
        <Link href="/work" className="text-sm text-muted hover:text-foreground">
          View All Projects <ArrowIcon direction="right" />
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
  );
}
