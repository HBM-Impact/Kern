import { useInfiniteQuery } from "@tanstack/react-query";
import { productByCategoryQueryOptions } from "../options/product-by-category-query-options";

type Params = Parameters<typeof productByCategoryQueryOptions>[0];

export const useProductByCategory = (params: Params) =>
  useInfiniteQuery(productByCategoryQueryOptions(params));
