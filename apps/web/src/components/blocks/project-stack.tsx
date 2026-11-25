"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ProjectRow = {
  id: string;
  /** Short drawing-style code, e.g. "P-012" */
  code: string;
  title: string;
  category: string;
  scope: string;
  location?: string;
  year?: number | null;
  /** PKM's role on the project (own design, review, associate…) */
  role?: string;
  /** MEP consultant of record, shown when it is not PKM */
  consultant?: string;
  href?: string;
};

type ProjectStackProps = {
  projects: ProjectRow[];
  /** Category filter order; categories with no projects are hidden */
  categories: string[];
  pageSize?: number;
};

const ALL = "All";

function RowBody({ project }: { project: ProjectRow }) {
  return (
    <>
      <span className="font-bold font-mosvita text-[#261CC1] text-[0.85rem] tracking-[0.06em] lg:text-[0.95rem]">
        {project.code}
      </span>
      <span className="min-w-0">
        <span className="block font-extrabold font-metropolis text-[#121212] text-[1.05rem] leading-[1.3] tracking-[-0.015em] transition-colors group-hover:text-[#261CC1] lg:text-[1.2rem]">
          {project.title}
        </span>
        {project.location || project.year ? (
          <span className="mt-1 block text-[#555555] text-[0.88rem]">
            {[project.location, project.year].filter(Boolean).join(" · ")}
          </span>
        ) : null}
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="font-bold font-mosvita text-[#5b5a8a] text-[0.65rem] uppercase tracking-[0.18em]">
          Type
        </span>
        <span className="text-[#121212] text-[0.92rem]">
          {project.category}
        </span>
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="font-bold font-mosvita text-[#5b5a8a] text-[0.65rem] uppercase tracking-[0.18em]">
          Scope
        </span>
        <span className="text-[#121212] text-[0.92rem]">{project.scope}</span>
        {project.role ? (
          <span className="text-[#5b5a8a] text-[0.82rem]">
            {project.role}
            {project.consultant ? ` · ${project.consultant}` : ""}
          </span>
        ) : null}
      </span>
    </>
  );
}

const ROW_GRID =
  "group grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-4 border-[#121212]/15 border-t px-6 py-6 sm:px-10 lg:grid-cols-[8rem_minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start lg:px-10 lg:py-7 [&>*:nth-child(n+3)]:col-start-2 lg:[&>*:nth-child(n+3)]:col-start-auto";

/** Filterable, paginated project list on the architectural grid. */
export function ProjectStack({
  projects,
  categories,
  pageSize = 24,
}: ProjectStackProps) {
  const [active, setActive] = useState(ALL);
  const [visible, setVisible] = useState(pageSize);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects)
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, [projects]);

  const filters = [ALL, ...categories.filter((c) => counts.has(c))];
  const filtered =
    active === ALL ? projects : projects.filter((p) => p.category === active);
  const shown = filtered.slice(0, visible);

  const select = (category: string) => {
    setActive(category);
    setVisible(pageSize);
  };

  return (
    <div className="bg-[#f7fbff]">
      {/* Filters */}
      <div
        aria-label="Filter projects by type"
        className="flex flex-wrap gap-2 border-[#121212]/15 border-t px-6 py-5 sm:px-10 lg:px-10"
        role="toolbar"
      >
        {filters.map((filter) => {
          const isActive = filter === active;
          const count = filter === ALL ? projects.length : counts.get(filter);
          return (
            <button
              aria-pressed={isActive}
              className={`inline-flex min-h-11 items-center gap-2 border px-4 font-bold font-mosvita text-[0.75rem] uppercase tracking-[0.12em] transition-colors duration-200 ${
                isActive
                  ? "border-[#261CC1] bg-[#261CC1] text-[#f7fbff]"
                  : "border-[#121212]/20 bg-transparent text-[#121212] hover:border-[#261CC1] hover:text-[#261CC1]"
              }`}
              key={filter}
              onClick={() => select(filter)}
              type="button"
            >
              {filter}
              <span className={isActive ? "text-white/70" : "text-[#5b5a8a]"}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Rows */}
      <ul className="m-0 list-none border-[#121212]/15 border-b p-0">
        {shown.map((project) => (
          <li key={project.id}>
            {project.href ? (
              <Link className={ROW_GRID} href={project.href}>
                <RowBody project={project} />
              </Link>
            ) : (
              <div className={ROW_GRID}>
                <RowBody project={project} />
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-10 lg:px-10">
        <p aria-live="polite" className="m-0 text-[#5b5a8a] text-[0.9rem]">
          Showing {shown.length} of {filtered.length} projects
        </p>
        {visible < filtered.length ? (
          <button
            className="inline-flex min-h-11 items-center border border-[#121212] px-5 font-bold font-mosvita text-[#121212] text-[0.78rem] uppercase tracking-[0.12em] transition-colors duration-200 hover:border-[#261CC1] hover:bg-[#261CC1] hover:text-[#f7fbff]"
            onClick={() => setVisible((v) => v + pageSize)}
            type="button"
          >
            Show more
          </button>
        ) : null}
      </div>
    </div>
  );
}
