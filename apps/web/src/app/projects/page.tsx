import { Logger } from "@workspace/logger";
import { SANITY_BASE_URL } from "@workspace/sanity/image";
import { sanityFetch } from "@workspace/sanity/live";
import { queryAllProjects } from "@workspace/sanity/query";
import type { Metadata } from "next";

import { PageCta } from "@/components/blocks/page-cta";
import {
  type ProjectRow,
  ProjectStack,
} from "@/components/blocks/project-stack";
import {
  ALL_PROJECTS,
  type DisciplineScope,
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

/**
 * Portfolio entries have no project photos, so each row shows the drawing
 * for its discipline. Alt text says so rather than implying a site photo.
 */
const DISCIPLINE_IMAGE: Record<DisciplineScope, { src: string; alt: string }> =
  {
    Plumbing: { src: "/images/plumbing.webp", alt: "Plumbing design drawing" },
    "Fire Fighting": {
      src: "/images/fps.webp",
      alt: "Fire protection design drawing",
    },
    Electrical: { src: "/images/electrical.jpg", alt: "Electrical panels" },
    "Plumbing & Fire Fighting": {
      src: "/images/fps.webp",
      alt: "Plumbing and fire fighting design drawing",
    },
    "Plumbing & Electrical": {
      src: "/images/plumbing.webp",
      alt: "Plumbing and electrical design drawing",
    },
    "Comprehensive MEP": {
      src: "/images/archi.webp",
      alt: "Coordinated MEP floor plan",
    },
    Other: { src: "/images/hvac.webp", alt: "MEP design drawing" },
  };

/** Square crop URL for a Sanity image asset id ("image-<hash>-WxH-ext"). */
function sanityImageUrl(assetId: string) {
  const file = assetId.replace(/^image-/, "").replace(/-(\w+)$/, ".$1");
  return `${SANITY_BASE_URL}${file}?w=600&h=600&fit=crop&auto=format`;
}

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
  image: DISCIPLINE_IMAGE[project.disciplineScope],
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
    image: project.image?.id
      ? {
          src: sanityImageUrl(project.image.id),
          alt: project.title ?? "Project",
        }
      : undefined,
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

  return (
    <>
      <ProjectStack
        categories={categories}
        projects={rows}
        subtitle="The method, applied to real buildings."
        title="Projects"
      />

      <PageCta />
    </>
  );
}
