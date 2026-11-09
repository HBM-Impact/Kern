import { commerceClient } from "../commerce-client";
import type { ProductResponse } from "../commerce-types";
import { type ListArgs, listParams } from "../list-params";

type Args = ListArgs & { query: string };

export async function getProductsByQuery({ query, signal, ...args }: Args) {
  return commerceClient
    .get("products/search", {
      signal,
      searchParams: { ...listParams(args), q: query },
    })
    .json<ProductResponse>();
}
