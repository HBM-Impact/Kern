"use client";

import { useProductsByQuery } from "@/features/products/api/queries/use-products-by-query";
import { ProductGrid } from "@/features/products/components/product-grid";
import { SortControl } from "@/features/products/components/sort-control";

type Props = {
  q: string;
  sort?: string;
};

export function SearchResults({ q, sort }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsByQuery({
      query: q,
      limit: 12,
    });

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  return (
    <>
      <SortControl sort={sort} preserveParams={{ q }} />
      <ProductGrid
        products={products}
        hasMore={hasNextPage ?? false}
        isFetchingMore={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    </>
  );
}
