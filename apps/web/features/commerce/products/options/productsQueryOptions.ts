import { getProducts } from "@repo/services/commerce/products/getProducts";
import { queryOptions } from "@tanstack/react-query";

type Params = Omit<Parameters<typeof getProducts>[0], "signal">;

export const productsQueryOptions = (params: Params) =>
  queryOptions({
    queryKey: ["products", params],
    queryFn: ({ signal }) => getProducts({ ...params, signal }),
  });
