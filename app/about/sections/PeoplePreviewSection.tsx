import Link from "next/link";
import GlowHoverCard from "../../components/ui/GlowHoverCard";
import { teamGrid } from "../../content/pages/team/grid";
import {
  aboutSectionEyebrow,
  aboutSectionSubtitle,
  aboutSectionTitle,
} from "./about-styles";
import {
  teamCardAvatar,
  teamCardAvatarText,
  teamCardName,
  teamCardRole,
} from "../../components/sections/team/team-card-styles";

export default function PeoplePreviewSection() {
  const preview = teamGrid.members.slice(0, 4);

  return (
    <section className="relative border-t border-line py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className={aboutSectionEyebrow}>The people</p>
            <h2 className={aboutSectionTitle}>
              A multidisciplinary team built for modern product delivery.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className={aboutSectionSubtitle}>
              Engineers, designers, and strategists working across time zones — united by a
              shared standard for craft, communication, and accountability.
            </p>
            <Link
              href="/team"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground"
            >
              Meet the full team →
            </Link>
          </div>
        </div>

        <div className="grid gap-4 overflow-visible p-1 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((member) => (
            <GlowHoverCard
              key={member.id}
              as={Link}
              href={`/team/${member.id}`}
              className="block rounded-2xl p-5"
            >
              <span className={teamCardAvatar}>
                <span className={teamCardAvatarText}>{member.avatar}</span>
              </span>
              <p className={`${teamCardName} mt-4`}>{member.name}</p>
              <p className={teamCardRole}>{member.role}</p>
            </GlowHoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
