import { getProductsByQuery } from "@repo/services/commerce/products/getProductsByQuery";
import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";

type Params = Omit<
  Parameters<typeof getProductsByQuery>[0],
  "signal" | "skip"
> & {
  initialPage?: number;
};

export const productsByQueryQueryOptions = ({
  initialPage = 0,
  ...params
}: Params) =>
  infiniteQueryOptions({
    queryKey: ["products", "search", params],
    queryFn: ({ pageParam, signal }) =>
      getProductsByQuery({ ...params, signal, skip: pageParam * params.limit }),
    getNextPageParam: (lastPage) =>
      lastPage.skip + lastPage.limit < lastPage.total
        ? lastPage.skip / lastPage.limit + 1
        : undefined,
    initialPageParam: initialPage,
    enabled: !!params.query.length,
    placeholderData: keepPreviousData,
  });
