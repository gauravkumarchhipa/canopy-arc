import Heading from "../../components/ui/Heading";
import ArrowIcon from "../../components/ui/ArrowIcon";
import Link from "next/link";
import { teamGrid } from "../../content/pages/team/grid";
import {
  teamCardAvatar,
  teamCardAvatarText,
  teamCardName,
  teamCardRole,
} from "../../components/sections/team/team-card-styles";

export default function PeoplePreviewSection() {
  const preview = teamGrid.members.slice(0, 4);

  return (
    <section className="about-section">
      <div className="about-shell">
        <div className="about-people-heading grid items-end gap-4 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="about-eyebrow">The people</p>
            <Heading className="about-section-title">
              A multidisciplinary team built for modern product delivery.
            </Heading>
          </div>
          <div className="lg:col-span-5">
            <p className="about-section-copy">
              Engineers, designers, and strategists working across time zones — united by a
              shared standard for craft, communication, and accountability.
            </p>
            <Link
              href="/team"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground"
            >
              Meet the full team <ArrowIcon direction="right" />
            </Link>
          </div>
        </div>

        <div className="about-card-grid sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((member) => (
            <Link
              key={member.id}
              href={`/team/${member.id}`}
              className="about-card about-person"
            >
              <span className={teamCardAvatar}>
                <span className={teamCardAvatarText}>{member.avatar}</span>
              </span>
              <p className={`${teamCardName} mt-4`}>{member.name}</p>
              <p className={teamCardRole}>{member.role}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
