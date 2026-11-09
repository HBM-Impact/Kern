"use client";

import type { ProductResponse } from "@repo/services/commerce/commerce-types";
import { productByCategoryQueryOptions } from "@/features/products/api/options/product-by-category-query-options";
import { ProductListing } from "@/features/products/components/ProductListing";

type Props = { category: string; initialPage: ProductResponse };

export function ProductCatalog({ category, initialPage }: Props) {
  return (
    <ProductListing
      query={(args) => productByCategoryQueryOptions({ category, ...args })}
      initialPage={initialPage}
    />
  );
}
