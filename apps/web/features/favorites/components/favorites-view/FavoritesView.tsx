"use client";

import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { useQueries } from "@tanstack/react-query";
import { useFavorites } from "@/features/favorites/favorites-context";
import { productByIdQueryOptions } from "@/features/products/api/options/product-by-id-query-options";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { LinkButton } from "@/primitives/link/LinkButton";
import { FavoritesViewSkeleton } from "./FavoritesViewSkeleton";
import { favoritesStyles } from "./styles";

export function FavoritesView() {
  const { ids } = useFavorites();

  const { products, isLoading } = useQueries({
    queries: ids.map((id) => productByIdQueryOptions({ id: String(id) })),
    combine: (results) => ({
      products: results.flatMap((r) => (r.data ? [r.data] : [])),
      isLoading: results.some((r) => r.isPending),
    }),
  });

  if (ids.length === 0) {
    return (
      <div {...stylex.props(favoritesStyles.empty)}>
        <Prose>Your favorites list is empty.</Prose>
        <LinkButton href="/products">Browse products</LinkButton>
      </div>
    );
  }

  if (isLoading) {
    return <FavoritesViewSkeleton count={ids.length} />;
  }

  if (products.length === 0) {
    return (
      <div {...stylex.props(favoritesStyles.empty)}>
        <Prose>No results found.</Prose>
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
