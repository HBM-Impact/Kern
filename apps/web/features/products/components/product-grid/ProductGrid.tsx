"use client";

import type { Product } from "@repo/services/commerce/commerce-types";
import { Button } from "@repo/ui/buttons";
import { Typography } from "@repo/ui/typography";
import { ProductCard } from "../product-card";
import styles from "./ProductGrid.module.css";

type Props = {
  products: Product[];
  hasMore: boolean;
  isFetchingMore: boolean;
  onLoadMore: () => void;
};

export function ProductGrid({
  products,
  hasMore,
  isFetchingMore,
  onLoadMore,
}: Props) {
  if (products.length === 0) {
    return <Typography>No products found.</Typography>;
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.grid}>
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              discountPercentage={product.discountPercentage}
              category={product.category}
              images={product.images}
              priority={index === 0}
            />
          </li>
        ))}
      </ul>
      {hasMore ? (
        <Button onClick={onLoadMore} disabled={isFetchingMore}>
          {isFetchingMore ? "Loading…" : "Load more"}
        </Button>
      ) : null}
    </div>
  );
}
