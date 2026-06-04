import type { Category } from "@repo/services/commerce/commerce-types";
import { Link } from "@/primitives/link";
import styles from "./CategoryList.module.css";

type Props = { categories: Category[] };

export function CategoryList({ categories }: Props) {
  return (
    <nav>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={{
                pathname: "/products/[category]",
                params: { category: category.slug },
              }}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
