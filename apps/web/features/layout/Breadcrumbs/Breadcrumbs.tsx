import { ChevronRight, House } from "lucide-react";
import styles from "./Breadcrumbs.module.css";

type Props = {
  path: string;
};

export function Breadcrumbs({ path }: Props) {
  const segments = path.split("/").filter(Boolean);
  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <a href="/" aria-label="Home" className={styles.link}>
            <House />
          </a>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = decodeURIComponent(segment).replaceAll("-", " ");
          return (
            <li key={href} className={styles.item}>
              <ChevronRight />
              {isLast ? (
                <span aria-current="page" className={styles.current}>
                  {label}
                </span>
              ) : (
                <a href={href} className={styles.link}>
                  {label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
