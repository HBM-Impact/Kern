import { useQuery } from "@tanstack/react-query";
import { productByIdQueryOptions } from "../options/product-by-id-query-options";

type Params = Parameters<typeof productByIdQueryOptions>[0];

export const useProductById = (params: Params) =>
  useQuery(productByIdQueryOptions(params));
