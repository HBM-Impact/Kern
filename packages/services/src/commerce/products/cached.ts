import "server-only";
import { cacheLife } from "next/cache";
import { getProductByCategory as fetchByCategory } from "./get-product-by-category";
import { getProductById as fetchById } from "./get-product-by-id";
import { getProducts as fetchProducts } from "./get-products";

// The catalog's one server cache policy. Server code imports from here; React
// Query imports the plain fetchers, since an AbortSignal can't cross
// "use cache".
type Cached<T extends (args: never) => unknown> = Omit<
  Parameters<T>[0],
  "signal"
>;

export async function getProducts(args: Cached<typeof fetchProducts>) {
  "use cache";
  cacheLife("days");
  return fetchProducts(args);
}

export async function getProductByCategory(
  args: Cached<typeof fetchByCategory>,
) {
  "use cache";
  cacheLife("days");
  return fetchByCategory(args);
}

export async function getProductById(args: Cached<typeof fetchById>) {
  "use cache";
  cacheLife("days");
  return fetchById(args);
}
