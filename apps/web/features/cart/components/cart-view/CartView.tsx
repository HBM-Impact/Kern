"use client";

import { Prose } from "@repo/ui/typography/prose";
import { useQueries } from "@tanstack/react-query";
import { useCart } from "@/features/cart/cart-context";
import { CartItemRow } from "@/features/cart/components/cart-item-row";
import { CartItemRowSkeleton } from "@/features/cart/components/cart-item-row/CartItemRowSkeleton";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { CartSummarySkeleton } from "@/features/cart/components/cart-summary/CartSummarySkeleton";
import { productByIdQueryOptions } from "@/features/products/api/options/product-by-id-query-options";
import { LinkButton } from "@/primitives/link";
import styles from "./CartView.module.css";

export function CartView() {
  const { items } = useCart();

  const entries = [...items.entries()];

  const productQueries = useQueries({
    queries: entries.map(([productId]) =>
      productByIdQueryOptions({ id: String(productId) }),
    ),
  });

  const cartWithProducts = entries.flatMap(([productId, quantity], i) => {
    const product = productQueries[i]?.data;
    return product ? [{ productId, quantity, product }] : [];
  });

  if (items.size === 0) {
    return (
      <div className={styles.empty}>
        <Prose>Your cart is empty.</Prose>
        <LinkButton href="/products">Browse products</LinkButton>
      </div>
    );
  }

  if (productQueries.some((q) => q.isPending)) {
    return (
      <div className={styles.layout}>
        <ul className={styles.list}>
          {entries.map(([productId]) => (
            <CartItemRowSkeleton key={productId} />
          ))}
        </ul>
        <CartSummarySkeleton />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <ul className={styles.list}>
        {cartWithProducts.map(({ productId, quantity, product }) => (
          <CartItemRow
            key={productId}
            productId={productId}
            quantity={quantity}
            product={product}
          />
        ))}
      </ul>
      <CartSummary items={cartWithProducts} />
    </div>
  );
}
