import { useQuery } from "@tanstack/react-query";
import { productByIdQueryOptions } from "../options/productByIdQueryOptions";

type Params = Parameters<typeof productByIdQueryOptions>[0];

export const useProductById = (params: Params) =>
  useQuery(productByIdQueryOptions(params));
