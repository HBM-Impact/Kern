import { getHoursInSeconds } from "@repo/utils/getTime";
import type { FetcherArgs } from "../../serviceTypes";
import { commerceClient } from "../commerceClient";
import type { Product, ProductResponse } from "../commerceTypes";

type Args = FetcherArgs & {
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
      ...(signal !== undefined && { signal }),
      searchParams: {
        skip,
        limit,
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      },
      next: {
        revalidate: getHoursInSeconds(24),
        tags: ["products"],
      },
    })
    .json<ProductResponse>();
}
