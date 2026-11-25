import { Logger } from "@workspace/logger";
import { client } from "@workspace/sanity/client";
import { sanityFetch } from "@workspace/sanity/live";
import { queryBlogPaths, queryBlogSlugPageData } from "@workspace/sanity/query";
import { notFound } from "next/navigation";

import { RichText } from "@/components/elements/rich-text";
import { SanityImage } from "@/components/elements/sanity-image";
import { TableOfContent } from "@/components/elements/table-of-content";
import { ArticleJsonLd } from "@/components/json-ld";
import { type HeroMeta, PageHero } from "@/components/blocks/page-hero";
import { PageCta } from "@/components/blocks/page-cta";
import { SectionLabel } from "@/components/blocks/section-label";
import { LineButton } from "@/components/blocks/line-button";
import { getSEOMetadata } from "@/lib/seo";

const logger = new Logger("BlogSlug");

async function fetchBlogSlugPageData(slug: string) {
  return await sanityFetch({
    query: queryBlogSlugPageData,
    params: { slug },
  });
}

async function fetchBlogPaths() {
  try {
    const slugs = await client.fetch(queryBlogPaths);

    // If no slugs found, return empty array to prevent build errors
    if (!Array.isArray(slugs) || slugs.length === 0) {
      return [];
    }

    const paths: { slug: string }[] = [];
    for (const slug of slugs) {
      if (!slug) {
        continue;
      }
      const [, , path] = slug.split("/");
      if (path) {
        paths.push({ slug: path });
      }
    }
    return paths;
  } catch (error) {
    logger.error("Error fetching blog paths", error);
    // Return empty array to allow build to continue
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugString = `/blog/${slug}`;
  const { data } = await fetchBlogSlugPageData(slugString);
  return getSEOMetadata({
    title: data?.title ?? data?.seoTitle,
    description: data?.description ?? data?.seoDescription,
    slug: slugString,
    contentId: data?._id,
    contentType: data?._type,
    pageType: "article",
  });
}

export async function generateStaticParams() {
  const paths = await fetchBlogPaths();
  return paths;
}

// Allow dynamic params for paths not generated at build time
export const dynamicParams = true;

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugString = `/blog/${slug}`;
  const { data } = await fetchBlogSlugPageData(slugString);
  if (!data) {
    return notFound();
  }
  const { title, description, image, richText, publishedAt, authors } =
    data ?? {};

  const published = publishedAt
    ? new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(publishedAt))
    : null;

  const meta: HeroMeta[] = [
    ...(published ? [{ label: "Published", value: published }] : []),
    ...(authors?.name ? [{ label: "Author", value: authors.name }] : []),
    ...(authors?.position ? [{ label: "Role", value: authors.position }] : []),
  ];

  return (
    <>
      <ArticleJsonLd article={data} />
      <PageHero
        eyebrow="Blog"
        intro={description ?? undefined}
        meta={meta.length > 0 ? meta : undefined}
        title={title ?? "Article"}
      />

      {image?.id ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-[#121212]/15 border-b bg-[#f7fbff] sm:aspect-[21/9]">
          <SanityImage
            alt={
              image.alt && image.alt !== "untitled"
                ? image.alt
                : (title ?? "Article image")
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
          <aside className="border-[#121212]/15 lg:border-r">
            <div className="flex flex-col gap-8 px-6 pt-12 pb-2 sm:px-10 lg:sticky lg:top-24 lg:px-10 lg:py-16">
              <SectionLabel>In this article</SectionLabel>
              <div className="hidden lg:block">
                <TableOfContent richText={richText ?? []} />
              </div>
              <div className="hidden lg:block">
                <LineButton href="/blog" label="All articles" />
              </div>
            </div>
          </aside>
          <article className="max-w-[760px] px-6 pb-14 sm:px-10 lg:px-12 lg:py-16">
            <RichText richText={richText} />
            <div className="mt-12 lg:hidden">
              <LineButton href="/blog" label="All articles" />
            </div>
          </article>
        </div>
      </section>

      <PageCta />
    </>
  );
}
