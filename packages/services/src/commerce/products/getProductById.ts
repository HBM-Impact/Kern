import { hoursToSeconds } from "@repo/utils/time";
import type { FetcherArgs } from "../../serviceTypes";
import { commerceClient } from "../commerceClient";
import type { Product } from "../commerceTypes";

type Args = FetcherArgs & {
  id: string;
};

export const getProductById = async ({ id, signal }: Args) => {
  return commerceClient
    .get(`products/${id}`, {
      ...(signal !== undefined && { signal }),
      next: {
        revalidate: hoursToSeconds(24),
        tags: [`product-${id}`, "products"],
      },
    })
    .json<Product>();
};
