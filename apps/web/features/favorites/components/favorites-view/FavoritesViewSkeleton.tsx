import { ProductCardSkeleton } from "@/features/products/components/product-card";
import styles from "./FavoritesView.module.css";

type Props = {
  count: number;
};

export function FavoritesViewSkeleton({ count }: Props) {
  return (
    <ul className={styles.grid}>
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
