import { hoursToSeconds } from "@repo/utils/time";
import { commerceClient } from "../commerce-client";
import type { CategoryResponse } from "../commerce-types";

type Args = {
  signal?: AbortSignal;
};

export async function getCategories({ signal }: Args = {}) {
  return commerceClient
    .get("products/categories", {
      signal,
      next: {
        revalidate: hoursToSeconds(24),
        tags: ["categories"],
      },
    })
    .json<CategoryResponse>();
}
