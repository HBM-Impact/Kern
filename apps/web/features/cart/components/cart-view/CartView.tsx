"use client";

import { Typography } from "@repo/ui/typography";
import { useQueries } from "@tanstack/react-query";
import { useCart } from "@/features/cart/cart-context";
import { CartItemRow } from "@/features/cart/components/cart-item-row";
import { CartSummary } from "@/features/cart/components/cart-summary";
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
        <Typography>Your cart is empty.</Typography>
        <LinkButton href="/products">Browse products</LinkButton>
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
