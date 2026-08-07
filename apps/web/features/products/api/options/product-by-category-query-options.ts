import type { ProductResponse } from "@repo/services/commerce/commerce-types";
import { getProductByCategory } from "@repo/services/commerce/products/get-product-by-category";
import {
  type InfiniteData,
  infiniteQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { getNextPageParam } from "../get-next-page-param";

type Params = Omit<
  Parameters<typeof getProductByCategory>[0],
  "signal" | "skip"
> & {
  initialData?: InfiniteData<ProductResponse, number>;
};

export const productByCategoryQueryOptions = ({
  initialData,
  ...params
}: Params) =>
  infiniteQueryOptions({
    queryKey: ["products", "category", params],
    queryFn: ({ pageParam, signal }) =>
      getProductByCategory({
        ...params,
        signal,
        skip: pageParam * params.limit,
      }),
    getNextPageParam,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    initialData,
  });
