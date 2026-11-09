import type { Product } from "@repo/services/commerce/commerce-types";
import { z } from "zod";

const positiveInt = z.number().int().positive();

// localStorage is untrusted: a malformed cart resets to empty rather than
// leaking bad entries into the UI. Stored as [productId, quantity] pairs.
export const cartStorage = z
  .array(z.tuple([positiveInt, positiveInt]))
  .catch([]);

export type CartLine = {
  productId: number;
  quantity: number;
  product: Product;
};

// Joins cart entries with their fetched products, in cart order. Entries whose
// product is still loading or no longer exists are left out.
export function cartLines(
  entries: [number, number][],
  products: (Product | null | undefined)[],
): CartLine[] {
  return entries.flatMap(([productId, quantity], i) => {
    const product = products[i];
    return product ? [{ productId, quantity, product }] : [];
  });
}

export function cartTotals(lines: CartLine[]) {
  return {
    items: lines.reduce((sum, l) => sum + l.quantity, 0),
    subtotal: lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
  };
}
