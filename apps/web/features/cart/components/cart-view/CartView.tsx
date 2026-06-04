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

  const productQueries = useQueries({
    queries: items.map((item) =>
      productByIdQueryOptions({ id: String(item.productId) }),
    ),
  });

  const cartWithProducts = items.flatMap((item, i) => {
    const product = productQueries[i]?.data;
    return product
      ? [{ productId: item.productId, quantity: item.quantity, product }]
      : [];
  });

  if (items.length === 0) {
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
