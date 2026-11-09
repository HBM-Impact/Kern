import "server-only";
import { cacheLife } from "next/cache";
import { getCategories as fetchCategories } from "./get-categories";

// See products/cached.ts.
export async function getCategories() {
  "use cache";
  cacheLife("days");
  return fetchCategories();
}
