import type { Product } from "@repo/services/commerce/commerce-types";
import { Button } from "@repo/ui/buttons";
import { Prose } from "@repo/ui/typography/prose";
import { ProductCard, ProductCardSkeleton } from "../product-card";
import styles from "./ProductGrid.module.css";

type Props = {
  products: Product[];
  hasMore: boolean;
  isLoading: boolean;
  isFetchingMore: boolean;
  onLoadMore?: () => void;
  skeletonCount?: number;
};

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
      <ul className={styles.grid}>
        <SkeletonList count={skeletonCount} />
      </ul>
    );
  }

  if (products.length === 0) {
    return <Prose>No products found.</Prose>;
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.grid}>
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
        <div className={styles.loadMore}>
          <Button onClick={onLoadMore}>Load more</Button>
        </div>
      ) : null}
    </div>
  );
}
