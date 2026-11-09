import { getProductByCategory } from "@repo/services/commerce/products/cached";
import type { ModuleOf } from "@/features/modules/types";
import { ProductCarousel } from "@/features/products/components/ProductCarousel";

type Props = ModuleOf<"productCarouselModule">;

export async function ProductCarouselModule({
  title,
  description,
  category,
  limit,
}: Props) {
  if (!title || !category) return null;

  const { products } = await getProductByCategory({
    category,
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
