import { useInfiniteQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "../options/products-query-options";

type Params = Parameters<typeof productsQueryOptions>[0];

export const useProducts = (params: Params) =>
  useInfiniteQuery(productsQueryOptions(params));
