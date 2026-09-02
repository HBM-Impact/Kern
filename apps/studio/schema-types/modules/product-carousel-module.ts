import { PackageIcon } from "@sanity/icons/Package";
import { defineField, defineType } from "sanity";

export const productCarouselModule = defineType({
  name: "productCarouselModule",
  title: "Product carousel",
  type: "object",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "string" }),
    defineField({
      name: "category",
      type: "string",
      description: "Commerce category slug, e.g. smartphones.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "limit",
      title: "Number of products",
      type: "number",
      initialValue: 8,
      validation: (rule) => rule.required().integer().min(1).max(24),
    }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
