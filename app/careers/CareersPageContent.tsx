"use client";

import { useState } from "react";
import PageAmbientGlow from "../components/layout/PageAmbientGlow";
import CareersApplicationForm from "../components/sections/careers/CareersApplicationForm";
import VacancyList from "../components/sections/careers/VacancyList";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import {
  glowHoverCardBullet,
  glowHoverCardLink,
  glowHoverCardText,
  glowHoverCardTitle,
} from "../components/ui/glow-card-styles";
import { vacancies } from "../content/pages/careers/vacancies";
import type { FooterContact } from "../lib/footer/types";
import { tw } from "../lib/tw";

type Props = {
  contact: FooterContact;
};

export default function CareersPageContent({ contact }: Props) {
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();

  function handleApply(roleId: string) {
    setSelectedRoleId(roleId);
    requestAnimationFrame(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className={`${tw.pageShell} relative overflow-hidden`}>
      <PageAmbientGlow />

      <section className="relative">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">Careers</p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">
            We&apos;re <span className={tw.gradientText}>hiring</span> great builders.
          </h1>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            Join a global team shipping web, mobile, and AI products for startups and
            enterprises. Remote-friendly, engineering-led, and serious about craft.
          </p>
        </div>
      </section>

      <section className="relative mx-auto mt-12 grid max-w-350 gap-6 px-6 sm:mt-14 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div className="lg:col-span-7">
          <VacancyList vacancies={vacancies} onApply={handleApply} />
          <CareersApplicationForm vacancies={vacancies} selectedRoleId={selectedRoleId} />
        </div>

        <aside className="space-y-5 lg:col-span-5">
          <GlowHoverCard className="p-6 sm:p-7">
            <h2 className={glowHoverCardTitle}>Why join Canopy Arc?</h2>
            <ul className={`${glowHoverCardText} mt-4 space-y-3`}>
              {[
                "Work on real products — not endless internal decks.",
                "Remote-first with flexible hours and async-friendly culture.",
                "Modern stack: Next.js, React Native, cloud, and AI tooling.",
                "Clear growth paths for engineers, designers, and leads.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className={glowHoverCardBullet} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </GlowHoverCard>

          <GlowHoverCard className="p-6 sm:p-7">
            <h2 className={glowHoverCardTitle}>How hiring works</h2>
            <ul className={`${glowHoverCardText} mt-4 space-y-3`}>
              {[
                "Apply with your portfolio and a short cover note.",
                "Intro call with our team — culture and role fit.",
                "Technical or portfolio review (role-dependent).",
                "Final conversation and offer within two weeks.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className={glowHoverCardBullet} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </GlowHoverCard>

          <GlowHoverCard className="p-6 sm:p-7">
            <h2 className={glowHoverCardTitle}>Questions?</h2>
            <div className={`${glowHoverCardText} mt-4 space-y-3`}>
              <p>
                Don&apos;t see the right role? Send an open application — we&apos;re always
                interested in exceptional people.
              </p>
              {contact.email ? (
                <a className={glowHoverCardLink} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              ) : null}
              {contact.hours ? <p>{contact.hours}</p> : null}
            </div>
          </GlowHoverCard>
        </aside>
      </section>
    </div>
  );
}
