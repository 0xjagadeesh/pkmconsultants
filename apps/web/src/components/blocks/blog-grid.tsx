import Link from "next/link";
import { SanityImage } from "@/components/elements/sanity-image";
import type { Blog } from "@/types";

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : DATE_FORMAT.format(date);
}

/** Post card on the gridline frame: image, date, title, excerpt. */
export function PostCard({ blog }: { blog: Blog }) {
  const { title, description, slug, image, publishedAt } = blog;
  if (!slug) return null;
  const heading = title?.trim() || "Untitled article";
  const date = formatDate(publishedAt);

  return (
    <article className="group relative flex min-w-0 flex-col border-[#121212]/15 border-r border-b bg-[#f7fbff]">
      <div className="relative aspect-[16/10] overflow-hidden border-[#121212]/15 border-b bg-[#dedcff]/40">
        {image?.id ? (
          <SanityImage
            alt={image.alt && image.alt !== "untitled" ? image.alt : heading}
            className="absolute inset-0 h-full w-full rounded-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            height={500}
            image={image}
            mode="cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            width={800}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgba(38,28,193,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(38,28,193,0.12)_1px,transparent_1px)] bg-[length:16px_16px]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 lg:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold font-mosvita text-[#5b5a8a] text-[0.7rem] uppercase tracking-[0.18em]">
            {date ?? "Article"}
          </span>
          <span
            aria-hidden="true"
            className="inline-block size-1.5 bg-[#121212]"
          />
        </div>
        <h3 className="m-0 line-clamp-3 font-extrabold font-metropolis text-[#121212] text-[1.15rem] leading-[1.25] tracking-[-0.02em] [overflow-wrap:anywhere] transition-colors group-hover:text-[#261CC1] lg:text-[1.3rem]">
          <Link
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#261CC1]"
            href={slug}
          >
            {heading}
          </Link>
        </h3>
        {description ? (
          <p className="m-0 line-clamp-3 text-[#555555] text-[0.92rem] leading-[1.6]">
            {description}
          </p>
        ) : null}
        <span
          aria-hidden="true"
          className="mt-auto pt-3 font-bold font-mosvita text-[#261CC1] text-[0.75rem] uppercase tracking-[0.12em]"
        >
          Read article →
        </span>
      </div>
    </article>
  );
}

/** Framed technical grid of post cards: 1 → 2 → 3 columns. */
export function BlogGrid({ blogs }: { blogs: Blog[] }) {
  const posts = blogs.filter((blog) => Boolean(blog?.slug));
  if (posts.length === 0) return null;
  return (
    <div className="grid grid-cols-1 border-[#121212]/15 border-t border-l md:grid-cols-2 lg:grid-cols-3">
      {posts.map((blog) => (
        <PostCard blog={blog} key={blog._id} />
      ))}
    </div>
  );
}

/** Wide featured post: image on one side, text on the other. */
export function FeaturedBlogPost({ blog }: { blog: Blog }) {
  const { title, description, slug, image, publishedAt } = blog;
  if (!slug) return null;
  const heading = title?.trim() || "Untitled article";
  const date = formatDate(publishedAt);

  return (
    <article className="group relative grid grid-cols-1 border border-[#121212]/15 bg-[#f7fbff] lg:grid-cols-2">
      <div className="relative aspect-[16/10] overflow-hidden border-[#121212]/15 border-b bg-[#dedcff]/40 lg:aspect-auto lg:min-h-[420px] lg:border-r lg:border-b-0">
        {image?.id ? (
          <SanityImage
            alt={image.alt && image.alt !== "untitled" ? image.alt : heading}
            className="absolute inset-0 h-full w-full rounded-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            height={700}
            image={image}
            mode="cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={1100}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-5 p-6 sm:p-10 lg:justify-end lg:p-12">
        <p className="m-0 font-bold font-mosvita text-[#261CC1] text-[0.72rem] uppercase tracking-[0.2em]">
          Featured{date ? ` · ${date}` : ""}
        </p>
        <h2 className="m-0 font-extrabold font-metropolis text-[#121212] text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.03em] transition-colors group-hover:text-[#261CC1]">
          <Link
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#261CC1]"
            href={slug}
          >
            {heading}
          </Link>
        </h2>
        {description ? (
          <p className="m-0 line-clamp-4 max-w-[52ch] text-[#555555] text-[1rem] leading-[1.7]">
            {description}
          </p>
        ) : null}
        <span
          aria-hidden="true"
          className="font-bold font-mosvita text-[#261CC1] text-[0.78rem] uppercase tracking-[0.12em]"
        >
          Read article →
        </span>
      </div>
    </article>
  );
}
