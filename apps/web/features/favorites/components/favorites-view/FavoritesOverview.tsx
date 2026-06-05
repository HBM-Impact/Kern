"use client";

import { Typography } from "@repo/ui/typography";
import { useQueries } from "@tanstack/react-query";
import { useFavorites } from "@/features/favorites/favorites-context";
import { productByIdQueryOptions } from "@/features/products/api/options/product-by-id-query-options";
import { ProductGrid } from "@/features/products/components/product-grid";
import { LinkButton } from "@/primitives/link";
import styles from "./FavoritesOverview.module.css";

export function FavoritesOverview() {
  const { ids } = useFavorites();

  const { products, isLoading } = useQueries({
    queries: ids.map((id) => productByIdQueryOptions({ id: String(id) })),
    combine: (results) => ({
      products: results.flatMap((r) => (r.data ? [r.data] : [])),
      isLoading: results.some((r) => r.isPending),
    }),
  });

  if (isLoading) {
    return (
      <ProductGrid
        products={[]}
        hasMore={false}
        isLoading={true}
        isFetchingMore={false}
      />
    );
  }

  if (ids.length === 0) {
    return (
      <div className={styles.empty}>
        <Typography>Your favorites list is empty.</Typography>
        <LinkButton href="/products">Browse products</LinkButton>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <Typography>No results found.</Typography>
        <LinkButton href="/products">Browse products</LinkButton>
      </div>
    );
  }

  return (
    <ProductGrid
      products={products}
      hasMore={false}
      isLoading={false}
      isFetchingMore={false}
    />
  );
}
