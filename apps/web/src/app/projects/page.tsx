import { sanityFetch } from "@workspace/sanity/live";
import { queryAllProjects } from "@workspace/sanity/query";
import Link from "next/link";
import { SanityImage } from "@/components/elements/sanity-image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | PKM Consultants",
  description:
    "Explore our portfolio of client projects spanning digital transformation, strategic planning, and operational excellence.",
};

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch({ query: queryAllProjects });

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 font-medium text-primary text-sm uppercase tracking-widest">
            Our Work
          </p>
          <h1 className="font-bold text-4xl md:text-6xl">
            Projects &amp; Case Studies
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            A selection of engagements where we've helped clients navigate
            complexity and achieve measurable results.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-20">
        {!projects || projects.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">
            <p className="text-lg">No projects published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${String(project.slug ?? "").split("/").pop()}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="aspect-video overflow-hidden bg-muted">
                  {project.image?.id ? (
                    <SanityImage
                      image={project.image}
                      alt={project.title ?? "Project image"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={800}
                      height={450}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                      <span className="text-4xl">🏗️</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Category badge */}
                  {project.category && (
                    <span className="mb-3 inline-block self-start rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-xs">
                      {project.category}
                    </span>
                  )}

                  <h2 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>

                  {project.description && (
                    <p className="mt-3 line-clamp-3 text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-5">
                    {project.client && (
                      <span className="text-muted-foreground text-sm">
                        {project.client}
                      </span>
                    )}
                    {project.completedYear && (
                      <span className="text-muted-foreground text-sm">
                        {project.completedYear}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded border px-2 py-0.5 text-muted-foreground text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-muted-foreground text-xs">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
