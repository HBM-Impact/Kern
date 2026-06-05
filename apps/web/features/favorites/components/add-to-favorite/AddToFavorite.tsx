"use client";

import { IconButton } from "@repo/ui/buttons/icon-button";
import { Heart } from "lucide-react";
import { useFavorites } from "../../favorites-context";
import styles from "./AddToFavorite.module.css";

type Props = {
  productId: number;
};

export function AddToFavorite({ productId }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);

  return (
    <span className={active ? styles.active : undefined}>
      <IconButton
        icon={<Heart />}
        aria-label={active ? "Remove from favorites" : "Add to favorites"}
        onClick={() => toggle(productId)}
      />
    </span>
  );
}
