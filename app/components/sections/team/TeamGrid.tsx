"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { teamGrid } from "../../../content/pages/team/grid";
import { tw } from "../../../lib/tw";

type Sort = "expertise" | "name" | "reverse";

export default function TeamGrid() {
  const [active, setActive] = useState(teamGrid.filters[0]);
  const [sort, setSort] = useState<Sort>("expertise");
  const members = useMemo(() => {
    const filtered =
      active === teamGrid.filters[0]
        ? teamGrid.members
        : teamGrid.members.filter((member) => member.group === active);
    return [...filtered].sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "reverse"
          ? b.name.localeCompare(a.name)
          : teamGrid.filters.indexOf(a.group) -
            teamGrid.filters.indexOf(b.group),
    );
  }, [active, sort]);

  return (
    <section
      id="team-directory"
      className="premium-container team-directory"
      aria-labelledby="team-directory-title"
    >
      <div className="team-directory-heading">
        <div>
          <p className="editorial-label">02 / THE PEOPLE</p>
          <h2 id="team-directory-title">Talent, with a shared purpose.</h2>
        </div>
        <p className="editorial-label">
          {String(members.length).padStart(2, "0")} profiles / {active}
        </p>
      </div>
      <div className="team-directory-tools">
        <div
          className="team-filters"
          role="group"
          aria-label="Filter team by discipline"
        >
          {teamGrid.filters.map((filter) => (
            <button
              className="service-filter-chip"
              type="button"
              key={filter}
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
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
            <div className="profile-art" aria-hidden="true">
              <div className="profile-art-meta">
                <span>{member.group}</span>
                <span>
                  {String(
                    teamGrid.members.findIndex(
                      (item) => item.id === member.id,
                    ) + 1,
                  ).padStart(2, "0")}
                </span>
              </div>
              <svg viewBox="0 0 300 230" fill="none">
                {Array.from({ length: 9 }, (_, index) => (
                  <path
                    key={index}
                    d={`M${12 + index * 16} 245 Q${45 + index * 18} ${-120 + index * 9} ${300 + index * 12} 105`}
                    stroke="currentColor"
                  />
                ))}
              </svg>
              <span className="profile-monogram">{member.avatar}</span>
              <span className="profile-art-arrow">↗</span>
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
                View profile <span aria-hidden>↗</span>
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
      <div className="team-closing">
        <div>
          <h3>United by passion. Driven by innovation.</h3>
          <p>Our diverse team works together to bring your ideas to life.</p>
        </div>
        <Link
          href="/careers"
          className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}
        >
          Join Our Team <span aria-hidden>↗</span>
        </Link>
      </div>
    </section>
  );
}
