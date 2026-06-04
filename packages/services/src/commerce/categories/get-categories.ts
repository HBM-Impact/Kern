import { hoursToSeconds } from "@repo/utils/time";
import type { FetcherArgs } from "../../service-types";
import { commerceClient } from "../commerce-client";
import type { CategoryResponse } from "../commerce-types";

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
