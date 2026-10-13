import { Logger } from "@workspace/logger";
import { client } from "@workspace/sanity/client";
import { sanityFetch } from "@workspace/sanity/live";
import { queryProjectBySlug, queryProjectPaths } from "@workspace/sanity/query";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { SanityImage } from "@/components/elements/sanity-image";
import { RichText } from "@/components/elements/rich-text";
import type { Metadata } from "next";

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
    title: data?.title
      ? `${data.title} | PKM Consultants`
      : "Project | PKM Consultants",
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

  return (
    <main className="min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-slate-950 pb-16 pt-12 text-white">
        <div className="container mx-auto px-4">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-slate-400 text-sm transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          {category && (
            <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 font-medium text-primary text-xs uppercase tracking-widest">
              {category}
            </span>
          )}

          <h1 className="mt-2 font-bold text-4xl md:text-5xl">{title}</h1>

          {description && (
            <p className="mt-5 max-w-2xl text-lg text-slate-400">{description}</p>
          )}

          {/* Meta pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            {clientName && (
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300">
                <User className="h-4 w-4 text-primary" />
                {clientName}
              </div>
            )}
            {completedYear && (
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300">
                <Calendar className="h-4 w-4 text-primary" />
                {completedYear}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cover image — overlaps hero */}
      {image?.id && (
        <div className="container mx-auto px-4">
          <div className="-mt-8 overflow-hidden rounded-2xl shadow-2xl">
            <SanityImage
              image={image}
              alt={title ?? "Project image"}
              className="h-auto max-h-[500px] w-full object-cover"
              width={1200}
              height={600}
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          <article>
            {richText ? (
              <RichText richText={richText} />
            ) : (
              <p className="text-muted-foreground">
                No detailed write-up available yet for this project.
              </p>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {tags && tags.length > 0 && (
              <div className="rounded-2xl border p-6">
                <div className="mb-4 flex items-center gap-2 font-semibold text-sm">
                  <Tag className="h-4 w-4 text-primary" />
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-primary text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border bg-slate-50 p-6 dark:bg-slate-900">
              <p className="font-semibold text-sm">Start a similar project?</p>
              <p className="mt-2 text-muted-foreground text-sm">
                Let's talk about how we can help your business achieve similar
                results.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
              >
                Get in touch
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
