"use client";

import { useState } from "react";
import CareersApplicationForm from "../components/sections/careers/CareersApplicationForm";
import VacancyList from "../components/sections/careers/VacancyList";
import { vacancies } from "../content/pages/careers/vacancies";

export default function CareersOpenings() {
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();
  const [role, setRole] = useState("");

  function handleApply(roleId: string) {
    setSelectedRoleId(roleId);
    setRole(roleId);
    requestAnimationFrame(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="lg:col-span-7">
      <VacancyList vacancies={vacancies} onApply={handleApply} />
      <CareersApplicationForm
        vacancies={vacancies}
        selectedRoleId={selectedRoleId}
        role={role}
        onRoleChange={setRole}
      />
    </div>
  );
}
