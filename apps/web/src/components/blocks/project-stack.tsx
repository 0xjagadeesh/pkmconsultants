"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Crosshair } from "@/components/crosshair";
import { MaskRevealText } from "@/components/mask-reveal-text";

export type ProjectRow = {
  id: string;
  /** Short drawing-style code, e.g. "P012" */
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
  image?: { src: string; alt: string };
  href?: string;
};

type ProjectStackProps = {
  title?: string;
  subtitle?: string;
  projects: ProjectRow[];
  /** Category filter order; categories with no projects are hidden */
  categories: string[];
  pageSize?: number;
};

const ALL = "All";

// Hover / keyboard focus: row turns obsidian, text turns lavender tint
const HOVER_TEXT =
  "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[#dedcff] group-focus-visible:text-[#dedcff]";

const LABEL = `font-bold font-mosvita text-[#121212] text-[0.85rem] uppercase tracking-[0.06em] lg:text-[0.95rem] ${HOVER_TEXT}`;

function RowBody({ project }: { project: ProjectRow }) {
  return (
    <>
      {/* Left half: code + large title */}
      <div className="flex flex-col justify-between gap-8 border-[#121212]/15 transition-colors duration-300 group-hover:border-white/15 px-6 pt-6 pb-6 sm:min-h-[220px] sm:gap-10 sm:pb-8 sm:px-10 lg:min-h-[330px] lg:border-r lg:px-4 lg:pt-6 lg:pb-7 xl:px-5">
        <span className={LABEL}>{project.code}</span>
        <div>
          <h2
            className={`m-0 font-extrabold font-metropolis text-[#121212] text-[clamp(1.6rem,3vw,2.9rem)] leading-[1.05] tracking-[-0.035em] [overflow-wrap:anywhere] ${HOVER_TEXT}`}
          >
            {project.title}
          </h2>
          {project.location || project.year ? (
            <p
              className={`m-0 mt-3 text-[#555555] text-[0.95rem] ${HOVER_TEXT}`}
            >
              {[project.location, project.year].filter(Boolean).join(" · ")}
            </p>
          ) : null}
        </div>
      </div>

      {/* Right half: TYPE / SCOPE + image */}
      <div className="grid grid-cols-1 gap-6 border-[#121212]/15 border-t transition-colors duration-300 group-hover:border-white/15 px-6 pt-5 pb-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,240px)] sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,277px)] lg:border-t-0 lg:px-6 lg:pt-6 lg:pb-7">
        <dl className="m-0 grid grid-cols-2 gap-6 sm:flex sm:flex-col sm:justify-between sm:gap-8">
          <div>
            <dt className={LABEL}>Type</dt>
            <dd
              className={`m-0 mt-4 text-[#121212] text-[1.05rem] lg:text-[1.15rem] ${HOVER_TEXT}`}
            >
              {project.category}
            </dd>
          </div>
          <div>
            <dt className={LABEL}>Scope</dt>
            <dd
              className={`m-0 mt-4 text-[#121212] text-[1.05rem] lg:text-[1.15rem] ${HOVER_TEXT}`}
            >
              {project.scope}
            </dd>
            {project.role ? (
              <dd
                className={`m-0 mt-1 text-[#5b5a8a] text-[0.9rem] ${HOVER_TEXT}`}
              >
                {project.role}
                {project.consultant ? ` · ${project.consultant}` : ""}
              </dd>
            ) : null}
          </div>
        </dl>
        {project.image ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#dedcff]/40 sm:aspect-square sm:self-start">
            <Image
              alt={project.image.alt}
              className="rounded-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              fill
              sizes="(min-width: 1024px) 277px, (min-width: 640px) 240px, 100vw"
              src={project.image.src}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

const ROW =
  "group grid grid-cols-1 border-[#121212]/15 border-b bg-[#f7fbff] outline-none transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0d0c11] focus-visible:bg-[#0d0c11] lg:grid-cols-2";

/**
 * Projects index in the editorial gridline layout: header with a title and
 * a coordinate field, type filters, then two-column project rows.
 */
export function ProjectStack({
  title = "Projects",
  subtitle = "The method, applied to real buildings.",
  projects,
  categories,
  pageSize = 10,
}: ProjectStackProps) {
  const [active, setActive] = useState(ALL);
  const [visible, setVisible] = useState(pageSize);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    }
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
    <section className="bg-[#f7fbff] text-[#121212]">
      {/* ── Header: title + hover crosshair ── */}
      <div className="grid grid-cols-1 border-[#121212]/15 border-b lg:grid-cols-2">
        <div className="flex min-h-[300px] flex-col justify-between gap-12 px-6 pt-28 pb-8 sm:px-10 lg:min-h-[480px] lg:border-[#121212]/15 lg:border-r lg:px-4 lg:pt-36 lg:pb-9 xl:px-5">
          <MaskRevealText
            as="h1"
            className="m-0 font-extrabold font-metropolis text-[clamp(3.2rem,7vw,6rem)] leading-[0.95] tracking-[-0.045em]"
            delay={0.15}
            scrollTrigger={false}
            text={title}
          />
          <p className="m-0 max-w-[32ch] font-metropolis font-medium text-[clamp(1.25rem,2.2vw,2.1rem)] leading-[1.2] tracking-[-0.02em]">
            {subtitle}
          </p>
        </div>
        <div className="hidden lg:block">
          <Crosshair />
        </div>
      </div>

      {/* ── Filters ── */}
      <div
        aria-label="Filter projects by type"
        className="flex flex-wrap gap-4 border-[#121212]/15 border-b px-6 py-6 sm:px-10 lg:px-4 xl:px-5"
        role="toolbar"
      >
        {filters.map((filter) => {
          const isActive = filter === active;
          const count = filter === ALL ? projects.length : counts.get(filter);
          return (
            <button
              aria-pressed={isActive}
              className={`inline-flex min-h-12 items-center gap-2 border px-4 font-bold font-mosvita text-[0.95rem] transition-colors duration-200 ${
                isActive
                  ? "border-[#121212] bg-[#121212] text-[#f7fbff]"
                  : "border-[#121212]/70 bg-transparent text-[#121212] hover:border-[#261CC1] hover:text-[#261CC1]"
              }`}
              key={filter}
              onClick={() => select(filter)}
              type="button"
            >
              {filter}
              <span
                className={`font-normal text-[0.8rem] ${isActive ? "text-white/60" : "text-[#5b5a8a]"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Rows ── */}
      <ul className="m-0 list-none p-0">
        {shown.map((project) => (
          <li key={project.id}>
            {project.href ? (
              <Link className={ROW} href={project.href}>
                <RowBody project={project} />
              </Link>
            ) : (
              <article className={ROW}>
                <RowBody project={project} />
              </article>
            )}
          </li>
        ))}
      </ul>

      {/* ── Pagination ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-[#121212]/15 border-b px-6 py-6 sm:px-10 lg:px-4 xl:px-5">
        <p aria-live="polite" className="m-0 text-[#5b5a8a] text-[0.95rem]">
          Showing {shown.length} of {filtered.length} projects
        </p>
        {visible < filtered.length ? (
          <button
            className="inline-flex min-h-12 items-center border border-[#121212] px-5 font-bold font-mosvita text-[#121212] text-[0.95rem] transition-colors duration-200 hover:border-[#261CC1] hover:bg-[#261CC1] hover:text-[#f7fbff]"
            onClick={() => setVisible((v) => v + pageSize)}
            type="button"
          >
            Show more
          </button>
        ) : null}
      </div>
    </section>
  );
}
