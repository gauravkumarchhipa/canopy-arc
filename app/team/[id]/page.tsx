import { MemberSidebar, MemberHero, MemberOverview, MemberTimeline, MemberProjects } from "./TeamMemberSections";
import Heading from "../../components/ui/Heading";
import StudioHero from "../../components/layout/StudioHero";
import ArrowIcon from "../../components/ui/ArrowIcon";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teamGrid } from "../../content/pages/team/grid";
import { tw } from "../../lib/tw";

export default async function TeamMemberPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = teamGrid.members.find((m) => m.id === id);

  if (!member) notFound();

  const details = member.details;

  if (!details) {
    return (
      <div className={`${tw.pageShell} mx-auto max-w-350 px-6 lg:px-10`}>
        <Link href="/team" className="text-sm text-muted hover:text-foreground">
          <ArrowIcon direction="left" /> Back to Team
        </Link>
        <StudioHero className="mt-6">
          <Heading level={1} className="font-display text-4xl tracking-tight">
            {member.name}
          </Heading>
          <p className="mt-2 text-muted">{member.role}</p>
        </StudioHero>
        <p className="mt-8 text-muted">
          Detailed profile coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className={tw.pageShell}>
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <Link href="/team" className="text-sm text-muted hover:text-foreground">
          <ArrowIcon direction="left" /> Back to Team
        </Link>

        <div className="mt-6 grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left card */}
          <MemberSidebar member={member} details={details} />

          {/* Main */}
          <main className="lg:col-span-8 space-y-6">
            <MemberHero member={member} details={details} />

            <MemberOverview details={details} />

            <MemberTimeline details={details} />

            <MemberProjects details={details} />
          </main>
        </div>
      </div>
    </div>
  );
}

