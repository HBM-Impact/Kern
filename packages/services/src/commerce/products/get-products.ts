import { hoursToSeconds } from "@repo/utils/time";
import { commerceClient } from "../commerce-client";
import type { Product, ProductResponse } from "../commerce-types";

type Args = {
  signal?: AbortSignal;
  skip: number;
  limit: number;
  sortBy?: keyof Product;
  order?: "asc" | "desc";
};

export async function getProducts({
  signal,
  skip,
  limit,
  sortBy,
  order,
}: Args) {
  return commerceClient
    .get("products", {
      signal,
      searchParams: {
        skip,
        limit,
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      },
      next: {
        revalidate: hoursToSeconds(24),
        tags: ["products"],
      },
    })
    .json<ProductResponse>();
}
