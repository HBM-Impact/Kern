"use client";

import type { ProductResponse } from "@repo/services/commerce/commerce-types";
import {
  type InfiniteData,
  type QueryKey,
  type UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  PRODUCT_PAGE_SIZE,
  SORT_OPTIONS,
  type SortEntry,
  useSort,
} from "@/features/products/sort-map";
import { ProductGrid } from "./ProductGrid";
import { SortControl } from "./SortControl";

type Pages = InfiniteData<ProductResponse, number>;

type QueryArgs = {
  limit: number;
  sortBy?: SortEntry["sortBy"];
  order?: SortEntry["order"];
  initialData?: Pages;
};

type Props<TKey extends QueryKey> = {
  query: (
    args: QueryArgs,
  ) => UseInfiniteQueryOptions<
    ProductResponse,
    Error,
    InfiniteData<ProductResponse>,
    TKey,
    number
  >;
  // The server-rendered unsorted first page, fetched with PRODUCT_PAGE_SIZE.
  initialPage?: ProductResponse;
};

// Sortable, paginated product grid. The source only says which products.
export function ProductListing<TKey extends QueryKey>({
  query,
  initialPage,
}: Props<TKey>) {
  const [sort] = useSort();
  const sortEntry = sort ? SORT_OPTIONS[sort] : undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery(
      query({
        limit: PRODUCT_PAGE_SIZE,
        sortBy: sortEntry?.sortBy,
        order: sortEntry?.order,
        // Only the unsorted first page was prerendered; sorting is another key.
        initialData:
          initialPage && !sortEntry
            ? { pages: [initialPage], pageParams: [0] }
            : undefined,
      }),
    );

  return (
    <>
      <SortControl />
      <ProductGrid
        products={data?.pages.flatMap((p) => p.products) ?? []}
        hasMore={hasNextPage}
        isLoading={isPending}
        isFetchingMore={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    </>
  );
}
