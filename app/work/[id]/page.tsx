import { ProjectHero, ProjectOverview, ProjectInfo } from "./ProjectSections";
import ArrowIcon from "../../components/ui/ArrowIcon";
import Link from "next/link";
import { notFound } from "next/navigation";
import { workGrid } from "../../content/pages/work/grid";
import { tw } from "../../lib/tw";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = workGrid.projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className={tw.pageShell}>
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <Link href="/work" className="text-sm text-muted hover:text-foreground">
          <ArrowIcon direction="left" /> Back to Our Work
        </Link>

        <ProjectHero project={project} />

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <ProjectOverview project={project} />

          <ProjectInfo project={project} />
        </div>
      </div>
    </div>
  );
}
