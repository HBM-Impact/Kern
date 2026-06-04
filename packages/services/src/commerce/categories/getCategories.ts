import { hoursToSeconds } from "@repo/utils/time";
import type { FetcherArgs } from "../../serviceTypes";
import { commerceClient } from "../commerceClient";
import type { CategoryResponse } from "../commerceTypes";

type Args = FetcherArgs;

export async function getCategories({ signal }: Args = {}) {
  return commerceClient
    .get("products/categories", {
      ...(signal !== undefined && { signal }),
      next: {
        revalidate: hoursToSeconds(24),
        tags: ["categories"],
      },
    })
    .json<CategoryResponse>();
}
