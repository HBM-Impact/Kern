"use client";

import { IconButton } from "@repo/ui/buttons/icon-button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "../../cart-context";
import styles from "./AddToCart.module.css";

type Props = {
  productId: number;
};

export function AddToCart({ productId }: Props) {
  const { items, add, remove, setQuantity } = useCart();
  const qty = items.get(productId) ?? 0;

  if (qty === 0) {
    return (
      <IconButton
        icon={<ShoppingCart />}
        aria-label="Add to cart"
        onClick={() => add(productId)}
      />
    );
  }

  return (
    <fieldset className={styles.stepper} aria-label="Cart quantity">
      <button
        type="button"
        className={styles.stepBtn}
        aria-label="Decrease quantity"
        onClick={() =>
          qty === 1 ? remove(productId) : setQuantity(productId, qty - 1)
        }
      >
        <Minus />
      </button>
      <span className={styles.qty}>{qty}</span>
      <button
        type="button"
        className={styles.stepBtn}
        aria-label="Increase quantity"
        onClick={() => setQuantity(productId, qty + 1)}
      >
        <Plus />
      </button>
    </fieldset>
  );
}
