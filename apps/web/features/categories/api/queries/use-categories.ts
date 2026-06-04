import { useQuery } from "@tanstack/react-query";
import { categoriesQueryOptions } from "../options/categories-query-options";

export const useCategories = () => useQuery(categoriesQueryOptions());
