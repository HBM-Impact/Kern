import * as stylex from "@stylexjs/stylex";
import { ProductCardSkeleton } from "@/features/products/components/product-card/ProductCardSkeleton";
import { favoritesStyles } from "./styles";

type Props = {
  count: number;
};

export function FavoritesViewSkeleton({ count }: Props) {
  return (
    <ul {...stylex.props(favoritesStyles.grid)}>
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder, no reordering
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
