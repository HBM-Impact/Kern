import { getHoursInSeconds } from "@repo/utils/getTime";
import type { FetcherArgs } from "../../serviceTypes";
import { commerceClient } from "../commerceClient";
import type { Product, ProductResponse } from "../commerceTypes";

type Args = FetcherArgs & {
  skip: number;
  limit: number;
  sortBy?: keyof Product;
  order?: "asc" | "desc";
  category: string;
};

export async function getProductByCategory({
  category,
  signal,
  skip,
  limit,
  sortBy,
  order,
}: Args) {
  return commerceClient
    .get(`products/category/${category}`, {
      ...(signal !== undefined && { signal }),
      searchParams: {
        skip,
        limit,
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      },
      next: {
        revalidate: getHoursInSeconds(24),
        tags: [`category-${category}`, "products"],
      },
    })
    .json<ProductResponse>();
}
