"use client";

import type { Product } from "@repo/services/commerce/commerce-types";
import { Container } from "@repo/ui/container";
import { PageHeader } from "@/features/layout/page-header";
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

function formatSlug(slug: string) {
  return slug.replaceAll("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

type Props = {
  slug: string;
  sort?: string;
};

export function ProductListPage({ slug, sort }: Props) {
  const sortEntry = sort ? SORT_MAP[sort] : undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductByCategory({
      category: slug,
      limit: 12,
      sortBy: sortEntry?.sortBy,
      order: sortEntry?.order,
    });

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  return (
    <Container as="section">
      <PageHeader
        title={formatSlug(slug)}
        description={`Browse all products in the ${formatSlug(slug)} category.`}
      />
      <SortControl sort={sort} />
      <ProductGrid
        products={products}
        hasMore={hasNextPage ?? false}
        isFetchingMore={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    </Container>
  );
}
