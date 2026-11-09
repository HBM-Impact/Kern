import { commerceClient } from "../commerce-client";
import type { ProductResponse } from "../commerce-types";
import { type ListArgs, listParams } from "../list-params";

type Args = ListArgs & { category: string };

export async function getProductByCategory({
  category,
  signal,
  ...args
}: Args) {
  return commerceClient
    .get(`products/category/${category}`, {
      signal,
      searchParams: listParams(args),
    })
    .json<ProductResponse>();
}
