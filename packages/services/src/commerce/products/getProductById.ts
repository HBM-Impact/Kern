import { getHoursInSeconds } from "@repo/utils/getTime";
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
        revalidate: getHoursInSeconds(24),
        tags: [`product-${id}`, "products"],
      },
    })
    .json<Product>();
};
