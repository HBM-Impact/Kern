"use client";

import { Container } from "@repo/ui/container";
import { PageHeader } from "@/features/layout/page-header";
import { useProductsByQuery } from "@/features/products/api/queries/use-products-by-query";
import { ProductGrid } from "@/features/products/components/product-grid";
import { SearchForm } from "@/features/products/components/search-form";
import { SortControl } from "@/features/products/components/sort-control";

type Props = {
  q?: string;
  sort?: string;
};

export function SearchPage({ q, sort }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsByQuery({
      query: q ?? "",
      limit: 12,
    });

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  return (
    <Container as="section">
      <PageHeader
        title="Search"
        description="Find products by name, brand, or description."
      />
      <SearchForm q={q} />
      {q ? (
        <>
          <SortControl sort={sort} preserveParams={q ? { q } : undefined} />
          <ProductGrid
            products={products}
            hasMore={hasNextPage ?? false}
            isFetchingMore={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          />
        </>
      ) : null}
    </Container>
  );
}
