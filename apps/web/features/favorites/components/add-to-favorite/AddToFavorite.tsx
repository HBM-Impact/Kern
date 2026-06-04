"use client";

import { IconButton } from "@repo/ui/buttons/icon-button";
import clsx from "clsx";
import { Heart } from "lucide-react";
import { useFavorites } from "../../favorites-context";
import styles from "./AddToFavorite.module.css";

type Props = {
  productId: number;
  className?: string;
};

export function AddToFavorite({ productId, className }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);

  return (
    <IconButton
      icon={<Heart />}
      className={clsx(active && styles.active, className)}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={() => toggle(productId)}
    />
  );
}
