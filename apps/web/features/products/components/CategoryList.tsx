import type { Category } from "@repo/services/commerce/commerce-types";
import { size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Link } from "@/primitives/link/Link";

type Props = { categories: Category[] };

const styles = stylex.create({
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: size[3],
    listStyle: "none",
  },
});

export function CategoryList({ categories }: Props) {
  return (
    <nav>
      <ul {...stylex.props(styles.list)}>
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
