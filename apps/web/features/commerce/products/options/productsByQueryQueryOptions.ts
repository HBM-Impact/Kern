import { getProductsByQuery } from "@repo/services/commerce/products/getProductsByQuery";
import { queryOptions } from "@tanstack/react-query";

type Params = Omit<Parameters<typeof getProductsByQuery>[0], "signal">;

export const productsByQueryQueryOptions = (params: Params) =>
  queryOptions({
    queryKey: ["products", "search", params],
    queryFn: ({ signal }) => getProductsByQuery({ ...params, signal }),
  });
