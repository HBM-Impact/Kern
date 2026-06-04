import { getCategories } from "@repo/services/commerce/categories/get-categories";
import { queryOptions } from "@tanstack/react-query";

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getCategories({ signal }),
  });
