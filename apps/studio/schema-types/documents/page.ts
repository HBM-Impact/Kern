import { DocumentIcon } from "@sanity/icons/Document";
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      description: 'The page with the slug "home" is served as the site index.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "Shown under the title and used as the meta description.",
      validation: (rule) =>
        rule.max(160).warning("Keep under 160 characters for search results."),
    }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "modules", type: "modules" }),
  ],
});
