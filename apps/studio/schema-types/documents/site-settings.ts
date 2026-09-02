import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "headerNav",
      title: "Header navigation",
      type: "array",
      of: [defineArrayMember({ type: "navLink" })],
    }),
    defineField({
      name: "footerContact",
      title: "Footer contact links",
      type: "array",
      of: [defineArrayMember({ type: "externalLink" })],
    }),
    defineField({
      name: "footerStack",
      title: 'Footer "built with" links',
      type: "array",
      of: [defineArrayMember({ type: "externalLink" })],
    }),
    defineField({ name: "copyrightHolder", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
