"use client";

import type { QueryBlogIndexPageDataResult } from "@workspace/sanity/types";

import { BlogGrid, FeaturedBlogPost } from "@/components/blocks/blog-grid";
import { PageCta } from "@/components/blocks/page-cta";
import { PageHeroCrosshair } from "@/components/blocks/page-hero-crosshair";
import { SectionLabel } from "@/components/blocks/section-label";
import { BlogPagination } from "@/components/blog-pagination";
import { PageBuilder } from "@/components/pagebuilder";
import { useBlogSearch } from "@/hooks/use-blog-search";
import type { Blog } from "@/types";
import type { PaginationMetadata } from "@/utils";

type BlogPageContentProps = {
  indexPageData: NonNullable<QueryBlogIndexPageDataResult>;
  blogs: Blog[];
  paginationMetadata: PaginationMetadata;
};

export function BlogPageContent({
  indexPageData,
  blogs,
  paginationMetadata,
}: BlogPageContentProps) {
  const {
    title,
    description,
    pageBuilder = [],
    _id,
    _type,
    featuredBlogsCount,
    displayFeaturedBlogs,
  } = indexPageData;

  const { searchQuery, setSearchQuery, results, isSearching, hasQuery, error } =
    useBlogSearch();

  const validFeaturedBlogsCount = featuredBlogsCount
    ? Number.parseInt(featuredBlogsCount, 10)
    : 0;
  const shouldDisplayFeaturedBlogs =
    displayFeaturedBlogs &&
    validFeaturedBlogsCount > 0 &&
    paginationMetadata.currentPage === 1 &&
    !hasQuery;
  const featuredBlogs = shouldDisplayFeaturedBlogs
    ? blogs.slice(0, validFeaturedBlogsCount)
    : [];
  const remainingBlogs = shouldDisplayFeaturedBlogs
    ? blogs.slice(validFeaturedBlogsCount)
    : blogs;

  return (
    <>
      <PageHeroCrosshair
        eyebrow="Blog"
        intro={description ?? undefined}
        title={title ?? "Insights from our engineers"}
      />

      <section className="border-[#121212]/15 border-b bg-[#f7fbff] text-[#121212]">
        {/* Toolbar: label + search */}
        <div className="flex flex-col gap-6 px-6 pt-10 pb-8 sm:px-10 md:flex-row md:items-end md:justify-between lg:px-12">
          <SectionLabel>{hasQuery ? "Search" : "Latest articles"}</SectionLabel>
          <div className="relative w-full md:max-w-[420px]">
            <label className="sr-only" htmlFor="blog-search">
              Search articles
            </label>
            <input
              className="w-full border-[#121212]/25 border-b bg-transparent py-3 pr-10 text-[#121212] text-[1.05rem] outline-none transition-colors placeholder:text-[#121212]/40 focus:border-[#261CC1]"
              id="blog-search"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search articles"
              type="search"
              value={searchQuery}
            />
            {searchQuery ? (
              <button
                aria-label="Clear search"
                className="absolute top-1/2 right-0 inline-flex size-11 -translate-y-1/2 items-center justify-center text-[#121212]/60 hover:text-[#261CC1]"
                onClick={() => setSearchQuery("")}
                type="button"
              >
                ×
              </button>
            ) : null}
          </div>
        </div>

        <div className="px-6 pb-14 sm:px-10 lg:px-12 lg:pb-20">
          {hasQuery ? (
            <div aria-live="polite">
              <p className="m-0 mb-6 text-[#5b5a8a] text-[0.95rem]">
                {isSearching
                  ? "Searching…"
                  : error
                    ? "Search failed. Please try again."
                    : `${results.length} article${results.length === 1 ? "" : "s"} for “${searchQuery}”`}
              </p>
              {!(isSearching || error) && results.length > 0 ? (
                <BlogGrid blogs={results} />
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {featuredBlogs.map((blog) => (
                <FeaturedBlogPost blog={blog} key={blog._id} />
              ))}
              {remainingBlogs.length > 0 ? (
                <BlogGrid blogs={remainingBlogs} />
              ) : (
                <p className="m-0 text-[#555555]">No articles published yet.</p>
              )}
              {paginationMetadata?.totalPages > 1 ? (
                <BlogPagination
                  className="flex justify-center"
                  currentPage={paginationMetadata.currentPage}
                  hasNextPage={paginationMetadata.hasNextPage}
                  hasPreviousPage={paginationMetadata.hasPreviousPage}
                  totalPages={paginationMetadata.totalPages}
                />
              ) : null}
            </div>
          )}
        </div>
      </section>

      {pageBuilder && pageBuilder.length > 0 ? (
        <PageBuilder id={_id} pageBuilder={pageBuilder} type={_type} />
      ) : null}

      <PageCta />
    </>
  );
}
