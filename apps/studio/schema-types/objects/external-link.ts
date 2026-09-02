import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { defineField, defineType } from "sanity";

export const externalLink = defineType({
  name: "externalLink",
  title: "External link",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["http", "https", "mailto"] })
          .error("Must be an http(s) or mailto URL."),
    }),
  ],
  preview: { select: { title: "label", subtitle: "url" } },
});
