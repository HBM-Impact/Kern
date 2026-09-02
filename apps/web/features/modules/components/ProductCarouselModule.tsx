import { getProductByCategory } from "@repo/services/commerce/products/get-product-by-category";
import { stegaClean } from "next-sanity";
import type { ModuleOf } from "@/features/modules/types";
import { ProductCarousel } from "@/features/products/components/ProductCarousel";

type Props = ModuleOf<"productCarouselModule">;

export async function ProductCarouselModule({
  title,
  description,
  category,
  limit,
}: Props) {
  // The category goes into the commerce API request, not onto the page.
  const slug = stegaClean(category);
  if (!title || !slug) return null;

  const { products } = await getProductByCategory({
    category: slug,
    skip: 0,
    limit: limit ?? 8,
  });

  return (
    <ProductCarousel
      products={products}
      title={title}
      description={description ?? undefined}
      priorityCount={4}
    />
  );
}
