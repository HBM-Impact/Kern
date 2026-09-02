import { DocumentsIcon } from "@sanity/icons/Documents";
import { defineField, defineType } from "sanity";

// Title and description for the routes the app owns in code. These are not
// `page` documents: they have no slug and no body, only the copy that would
// otherwise be hardcoded in the route file. "/404" previews at any unknown
// path, so it needs no special handling.
const ROUTES = [
  "/products",
  "/products/search",
  "/favorites",
  "/cart",
  "/404",
] as const;

export const routeMeta = defineType({
  name: "routeMeta",
  title: "Route page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "route",
      type: "string",
      options: { list: [...ROUTES] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      description: "Used as the heading, the breadcrumb label and the <title>.",
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
  ],
  preview: { select: { title: "title", subtitle: "route" } },
});
