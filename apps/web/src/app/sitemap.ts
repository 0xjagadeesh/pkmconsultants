import { client } from "@workspace/sanity/client";
import { querySitemapData } from "@workspace/sanity/query";
import type { QuerySitemapDataResult } from "@workspace/sanity/types";
import type { MetadataRoute } from "next";

import { SCOPE_OF_SERVICES } from "@/data/pkm-portfolio";
import { getBaseUrl } from "@/utils";

type Page = QuerySitemapDataResult["slugPages"][number];

const baseUrl = getBaseUrl();

/** Code-defined routes that are not Sanity pages. */
const STATIC_PATHS = [
  "/about",
  "/how-we-work",
  "/services",
  ...SCOPE_OF_SERVICES.map((service) => `/services/${service.slug}`),
  "/projects",
  "/contact",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { slugPages, blogPages } = await client.fetch(querySitemapData);
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...STATIC_PATHS.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path.startsWith("/services")
        ? 0.9
        : ["/privacy", "/terms"].includes(path)
          ? 0.3
          : 0.7,
    })),
    ...slugPages.map((page: Page) => ({
      url: `${baseUrl}${page.slug}`,
      lastModified: new Date(page.lastModified ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogPages.map((page: Page) => ({
      url: `${baseUrl}${page.slug}`,
      lastModified: new Date(page.lastModified ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
