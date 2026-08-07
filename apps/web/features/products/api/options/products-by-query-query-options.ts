import { getProductsByQuery } from "@repo/services/commerce/products/get-products-by-query";
import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";
import { getNextPageParam } from "../get-next-page-param";

type Params = Omit<Parameters<typeof getProductsByQuery>[0], "signal" | "skip">;

export const productsByQueryQueryOptions = (params: Params) =>
  infiniteQueryOptions({
    queryKey: ["products", "search", params],
    queryFn: ({ pageParam, signal }) =>
      getProductsByQuery({ ...params, signal, skip: pageParam * params.limit }),
    getNextPageParam,
    initialPageParam: 0,
    enabled: !!params.query.length,
    placeholderData: keepPreviousData,
  });
