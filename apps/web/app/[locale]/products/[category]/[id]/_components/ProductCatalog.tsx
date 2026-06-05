"use client";

import type { Product } from "@repo/services/commerce/commerce-types";
import { useProductByCategory } from "@/features/products/api/queries/use-product-by-category";
import { ProductGrid } from "@/features/products/components/product-grid";
import { SortControl } from "@/features/products/components/sort-control";

type SortKey = Extract<keyof Product, "price" | "rating" | "title">;
type SortEntry = { sortBy: SortKey; order: "asc" | "desc" };

const SORT_MAP: Record<string, SortEntry> = {
  "price-asc": { sortBy: "price", order: "asc" },
  "price-desc": { sortBy: "price", order: "desc" },
  "rating-desc": { sortBy: "rating", order: "desc" },
  "title-asc": { sortBy: "title", order: "asc" },
};

type Props = {
  category: string;
  sort?: string;
};

export function ProductCatalog({ category, sort }: Props) {
  const sortEntry = sort ? SORT_MAP[sort] : undefined;

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
      <SortControl sort={sort} />
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
