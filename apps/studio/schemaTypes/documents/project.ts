import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { BriefcaseIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

import { documentSlugField, imageWithAltField } from "@/schemaTypes/common";
import { GROUP, GROUPS } from "@/utils/constant";
import { ogFields } from "@/utils/og-fields";
import { seoFields } from "@/utils/seo-fields";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: BriefcaseIcon,
  groups: GROUPS,
  orderings: [orderRankOrdering],
  description:
    "A client project or portfolio item. Add title, category, description and content.",
  fields: [
    orderRankField({ type: "project" }),
    defineField({
      name: "title",
      type: "string",
      title: "Project Title",
      description: "The name of the project",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required().error("A project title is required"),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      description: "e.g. Digital Transformation, Strategy, Operations",
      group: GROUP.MAIN_CONTENT,
      options: {
        list: [
          { title: "Digital Transformation", value: "Digital Transformation" },
          { title: "Strategic Planning", value: "Strategic Planning" },
          { title: "Operations", value: "Operations" },
          { title: "Finance", value: "Finance" },
          { title: "HR & Talent", value: "HR & Talent" },
          { title: "Technology", value: "Technology" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "client",
      type: "string",
      title: "Client Name",
      description: "The name of the client (optional)",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "completedYear",
      type: "number",
      title: "Year Completed",
      group: GROUP.MAIN_CONTENT,
    }),
    documentSlugField("project", {
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Short Description",
      rows: 3,
      description: "A short summary shown on the project listing page",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.max(250).warning("Keep under 250 characters for best results"),
    }),
    imageWithAltField({
      title: "Cover Image",
      description: "The main image shown on the project card and detail page",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      description: "Keywords or technologies used in this project",
      of: [defineArrayMember({ type: "string" })],
      group: GROUP.MAIN_CONTENT,
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "richText",
      type: "richText",
      title: "Project Details",
      description: "Full description, process, and outcomes for the project",
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      category: "category",
      client: "client",
      slug: "slug.current",
    },
    prepare: ({ title, media, category, client, slug }) => ({
      title: title || "Untitled Project",
      media,
      subtitle: `${category ?? "Uncategorized"} | ${client ?? "No client"} | 🔗 ${slug ?? "no-slug"}`,
    }),
  },
});
