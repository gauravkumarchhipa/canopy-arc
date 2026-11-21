import EditorialHero from "../components/layout/EditorialHero";
import Heading from "../components/ui/Heading";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import {
  glowHoverCardBullet,
  glowHoverCardLink,
  glowHoverCardText,
  glowHoverCardTitle,
} from "../components/ui/glow-card-styles";
import type { FooterContact } from "../lib/footer/types";
import { tw } from "../lib/tw";

export function CareersHero() {
  return (
    <EditorialHero
      eyebrow="Careers"
      title={<>
        We&apos;re <span className={tw.gradientText}>hiring</span> great builders.
      </>}
      subtitle="Join a global team shipping web, mobile, and AI products for startups and enterprises. Remote-friendly, engineering-led, and serious about craft."
    />
  );
}

export function CareersSidebar({ contact }: { contact: FooterContact }) {
  return (
    <aside className="space-y-5 lg:col-span-5">
      <GlowHoverCard className="p-6 sm:p-7">
        <Heading className={glowHoverCardTitle}>Why join Canopy Arc?</Heading>
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
        <Heading className={glowHoverCardTitle}>How hiring works</Heading>
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
        <Heading className={glowHoverCardTitle}>Questions?</Heading>
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
  );
}
