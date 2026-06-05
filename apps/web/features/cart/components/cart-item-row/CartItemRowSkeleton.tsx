import { Skeleton } from "@repo/ui/skeleton";
import styles from "./CartItemRow.module.css";

export function CartItemRowSkeleton() {
  return (
    <li className={styles.row}>
      <Skeleton style={{ width: "6rem", height: "4.5rem", flexShrink: 0 }} />
      <div className={styles.body}>
        <Skeleton variant="label" width="var(--size-10)" />
        <Skeleton variant="body" width="75%" />
        <Skeleton variant="body" width="var(--size-9)" />
      </div>
      <div className={styles.actions}>
        <Skeleton style={{ width: "8rem", height: "2.5rem" }} />
        <div className={styles.subtotalRow}>
          <Skeleton variant="body" width="var(--size-9)" />
          <Skeleton variant="button" width="var(--size-10)" />
        </div>
      </div>
    </li>
  );
}
