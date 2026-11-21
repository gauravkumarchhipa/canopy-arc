import { WorkHero, WorkImpact, WorkContact } from "./WorkSections";
import type { Metadata } from "next";
import WorkGrid from "../components/sections/work/WorkGrid";
import { workHero } from "../content/pages/work/hero";
import "./work-overview.css";

export const metadata: Metadata = {
  title: `${workHero.title} ${workHero.titleAccent} — Canopy Arc`,
  description: workHero.subtitle,
};

export default function WorkPage() {
  return (
    <div className="work-overview">
      <WorkHero />

      <WorkImpact />

      <WorkGrid />

      <WorkContact />
    </div>
  );
}
