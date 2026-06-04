import { useQuery } from "@tanstack/react-query";
import { productByCategoryQueryOptions } from "../options/productByCategoryQueryOptions";

type Params = Parameters<typeof productByCategoryQueryOptions>[0];

export const useProductByCategory = (params: Params) =>
  useQuery(productByCategoryQueryOptions(params));
