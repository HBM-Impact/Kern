import type { Product } from "@repo/services/commerce/commerce-types";

export const CATEGORY_PAGE_SIZE = 12;

export type SortKey = Extract<keyof Product, "price" | "rating" | "title">;
export type SortEntry = {
  label: string;
  sortBy: SortKey;
  order: "asc" | "desc";
};

// Keys are read from the `sort` URL param, so `string` is the honest key type —
// `noUncheckedIndexedAccess` then yields `SortEntry | undefined` on lookup.
export const SORT_OPTIONS: Record<string, SortEntry> = {
  "price-asc": { label: "Price: Low to High", sortBy: "price", order: "asc" },
  "price-desc": { label: "Price: High to Low", sortBy: "price", order: "desc" },
  "rating-desc": {
    label: "Rating: High to Low",
    sortBy: "rating",
    order: "desc",
  },
  "title-asc": { label: "Name: A to Z", sortBy: "title", order: "asc" },
};
