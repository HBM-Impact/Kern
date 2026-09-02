import { StarIcon } from "@sanity/icons/Star";
import { defineField, defineType } from "sanity";

export const heroModule = defineType({
  name: "heroModule",
  title: "Hero",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subheading", type: "text", rows: 2 }),
    defineField({ name: "cta", title: "Call to action", type: "navLink" }),
  ],
  preview: { select: { title: "heading", subtitle: "subheading" } },
});
