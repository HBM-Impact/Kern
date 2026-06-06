"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useProductByCategory } from "@/features/products/api/queries/use-product-by-category";
import { ProductGrid } from "@/features/products/components/product-grid";
import { SortControl } from "@/features/products/components/sort-control";
import { SORT_OPTIONS } from "@/features/products/sort-map";

type Props = { category: string };

export function ProductCatalog({ category }: Props) {
  const [sort] = useQueryState("sort", parseAsString);
  const sortEntry = sort ? SORT_OPTIONS[sort] : undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useProductByCategory({
      category,
      limit: 12,
      sortBy: sortEntry?.sortBy,
      order: sortEntry?.order,
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
