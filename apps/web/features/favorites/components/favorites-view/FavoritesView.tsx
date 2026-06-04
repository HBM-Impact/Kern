"use client";

import { Typography } from "@repo/ui/typography";
import { useQueries } from "@tanstack/react-query";
import { useFavorites } from "@/features/favorites/favorites-context";
import { productByIdQueryOptions } from "@/features/products/api/options/product-by-id-query-options";
import { ProductCard } from "@/features/products/components/product-card";
import { LinkButton } from "@/primitives/link";
import styles from "./FavoritesView.module.css";

export function FavoritesView() {
  const { favoriteIds } = useFavorites();

  const productQueries = useQueries({
    queries: favoriteIds.map((id) =>
      productByIdQueryOptions({ id: String(id) }),
    ),
  });

  const products = productQueries.flatMap((q) => (q.data ? [q.data] : []));

  if (favoriteIds.length === 0) {
    return (
      <div className={styles.empty}>
        <Typography>Your favorites list is empty.</Typography>
        <LinkButton href="/products">Browse products</LinkButton>
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            discountPercentage={product.discountPercentage}
            category={product.category}
            images={product.images}
          />
        </li>
      ))}
    </ul>
  );
}
