import type { Product } from "@repo/services/commerce/commerce-types";
import { Carousel } from "@repo/ui/carousel";
import * as stylex from "@stylexjs/stylex";
import { ProductCard } from "@/features/products/components/product-card/ProductCard";

type Props = {
  products: Product[];
  title: string;
  description?: string;
  priorityCount?: number;
};

const styles = stylex.create({
  item: {
    width: "280px",
  },
});

export function ProductCarousel({
  products,
  title,
  description,
  priorityCount = 0,
}: Props) {
  if (products.length === 0) return null;

  return (
    <Carousel title={title} description={description}>
      {products.map((product, i) => (
        <div key={product.id} {...stylex.props(styles.item)}>
          <ProductCard
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            discountPercentage={product.discountPercentage}
            category={product.category}
            images={product.images}
            priority={i < priorityCount}
          />
        </div>
      ))}
    </Carousel>
  );
}
