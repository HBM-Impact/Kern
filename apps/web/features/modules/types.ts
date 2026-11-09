import type { getPage } from "@/lib/sanity/content";

// The module union as getPage returns it: display text keeps its stega edit
// metadata, while hrefs and API params arrive already cleaned.
export type Module = NonNullable<
  Awaited<ReturnType<typeof getPage>>
>["modules"][number];
export type ModuleOf<T extends Module["_type"]> = Extract<Module, { _type: T }>;
