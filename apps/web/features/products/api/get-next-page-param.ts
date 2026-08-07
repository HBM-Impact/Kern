import type { ProductResponse } from "@repo/services/commerce/commerce-types";

export function getNextPageParam(lastPage: ProductResponse) {
  return lastPage.skip + lastPage.limit < lastPage.total
    ? lastPage.skip / lastPage.limit + 1
    : undefined;
}
