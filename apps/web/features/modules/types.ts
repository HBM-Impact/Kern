import type { StegaBranded } from "next-sanity";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";

// `page` is the only document type with a modules field, so its query result is
// the source of truth for the module union. StegaBranded because the modules
// are read through sanityFetch, which encodes edit metadata into every string —
// values used as hrefs or API params have to be stegaClean'd first.
type Modules = NonNullable<
  NonNullable<StegaBranded<PAGE_QUERY_RESULT>>["modules"]
>;

export type Module = Modules[number];
export type ModuleOf<T extends Module["_type"]> = Extract<Module, { _type: T }>;
