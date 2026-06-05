import { Skeleton } from "@repo/ui/skeleton";
import styles from "./CartSummary.module.css";

export function CartSummarySkeleton() {
  return (
    <aside className={styles.summary}>
      <Skeleton variant="display4" width="var(--size-13)" />
      <dl className={styles.details}>
        <div className={styles.detailRow}>
          <Skeleton variant="body" width="var(--size-8)" />
          <Skeleton variant="body" width="var(--size-6)" />
        </div>
        <div className={styles.detailRow}>
          <Skeleton variant="body" width="var(--size-9)" />
          <Skeleton variant="body" width="var(--size-8)" />
        </div>
      </dl>
      <div className={styles.totalRow}>
        <Skeleton variant="display4" width="var(--size-8)" />
        <Skeleton variant="display4" width="var(--size-10)" />
      </div>
      <Skeleton variant="button" width="100%" />
    </aside>
  );
}
