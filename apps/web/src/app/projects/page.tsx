import { Logger } from "@workspace/logger";
import { sanityFetch } from "@workspace/sanity/live";
import { queryAllProjects } from "@workspace/sanity/query";
import type { Metadata } from "next";
import { ImageBand } from "@/components/blocks/image-band";
import { PageCta } from "@/components/blocks/page-cta";
import { PageHero } from "@/components/blocks/page-hero";
import { SplitFeature } from "@/components/blocks/split-feature";
import {
  type ProjectRow,
  ProjectStack,
} from "@/components/blocks/project-stack";
import { StatsStrip } from "@/components/blocks/stats-strip";
import {
  ALL_PROJECTS,
  PROJECT_CATEGORIES,
  PROJECT_SECTION_LABEL,
} from "@/data/pkm-portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "MEPF design projects by PKM Consultants: residential, commercial, metro & transit, industrial, healthcare and institutional buildings across India.",
};

const logger = new Logger("ProjectsPage");

const code = (index: number) => `P${String(index + 1).padStart(3, "0")}`;
const cleanTitle = (title: string) => title.trim().replace(/\.$/, "");

async function getSanityProjects() {
  try {
    const { data } = await sanityFetch({ query: queryAllProjects });
    return data ?? [];
  } catch (error) {
    logger.error("Failed to fetch projects", error);
    return [];
  }
}

/** Portfolio rows; PKM's role and the consultant of record are always shown. */
const PORTFOLIO_ROWS: ProjectRow[] = ALL_PROJECTS.map((project, i) => ({
  id: project.id,
  code: code(i),
  title: cleanTitle(project.projectName),
  category: project.category,
  scope: project.scopeOfWork,
  location: project.location,
  year: project.yearFrom,
  role: PROJECT_SECTION_LABEL[project.section],
  consultant:
    project.mepConsultant.toUpperCase() === "PKM CONSULTANTS"
      ? undefined
      : project.mepConsultant,
}));

export default async function ProjectsPage() {
  const sanityProjects = await getSanityProjects();

  // Published Sanity case studies (with detail pages) come first.
  const caseStudies: ProjectRow[] = sanityProjects.map((project, i) => ({
    id: project._id,
    code: code(i),
    title: project.title ?? "Untitled project",
    category: project.category ?? "Other",
    scope: project.tags?.join(", ") || "MEPF design",
    location: project.client ?? undefined,
    year: project.completedYear,
    href: project.slug ? `/projects/${project.slug}` : undefined,
  }));

  const rows =
    caseStudies.length > 0
      ? [
          ...caseStudies,
          ...PORTFOLIO_ROWS.map((row, i) => ({
            ...row,
            code: code(caseStudies.length + i),
          })),
        ]
      : PORTFOLIO_ROWS;

  const categories = [
    ...PROJECT_CATEGORIES,
    ...new Set(caseStudies.map((row) => row.category)),
  ].filter((c, i, all) => all.indexOf(c) === i);

  const stats = [
    { label: "Projects", value: String(rows.length) },
    {
      label: "PKM design",
      value: String(
        ALL_PROJECTS.filter((p) => p.section === "pkm_designed").length
      ),
    },
    {
      label: "Design review",
      value: String(
        ALL_PROJECTS.filter((p) => p.section === "review_consultancy").length
      ),
    },
    {
      label: "Metro & transit",
      value: String(
        ALL_PROJECTS.filter((p) => p.category === "Metro & Transit").length
      ),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Projects"
        intro="MEPF design, design review and site support on residential, commercial, metro, industrial and institutional buildings across India."
        title={["The method,", "applied to real buildings"]}
      />

      <ProjectStack categories={categories} projects={rows} />

      <StatsStrip items={stats} />

      <ImageBand
        alt="Building under construction"
        src="/images/building-1.jpg"
      />

      <SplitFeature
        description="Every project follows the same design workflow: load calculations, coordinated drawings, internal quality checks and code compliance review. That is what keeps drawings consistent across sectors and scales."
        image={{
          src: "/images/hvac.webp",
          alt: "Coordinated HVAC layout drawing",
        }}
        imageSide="left"
        label="Method"
        link={{ href: "/services", label: "How we work" }}
        title="One consistent process on every project"
      />

      <PageCta />
    </>
  );
}
