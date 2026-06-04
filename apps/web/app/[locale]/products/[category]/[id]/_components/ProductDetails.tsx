import type { Product } from "@repo/services/commerce/commerce-types";
import { Container } from "@repo/ui/container";
import { Display } from "@repo/ui/display";
import { Typography } from "@repo/ui/typography";
import { AddToCart } from "@/features/cart/components/add-to-cart";
import { FavoriteToggle } from "@/features/favorites/components/favorite-toggle";
import { ProductCarousel } from "@/features/products/components/product-carousel";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ProductReviews } from "@/features/products/components/product-reviews";
import { ProductSpecs } from "@/features/products/components/product-specs";
import styles from "./ProductDetails.module.css";

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
          <div className={styles.detailsHeader}>
            <Typography as="span" variant="label" uppercase>
              {product.category}
            </Typography>
            <FavoriteToggle productId={product.id} />
          </div>
          <Display as="h1" variant="display2">
            {product.title}
          </Display>
          <Typography>{product.description}</Typography>
          <div className={styles.priceRow}>
            <div className={styles.priceGroup}>
              <Display as="span" variant="display3">
                ${product.price.toFixed(2)}
              </Display>
              {product.discountPercentage > 0 ? (
                <Typography as="span" variant="label">
                  -{product.discountPercentage.toFixed(0)}%
                </Typography>
              ) : null}
            </div>
            <AddToCart productId={product.id} />
          </div>
          <ProductSpecs product={product} />
          <ProductReviews reviews={product.reviews} />
        </div>
      </div>
      <ProductCarousel
        products={relatedProducts}
        title="More from this category"
        description="Other products you might like."
      />
    </Container>
  );
}
