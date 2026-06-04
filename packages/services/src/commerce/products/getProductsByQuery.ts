import { getHoursInSeconds } from "@repo/utils/getTime";
import type { FetcherArgs } from "../../serviceTypes";
import { commerceClient } from "../commerceClient";
import type { ProductResponse } from "../commerceTypes";

type Args = FetcherArgs & {
  skip: number;
  limit: number;
  query: string;
};

export async function getProductsByQuery({ signal, skip, limit, query }: Args) {
  return commerceClient
    .get("products/search", {
      ...(signal !== undefined && { signal }),
      searchParams: {
        skip,
        limit,
        q: query,
      },
      next: {
        revalidate: getHoursInSeconds(24),
        tags: [`search-${query}`, "products"],
      },
    })
    .json<ProductResponse>();
}
