import { useInfiniteQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "../options/productsQueryOptions";

type Params = Parameters<typeof productsQueryOptions>[0];

export const useProducts = (params: Params) =>
  useInfiniteQuery(productsQueryOptions(params));
