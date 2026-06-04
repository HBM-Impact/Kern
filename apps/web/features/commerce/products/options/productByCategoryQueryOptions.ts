import { getProductByCategory } from "@repo/services/commerce/products/getProductByCategory";
import { queryOptions } from "@tanstack/react-query";

type Params = Omit<Parameters<typeof getProductByCategory>[0], "signal">;

export const productByCategoryQueryOptions = (params: Params) =>
  queryOptions({
    queryKey: ["products", "category", params],
    queryFn: ({ signal }) => getProductByCategory({ ...params, signal }),
  });
