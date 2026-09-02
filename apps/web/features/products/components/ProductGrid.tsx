import type { Product } from "@repo/services/commerce/commerce-types";
import { Button } from "@repo/ui/buttons";
import { size } from "@repo/ui/tokens.stylex";
import { Prose } from "@repo/ui/typography/prose";
import * as stylex from "@stylexjs/stylex";
import { ProductCard } from "./product-card/ProductCard";
import { ProductCardSkeleton } from "./product-card/ProductCardSkeleton";

type Props = {
  products: Product[];
  hasMore: boolean;
  isLoading: boolean;
  isFetchingMore: boolean;
  onLoadMore?: () => void;
  skeletonCount?: number;
};

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: size[4],
    alignItems: "flex-start",
  },
  loadMore: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: size[3],
    listStyle: "none",
    width: "100%",
  },
});

function SkeletonList({ count }: { count: number }) {
  return Array.from({ length: count }, (_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: stateless placeholders, never reordered
    <li key={i}>
      <ProductCardSkeleton />
    </li>
  ));
}

export function ProductGrid({
  products,
  hasMore,
  isLoading,
  isFetchingMore,
  onLoadMore,
  skeletonCount = 12,
}: Props) {
  if (isLoading) {
    return (
      <ul {...stylex.props(styles.grid)}>
        <SkeletonList count={skeletonCount} />
      </ul>
    );
  }

  if (products.length === 0) {
    return <Prose>No products found.</Prose>;
  }

  return (
    <div {...stylex.props(styles.wrapper)}>
      <ul {...stylex.props(styles.grid)}>
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              discountPercentage={product.discountPercentage}
              category={product.category}
              images={product.images}
              priority={index < 4}
            />
          </li>
        ))}
        {isFetchingMore ? <SkeletonList count={skeletonCount} /> : null}
      </ul>
      {hasMore && !isFetchingMore ? (
        <div {...stylex.props(styles.loadMore)}>
          <Button onClick={onLoadMore}>Load more</Button>
        </div>
      ) : null}
    </div>
  );
}
