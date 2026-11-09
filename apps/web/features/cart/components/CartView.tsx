"use client";

import { size } from "@repo/ui/tokens.stylex";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { useQueries } from "@tanstack/react-query";
import { cartLines } from "@/features/cart/cart";
import { useCart } from "@/features/cart/cart-context";
import { CartItemRow } from "@/features/cart/components/cart-item-row/CartItemRow";
import { CartItemRowSkeleton } from "@/features/cart/components/cart-item-row/CartItemRowSkeleton";
import { CartSummary } from "@/features/cart/components/cart-summary/CartSummary";
import { CartSummarySkeleton } from "@/features/cart/components/cart-summary/CartSummarySkeleton";
import { productByIdQueryOptions } from "@/features/products/api/options/product-by-id-query-options";
import { LinkButton } from "@/primitives/link/LinkButton";

const styles = stylex.create({
  layout: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      "@media (width >= 768px)": "1fr 20rem",
    },
    gap: size[4],
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: size[2],
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: size[3],
  },
});

export function CartView() {
  const { items } = useCart();

  const entries = [...items.entries()];

  const productQueries = useQueries({
    queries: entries.map(([productId]) =>
      productByIdQueryOptions({ id: String(productId) }),
    ),
  });

  const lines = cartLines(
    entries,
    productQueries.map((q) => q.data),
  );

  if (items.size === 0) {
    return (
      <div {...stylex.props(styles.empty)}>
        <Prose>Your cart is empty.</Prose>
        <LinkButton href="/products">Browse products</LinkButton>
      </div>
    );
  }

  if (productQueries.some((q) => q.isPending)) {
    return (
      <div {...stylex.props(styles.layout)}>
        <ul {...stylex.props(styles.list)}>
          {entries.map(([productId]) => (
            <CartItemRowSkeleton key={productId} />
          ))}
        </ul>
        <CartSummarySkeleton />
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.layout)}>
      <ul {...stylex.props(styles.list)}>
        {lines.map(({ productId, quantity, product }) => (
          <CartItemRow
            key={productId}
            productId={productId}
            quantity={quantity}
            product={product}
          />
        ))}
      </ul>
      <CartSummary lines={lines} />
    </div>
  );
}
