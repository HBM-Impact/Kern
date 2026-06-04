import { getProducts } from "@repo/services/commerce/products/get-products";
import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";

type Params = Omit<Parameters<typeof getProducts>[0], "signal" | "skip"> & {
  initialPage?: number;
};

export const productsQueryOptions = ({ initialPage = 0, ...params }: Params) =>
  infiniteQueryOptions({
    queryKey: ["products", params],
    queryFn: ({ pageParam, signal }) =>
      getProducts({ ...params, signal, skip: pageParam * params.limit }),
    getNextPageParam: (lastPage) =>
      lastPage.skip + lastPage.limit < lastPage.total
        ? lastPage.skip / lastPage.limit + 1
        : undefined,
    initialPageParam: initialPage,
    placeholderData: keepPreviousData,
  });
