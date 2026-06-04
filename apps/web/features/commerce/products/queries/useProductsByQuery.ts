import { useQuery } from "@tanstack/react-query";
import { productsByQueryQueryOptions } from "../options/productsByQueryQueryOptions";

type Params = Parameters<typeof productsByQueryQueryOptions>[0];

export const useProductsByQuery = (params: Params) =>
  useQuery(productsByQueryQueryOptions(params));
