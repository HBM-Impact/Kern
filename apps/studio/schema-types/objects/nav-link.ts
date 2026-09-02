import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

// Mirrors the internal routes in apps/web/i18n/routing.ts. The web app
// re-validates every value against its own pathname map, so a route that is
// removed there is dropped from the nav rather than rendered as a dead link.
const ROUTES = [
  "/",
  "/products",
  "/products/search",
  "/favorites",
  "/cart",
] as const;

export const navLink = defineType({
  name: "navLink",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "route",
      type: "string",
      options: { list: [...ROUTES] },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "route" } },
});
