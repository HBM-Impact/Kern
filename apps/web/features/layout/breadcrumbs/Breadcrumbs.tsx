import { ChevronRight, House } from "lucide-react";
import type { ComponentProps } from "react";
import { IntlLink } from "@/i18n/navigation";
import styles from "./Breadcrumbs.module.css";

type Href = ComponentProps<typeof IntlLink>["href"];

type Props = {
  items: { href?: Href; label: string }[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <IntlLink href="/" aria-label="Home" className={styles.link}>
            <House />
          </IntlLink>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              <ChevronRight />
              {isLast || !item.href ? (
                <span aria-current="page" className={styles.current}>
                  {item.label}
                </span>
              ) : (
                <IntlLink href={item.href} className={styles.link}>
                  {item.label}
                </IntlLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
