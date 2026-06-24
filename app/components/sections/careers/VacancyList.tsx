"use client";

import { useState } from "react";
import { z } from "zod";
import type { Vacancy } from "../../../content/pages/careers/vacancies";
import GlowHoverCard from "../../ui/GlowHoverCard";
import { tw } from "../../../lib/tw";
import {
  vacancyApplyLink,
  vacancyDescription,
  vacancyMeta,
  vacancyTag,
  vacancyTitle,
} from "./careers-styles";

type Props = {
  vacancies: Vacancy[];
  onApply: (roleId: string) => void;
};

export default function VacancyList({ vacancies, onApply }: Props) {
  const [expanded, setExpanded] = useState<string | null>(vacancies[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {vacancies.map((role) => {
        const isOpen = expanded === role.id;
        return (
          <GlowHoverCard
            key={role.id}
            className="cursor-pointer p-6 sm:p-7"
            onClick={() => setExpanded(isOpen ? null : role.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded(isOpen ? null : role.id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className={vacancyMeta}>
                  {role.department} · {role.type} · {role.location}
                </p>
                <h2 className={vacancyTitle}>{role.title}</h2>
              </div>
              <span
                className="relative z-1 text-lg leading-none text-muted transition-colors duration-[400ms] group-hover:text-white"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </div>

            {isOpen ? (
              <>
                <p className={vacancyDescription}>{role.description}</p>
                <div className="relative z-1 mt-4 flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span key={tag} className={vacancyTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className={vacancyApplyLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(role.id);
                  }}
                >
                  Apply for this role →
                </button>
              </>
            ) : null}
          </GlowHoverCard>
        );
      })}
    </div>
  );
}
