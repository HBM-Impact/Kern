import { Skeleton } from "@repo/ui/skeleton";
import styles from "./ProductCard.module.css";

export function ProductCardSkeleton() {
  return (
    <article className={styles.card}>
      <Skeleton width="100%" style={{ height: "250px", borderRadius: 0 }} />
      <div className={styles.body}>
        <Skeleton variant="label" width="var(--size-10)" />
        <Skeleton variant="body" width="75%" />
        <Skeleton variant="label" width="100%" />
        <Skeleton variant="label" width="60%" />
        <div className={styles.meta}>
          <Skeleton variant="body" width="var(--size-9)" />
          <Skeleton variant="button" width="var(--size-11)" />
        </div>
      </div>
    </article>
  );
}
