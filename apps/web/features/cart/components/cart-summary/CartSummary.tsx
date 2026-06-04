"use client";

import { LinkButton } from "@/primitives/link";
import type { Product } from "@repo/services/commerce/commerce-types";
import { Display } from "@repo/ui/display";
import { Typography } from "@repo/ui/typography";
import styles from "./CartSummary.module.css";

type CartItemWithProduct = {
  productId: number;
  quantity: number;
  product: Product;
};

type Props = {
  items: CartItemWithProduct[];
};

export function CartSummary({ items }: Props) {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return (
    <aside className={styles.summary}>
      <Display as="h2" variant="display4">
        Order Summary
      </Display>
      <dl className={styles.details}>
        <div className={styles.detailRow}>
          <Typography as="dt" variant="body">
            Items
          </Typography>
          <Typography as="dd" variant="body">
            {totalItems}
          </Typography>
        </div>
        <div className={styles.detailRow}>
          <Typography as="dt" variant="body">
            Subtotal
          </Typography>
          <Typography as="dd" variant="body">
            ${subtotal.toFixed(2)}
          </Typography>
        </div>
      </dl>
      <div className={styles.totalRow}>
        <Display as="span" variant="display4">
          Total
        </Display>
        <Display as="span" variant="display4">
          ${subtotal.toFixed(2)}
        </Display>
      </div>
      <LinkButton fill href="/products">
        Continue Shopping
      </LinkButton>
    </aside>
  );
}
