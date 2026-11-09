import type { Product } from "@repo/services/commerce/commerce-types";
import { expect, test } from "vitest";
import { favoritesStorage } from "@/features/favorites/favorites-storage";
import { cartLines, cartStorage, cartTotals } from "./cart";

const product = (id: number, price: number) => ({ id, price }) as Product;

test("cartLines keeps cart order and drops missing products", () => {
  const lines = cartLines(
    [
      [2, 1],
      [9, 3],
      [1, 2],
    ],
    [product(2, 10), null, product(1, 5)],
  );
  expect(lines.map((l) => l.productId)).toEqual([2, 1]);
});

test("cartTotals sums quantity and price", () => {
  const lines = cartLines(
    [
      [1, 2],
      [2, 3],
    ],
    [product(1, 1.5), product(2, 10)],
  );
  expect(cartTotals(lines)).toEqual({ items: 5, subtotal: 33 });
});

test("cartStorage accepts pairs and resets anything malformed", () => {
  expect(cartStorage.parse([[1, 2]])).toEqual([[1, 2]]);
  for (const raw of [null, {}, [[1]], [["1", 2]], [[1, 0]], [[1.5, 1]]]) {
    expect(cartStorage.parse(raw)).toEqual([]);
  }
});

test("favoritesStorage accepts ids and resets anything malformed", () => {
  expect(favoritesStorage.parse([3, 1])).toEqual([3, 1]);
  for (const raw of [null, "1", [1, "2"], [-1]]) {
    expect(favoritesStorage.parse(raw)).toEqual([]);
  }
});
