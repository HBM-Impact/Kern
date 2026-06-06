import { hoursToSeconds } from "@repo/utils/time";
import type { FetcherArgs } from "../../service-types";
import { commerceClient } from "../commerce-client";
import type { Product, ProductResponse } from "../commerce-types";

type Args = FetcherArgs & {
  skip: number;
  limit: number;
  query: string;
  sortBy?: keyof Product;
  order?: "asc" | "desc";
};

export async function getProductsByQuery({
  signal,
  skip,
  limit,
  query,
  sortBy,
  order,
}: Args) {
  return commerceClient
    .get("products/search", {
      ...(signal !== undefined && { signal }),
      searchParams: {
        skip,
        limit,
        q: query,
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      },
      next: {
        revalidate: hoursToSeconds(24),
        tags: [`search-${query}`, "products"],
      },
    })
    .json<ProductResponse>();
}
