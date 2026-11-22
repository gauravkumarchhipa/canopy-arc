"use client";

import type { TeamGridContent } from "../../../content/pages/team/grid";
import Button from "../../ui/Button";
import ArrowIcon from "../../ui/ArrowIcon";
import Heading from "../../ui/Heading";
import { useMemo, useState } from "react";
import Link from "next/link";

type Sort = "expertise" | "name" | "reverse";

type Member = Pick<TeamGridContent["members"][number], "id" | "name" | "group" | "avatar" | "role" | "tags">;

type Props = { filters: string[]; roster: Member[] };

export default function TeamDirectory({ filters, roster }: Props) {
  const [active, setActive] = useState(filters[0]);
  const [sort, setSort] = useState<Sort>("expertise");
  const members = useMemo(() => {
    const filtered =
      active === filters[0]
        ? roster
        : roster.filter((member) => member.group === active);
    return [...filtered].sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "reverse"
          ? b.name.localeCompare(a.name)
          : filters.indexOf(a.group) -
            filters.indexOf(b.group),
    );
  }, [active, filters, roster, sort]);

  return (
    <>
      <div className="team-directory-heading">
        <div>
          <p className="team-label">The People</p>
          <Heading id="team-directory-title">Talent, with a shared purpose.</Heading>
          <p className="team-directory-summary">A diverse team of strategists, engineers, designers and problem-solvers who bring ideas to life.</p>
        </div>
        <p className="team-label team-directory-count" aria-live="polite">
          {members.length} {members.length === 1 ? "profile" : "profiles"}
        </p>
      </div>
      <div className="team-directory-tools">
        <div
          className="team-filters"
          role="group"
          aria-label="Filter team by discipline"
        >
          {filters.map((filter) => (
            <Button variant="unstyled"
              className="team-filter"
              type="button"
              key={filter}
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        <label className="team-sort">
          <span>Sort by</span>
          <select
            aria-label="Sort team members"
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
          >
            <option value="expertise">Expertise</option>
            <option value="name">Name: A–Z</option>
            <option value="reverse">Name: Z–A</option>
          </select>
        </label>
      </div>
      <div className="profile-grid">
        {members.map((member) => (
          <Link
            href={`/team/${member.id}`}
            key={member.id}
            className="profile-card"
            data-motion="card"
            data-member-name={member.name}
          >
            <div className="profile-art">
              <span className="profile-monogram" aria-hidden="true">{member.avatar}</span>
              <span className="profile-discipline">{member.group}</span>
            </div>
            <div className="profile-body">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="profile-tags">
                {member.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className="profile-link">
                View profile <span aria-hidden="true"><ArrowIcon /></span>
              </span>
            </div>
          </Link>
        ))}
      </div>
      {members.length === 0 ? (
        <p className="team-empty">
          No profiles in this discipline yet. Explore the other teams.
        </p>
      ) : null}
    </>
  );
}
