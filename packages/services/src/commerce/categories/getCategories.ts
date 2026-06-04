import { getHoursInSeconds } from "@repo/utils/getTime";
import type { FetcherArgs } from "../../serviceTypes";
import { commerceClient } from "../commerceClient";
import type { CategoryResponse } from "../commerceTypes";

type Args = FetcherArgs;

export async function getCategories({ signal }: Args = {}) {
  return commerceClient
    .get("products/categories", {
      ...(signal !== undefined && { signal }),
      next: {
        revalidate: getHoursInSeconds(24),
        tags: ["categories"],
      },
    })
    .json<CategoryResponse>();
}
