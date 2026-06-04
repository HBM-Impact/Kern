import type { Product } from "@repo/services/commerce/commerce-types";
import { Carousel } from "@repo/ui/carousel";
import { ProductCard } from "@/features/products/components/product-card";
import styles from "./FeaturedProducts.module.css";

type Props = { products: Product[] };

export function FeaturedProducts({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <Carousel
      title="Featured Products"
      description="Top picks from our collection"
    >
      {products.map((product, i) => (
        <div key={product.id} className={styles.item}>
          <ProductCard
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            discountPercentage={product.discountPercentage}
            category={product.category}
            images={product.images}
            priority={i < 4}
          />
        </div>
      ))}
    </Carousel>
  );
}
