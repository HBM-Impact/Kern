import type { Product } from "@repo/services/commerce/commerce-types";
import { ProductCarousel } from "@/features/products/components/product-carousel";

type Props = { products: Product[] };

export function FeaturedProducts({ products }: Props) {
  return (
    <ProductCarousel
      products={products}
      title="Featured Products"
      description="Top picks from our collection"
      priorityCount={4}
    />
  );
}
