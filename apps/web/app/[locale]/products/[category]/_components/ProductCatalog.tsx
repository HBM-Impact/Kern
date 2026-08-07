"use client";

import type { ProductResponse } from "@repo/services/commerce/commerce-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { productByCategoryQueryOptions } from "@/features/products/api/options/product-by-category-query-options";
import { ProductGrid } from "@/features/products/components/product-grid";
import { SortControl } from "@/features/products/components/sort-control";
import { CATEGORY_PAGE_SIZE, SORT_OPTIONS } from "@/features/products/sort-map";

type Props = { category: string; initialPage: ProductResponse };

export function ProductCatalog({ category, initialPage }: Props) {
  const [sort] = useQueryState("sort", parseAsString);
  const sortEntry = sort ? SORT_OPTIONS[sort] : undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery(
      productByCategoryQueryOptions({
        category,
        limit: CATEGORY_PAGE_SIZE,
        sortBy: sortEntry?.sortBy,
        order: sortEntry?.order,
        // Only the unsorted first page was prerendered — sorting is a different query key.
        ...(sortEntry
          ? {}
          : { initialData: { pages: [initialPage], pageParams: [0] } }),
      }),
    );

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  return (
    <>
      <SortControl />
      <ProductGrid
        products={products}
        hasMore={hasNextPage ?? false}
        isLoading={isPending}
        isFetchingMore={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    </>
  );
}
