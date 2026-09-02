import { defineArrayMember, defineType } from "sanity";

// Plain blocks only. Inline images or embeds also need custom PortableText
// components on the web side, so add both together when an editor asks.
export const blockContent = defineType({
  name: "blockContent",
  title: "Content",
  type: "array",
  of: [defineArrayMember({ type: "block" })],
});
