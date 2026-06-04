import type { Product } from "@repo/services/commerce/commerce-types";
import { Carousel } from "@repo/ui/carousel";
import { Container } from "@repo/ui/container";
import { Display } from "@repo/ui/display";
import { Typography } from "@repo/ui/typography";
import { ProductCard } from "@/features/products/components/product-card";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ProductReviews } from "@/features/products/components/product-reviews";
import { ProductSpecs } from "@/features/products/components/product-specs";
import styles from "./product-details.module.css";

type Props = {
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetails({ product, relatedProducts }: Props) {
  return (
    <Container as="article">
      <div className={styles.layout}>
        <ProductGallery images={product.images} title={product.title} />
        <div className={styles.details}>
          <Typography as="span" variant="label" uppercase>
            {product.category}
          </Typography>
          <Display as="h1" variant="display2">
            {product.title}
          </Display>
          <Typography>{product.description}</Typography>
          <div className={styles.priceRow}>
            <Display as="span" variant="display3">
              ${product.price.toFixed(2)}
            </Display>
            {product.discountPercentage > 0 ? (
              <Typography as="span" variant="label">
                -{product.discountPercentage.toFixed(0)}%
              </Typography>
            ) : null}
          </div>
          <ProductSpecs product={product} />
          <ProductReviews reviews={product.reviews} />
        </div>
      </div>
      {relatedProducts.length > 0 ? (
        <Carousel
          title="More from this category"
          description="Other products you might like."
        >
          {relatedProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              description={p.description}
              price={p.price}
              discountPercentage={p.discountPercentage}
              category={p.category}
              images={p.images}
            />
          ))}
        </Carousel>
      ) : null}
    </Container>
  );
}
