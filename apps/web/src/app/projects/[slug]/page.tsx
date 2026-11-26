import { Logger } from "@workspace/logger";
import { client } from "@workspace/sanity/client";
import { sanityFetch } from "@workspace/sanity/live";
import { queryProjectBySlug, queryProjectPaths } from "@workspace/sanity/query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LineButton } from "@/components/blocks/line-button";
import { PageCta } from "@/components/blocks/page-cta";
import { type HeroMeta, PageHero } from "@/components/blocks/page-hero";
import { SectionLabel } from "@/components/blocks/section-label";
import { RichText } from "@/components/elements/rich-text";
import { SanityImage } from "@/components/elements/sanity-image";

const logger = new Logger("ProjectSlug");

async function fetchProjectPaths() {
  try {
    const slugs = await client.fetch(queryProjectPaths);
    if (!Array.isArray(slugs) || slugs.length === 0) return [];
    const paths: { slug: string }[] = [];
    for (const s of slugs) {
      if (!s) continue;
      // slug.current is stored as "/projects/my-project"
      const [, , path] = s.split("/");
      if (path) paths.push({ slug: path });
    }
    return paths;
  } catch (error) {
    logger.error("Error fetching project paths", error);
    return [];
  }
}

export async function generateStaticParams() {
  return fetchProjectPaths();
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: queryProjectBySlug,
    params: { slug: `/projects/${slug}` },
  });
  return {
    // The root layout's title template appends "| PKM Consultants"
    title: data?.title ?? "Project",
    description: data?.description ?? "",
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: queryProjectBySlug,
    params: { slug: `/projects/${slug}` },
  });

  if (!project) return notFound();

  const {
    title,
    category,
    client: clientName,
    completedYear,
    description,
    image,
    tags,
    richText,
  } = project;

  const meta: HeroMeta[] = [
    { label: "Type", value: category ?? "MEPF design" },
    { label: "Year", value: completedYear ? String(completedYear) : "—" },
    { label: "Client", value: clientName ?? "—" },
    {
      label: "Scope",
      value: tags && tags.length > 0 ? tags.join(", ") : "MEPF design",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Project"
        intro={description ?? undefined}
        meta={meta}
        title={title ?? "Project"}
      />

      {image?.id ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-[#121212]/15 border-b bg-[#f7fbff] sm:aspect-[21/9]">
          <SanityImage
            alt={
              image.alt && image.alt !== "untitled"
                ? image.alt
                : (title ?? "Project image")
            }
            className="absolute inset-0 h-full w-full rounded-none object-cover"
            height={900}
            image={image}
            loading="eager"
            mode="cover"
            sizes="100vw"
            width={2100}
          />
        </div>
      ) : null}

      <section className="border-[#121212]/15 border-b bg-[#f7fbff] text-[#121212]">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)]">
          <div className="border-[#121212]/15 lg:border-r">
            <div className="flex flex-col gap-8 px-6 pt-12 pb-6 sm:px-10 lg:sticky lg:top-24 lg:px-10 lg:py-16">
              <SectionLabel>About the project</SectionLabel>
              <div className="hidden lg:block">
                <LineButton href="/projects" label="All projects" />
              </div>
            </div>
          </div>
          <article className="max-w-[760px] px-6 pb-14 sm:px-10 lg:px-12 lg:py-16">
            {richText && richText.length > 0 ? (
              <RichText richText={richText} />
            ) : (
              <p className="m-0 text-[#555555] text-[1.05rem] leading-[1.7]">
                A detailed write-up for this project is coming soon.
              </p>
            )}
            <div className="mt-12 lg:hidden">
              <LineButton href="/projects" label="All projects" />
            </div>
          </article>
        </div>
      </section>

      <PageCta />
    </>
  );
}
