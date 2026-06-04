import { getProductByCategory } from "@repo/services/commerce/products/getProductByCategory";
import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";

type Params = Omit<
  Parameters<typeof getProductByCategory>[0],
  "signal" | "skip"
> & {
  initialPage?: number;
};

export const productByCategoryQueryOptions = ({
  initialPage = 0,
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
    getNextPageParam: (lastPage) =>
      lastPage.skip + lastPage.limit < lastPage.total
        ? lastPage.skip / lastPage.limit + 1
        : undefined,
    initialPageParam: initialPage,
    placeholderData: keepPreviousData,
  });
