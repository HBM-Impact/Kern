import { defineArrayMember, defineType } from "sanity";

// Reusable page composition: any document that should be assembled from
// modules gets a field of this type — the home page and every standard page.
export const modules = defineType({
  name: "modules",
  title: "Modules",
  type: "array",
  of: [
    defineArrayMember({ type: "heroModule" }),
    defineArrayMember({ type: "productCarouselModule" }),
  ],
});
