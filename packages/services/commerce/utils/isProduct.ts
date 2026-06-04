import type { Product } from "../commerceTypes";

export function isProduct(value: unknown): value is Product {
  return typeof value === "object" && value !== null && "id" in value;
}
