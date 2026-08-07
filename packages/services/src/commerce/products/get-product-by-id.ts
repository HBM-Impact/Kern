import { hoursToSeconds } from "@repo/utils/time";
import { commerceClient } from "../commerce-client";
import type { Product } from "../commerce-types";

type Args = {
  signal?: AbortSignal;
  id: string;
};

export const getProductById = async ({ id, signal }: Args) => {
  return commerceClient
    .get(`products/${id}`, {
      signal,
      next: {
        revalidate: hoursToSeconds(24),
        tags: [`product-${id}`, "products"],
      },
    })
    .json<Product>();
};
