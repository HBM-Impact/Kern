import { getProductById } from "@repo/services/commerce/products/get-product-by-id";
import { queryOptions } from "@tanstack/react-query";

type Params = Omit<Parameters<typeof getProductById>[0], "signal">;

export const productByIdQueryOptions = (params: Params) =>
  queryOptions({
    queryKey: ["products", params.id],
    queryFn: ({ signal }) => getProductById({ ...params, signal }),
  });
