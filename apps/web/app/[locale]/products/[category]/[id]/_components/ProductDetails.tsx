import type { Product } from "@repo/services/commerce/commerce-types";
import { Container } from "@repo/ui/container";
import { size } from "@repo/ui/tokens.stylex";
import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { AddToCart } from "@/features/cart/components/AddToCart";
import { AddToFavorite } from "@/features/favorites/components/AddToFavorite";
import { ProductCarousel } from "@/features/products/components/ProductCarousel";
import { ProductGallery } from "@/features/products/components/ProductGallery";
import { ProductReviews } from "@/features/products/components/ProductReviews";
import { ProductSpecs } from "@/features/products/components/ProductSpecs";

type Props = {
  product: Product;
  relatedProducts: Product[];
};

const styles = stylex.create({
  layout: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr 1fr",
      "@media (width <= 768px)": "1fr",
    },
    gap: size[5],
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: size[3],
  },
  detailsHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: size[2],
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: size[2],
  },
  priceGroup: {
    display: "flex",
    alignItems: "center",
    gap: size[2],
  },
});

export function ProductDetails({ product, relatedProducts }: Props) {
  return (
    <Container as="article">
      <div {...stylex.props(styles.layout)}>
        <ProductGallery images={product.images} title={product.title} />
        <div {...stylex.props(styles.details)}>
          <div {...stylex.props(styles.detailsHeader)}>
            <Prose as="span" variant="label" uppercase>
              {product.category}
            </Prose>
            <AddToFavorite productId={product.id} />
          </div>
          <Display as="h1" variant="display2">
            {product.title}
          </Display>
          <Prose>{product.description}</Prose>
          <div {...stylex.props(styles.priceRow)}>
            <div {...stylex.props(styles.priceGroup)}>
              <Display as="span" variant="display3">
                ${product.price.toFixed(2)}
              </Display>
              {product.discountPercentage > 0 ? (
                <Prose as="span" variant="label">
                  -{product.discountPercentage.toFixed(0)}%
                </Prose>
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
