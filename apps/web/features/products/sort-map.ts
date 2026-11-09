import type { Product } from "@repo/services/commerce/commerce-types";
import { useQueryState } from "nuqs";
// Parsers from nuqs/server: this module is also imported by server pages.
import { parseAsStringLiteral } from "nuqs/server";

// Page size for every product listing. The server prerenders the first page
// with it, so the client's first-page query key matches and hydrates.
export const PRODUCT_PAGE_SIZE = 12;

export type SortKey = Extract<keyof Product, "price" | "rating" | "title">;
export type SortEntry = {
  label: string;
  sortBy: SortKey;
  order: "asc" | "desc";
};

export const SORT_OPTIONS = {
  "price-asc": { label: "Price: Low to High", sortBy: "price", order: "asc" },
  "price-desc": { label: "Price: High to Low", sortBy: "price", order: "desc" },
  "rating-desc": {
    label: "Rating: High to Low",
    sortBy: "rating",
    order: "desc",
  },
  "title-asc": { label: "Name: A to Z", sortBy: "title", order: "asc" },
} as const satisfies Record<string, SortEntry>;

// Object.keys widens to string[]; the keys are exactly SORT_OPTIONS' own.
const SORT_PARAMS = Object.keys(SORT_OPTIONS) as (keyof typeof SORT_OPTIONS)[];

// The `sort` URL param. Unknown values parse to null, i.e. the default order.
export const sortParser = parseAsStringLiteral(SORT_PARAMS);

export function useSort() {
  return useQueryState("sort", sortParser);
}
