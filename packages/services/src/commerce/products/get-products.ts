import { commerceClient } from "../commerce-client";
import type { ProductResponse } from "../commerce-types";
import { type ListArgs, listParams } from "../list-params";

export async function getProducts({ signal, ...args }: ListArgs) {
  return commerceClient
    .get("products", { signal, searchParams: listParams(args) })
    .json<ProductResponse>();
}
