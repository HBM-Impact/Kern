"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useProductsByQuery } from "@/features/products/api/queries/use-products-by-query";
import { ProductGrid } from "@/features/products/components/product-grid";
import { SortControl } from "@/features/products/components/sort-control";

export function SearchResults() {
  const [q] = useQueryState("q", parseAsString.withDefault(""));

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useProductsByQuery({
      query: q,
      limit: 12,
    });

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
