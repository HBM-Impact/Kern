import { useQuery } from "@tanstack/react-query";
import { categoriesQueryOptions } from "../options/categoriesQueryOptions";

export const useCategories = () => useQuery(categoriesQueryOptions());
