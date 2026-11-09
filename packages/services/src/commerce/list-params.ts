import type { Product } from "./commerce-types";

export type ListArgs = {
  signal?: AbortSignal;
  skip: number;
  limit: number;
  sortBy?: keyof Product;
  order?: "asc" | "desc";
};

// dummyjson's paging/sorting query, shared by every list endpoint.
export function listParams({ skip, limit, sortBy, order }: ListArgs) {
  return { skip, limit, ...(sortBy && { sortBy }), ...(order && { order }) };
}
