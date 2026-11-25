import Link from "next/link";
import { ButtonZoomIn } from "@/components/buttonzoomin";
import { SanityImage } from "@/components/elements/sanity-image";
import type { Blog } from "@/types";

type HomeBlogSectionProps = {
  blogs: Blog[];
  title?: string;
  pretitle?: string;
};

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

/** Blueprint-grid placeholder so cards without an image keep the same height. */
function ImagePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[#dedcff]/40 bg-[linear-gradient(rgba(38,28,193,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(38,28,193,0.12)_1px,transparent_1px)] [background-size:16px_16px]"
    />
  );
}

function HomeBlogCard({ blog }: { blog: Blog }) {
  const { title, description, slug, image, publishedAt } = blog;
  const date = formatDate(publishedAt);
  const heading = title?.trim() || "Untitled article";

  return (
    <article className="group relative flex min-w-0 flex-col border-[#121212]/15 border-r border-b bg-[#f7fbff]">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-[#121212]/15 border-b">
        {image?.id ? (
          <SanityImage
            alt={image.alt && image.alt !== "untitled" ? image.alt : heading}
            className="absolute inset-0 h-full w-full rounded-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            height={500}
            image={image}
            mode="cover"
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            width={800}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
        {date ? (
          <time
            className="font-bold font-metropolis text-[#5b5a8a] text-[0.7rem] uppercase tracking-[0.18em]"
            dateTime={publishedAt ?? undefined}
          >
            {date}
          </time>
        ) : null}

        <h3 className="m-0 line-clamp-3 break-words font-extrabold font-metropolis text-[#121212] text-[1.15rem] leading-[1.25] tracking-[-0.02em] transition-colors duration-200 group-hover:text-[#261CC1] lg:text-[1.25rem]">
          {/* Stretched link: the whole card is one 44px+ tap target */}
          <Link
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#261CC1]"
            href={slug ?? "/blog"}
          >
            {heading}
          </Link>
        </h3>

        {description ? (
          <p className="m-0 line-clamp-3 break-words font-metropolis text-[#121212]/75 text-[0.9rem] leading-[1.6]">
            {description}
          </p>
        ) : null}

        <span
          aria-hidden="true"
          className="mt-auto pt-2 font-bold font-mosvita text-[#261CC1] text-[0.75rem] uppercase tracking-[0.12em]"
        >
          Read article →
        </span>
      </div>
    </article>
  );
}

/**
 * Latest posts from Sanity. Renders nothing when there are no posts, so the
 * home page layout is unaffected by an empty dataset.
 *
 * Columns: 1 (mobile) → 2 (md) → 3 (lg) → 4 (xl, only with 4+ posts).
 */
export function HomeBlogSection({
  blogs,
  title = "Insights from our engineers",
  pretitle = "Blog",
}: HomeBlogSectionProps) {
  const posts = blogs.filter((blog) => Boolean(blog?.slug));
  if (posts.length === 0) return null;

  const gridCols =
    posts.length >= 4
      ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      aria-labelledby="home-blog-heading"
      className="relative w-full border-[#121212]/15 border-b bg-[#f7fbff] text-[#121212]"
    >
      {/* Header row */}
      <div className="grid grid-cols-1 items-end gap-8 px-6 pt-14 pb-10 sm:px-10 md:grid-cols-[minmax(0,1fr)_auto] lg:px-12 lg:pt-20 lg:pb-14">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-bold font-metropolis text-[#261CC1] text-[0.75rem] uppercase tracking-[0.22em] lg:text-[0.8rem]">
              {pretitle}
            </span>
            <span
              aria-hidden="true"
              className="inline-block size-1.5 bg-[#121212]"
            />
          </div>
          <h2
            className="m-0 mt-5 max-w-[640px] font-extrabold font-metropolis text-[#121212] text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] tracking-[-0.035em]"
            id="home-blog-heading"
          >
            {title}
          </h2>
        </div>
        <div>
          <ButtonZoomIn href="/blog" label="View all articles" />
        </div>
      </div>

      {/* Cards — framed technical grid */}
      <div className="px-6 pb-14 sm:px-10 lg:px-12 lg:pb-20">
        <div
          className={`grid grid-cols-1 border-[#121212]/15 border-t border-l ${gridCols}`}
        >
          {posts.map((blog) => (
            <HomeBlogCard blog={blog} key={blog._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
