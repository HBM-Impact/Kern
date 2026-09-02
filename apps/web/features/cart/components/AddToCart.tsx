"use client";

import { IconButton } from "@repo/ui/buttons/icon-button";
import { border, colors, font, radius, size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "../cart-context";

type Props = {
  productId: number;
};

const styles = stylex.create({
  stepper: {
    display: "flex",
    alignItems: "center",
    height: "2.5rem",
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radius[2],
    overflow: "hidden",
    flexShrink: 0,
  },
  stepBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "100%",
    color: colors.text,
    borderStyle: "none",
    cursor: "pointer",
    transition: "background-color 0.15s ease-out",
    flexShrink: 0,
    backgroundColor: {
      default: colors.bg,
      ":hover": colors.hoverBg,
      ":active": colors.activeBg,
    },
  },
  // Was `.stepBtn > svg`. These icons are rendered here, so they take the
  // size directly rather than through a child combinator.
  icon: {
    height: size[3],
    width: size[3],
  },
  qty: {
    width: "3rem",
    textAlign: "center",
    fontFamily: font.sans,
    fontSize: font.size1,
    color: colors.text,
  },
});

export function AddToCart({ productId }: Props) {
  const { items, add, remove, setQuantity } = useCart();
  const qty = items.get(productId) ?? 0;

  if (qty === 0) {
    return (
      <IconButton
        icon={<ShoppingCart size={16} />}
        aria-label="Add to cart"
        onClick={() => add(productId)}
      />
    );
  }

  return (
    <fieldset {...stylex.props(styles.stepper)} aria-label="Cart quantity">
      <button
        type="button"
        {...stylex.props(styles.stepBtn)}
        aria-label="Decrease quantity"
        onClick={() =>
          qty === 1 ? remove(productId) : setQuantity(productId, qty - 1)
        }
      >
        <Minus {...stylex.props(styles.icon)} />
      </button>
      <span {...stylex.props(styles.qty)}>{qty}</span>
      <button
        type="button"
        {...stylex.props(styles.stepBtn)}
        aria-label="Increase quantity"
        onClick={() => setQuantity(productId, qty + 1)}
      >
        <Plus {...stylex.props(styles.icon)} />
      </button>
    </fieldset>
  );
}
