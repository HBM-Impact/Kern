"use client";

import { IconButton } from "@repo/ui/buttons/icon-button";
import { Heart } from "lucide-react";
import { useFavorites } from "../favorites-context";

type Props = {
  productId: number;
};

export function AddToFavorite({ productId }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);

  // The active look was a `.active button` / `.active svg` wrapper reaching
  // into IconButton. It is a variant plus a filled icon now — no wrapper span,
  // and nothing styling another component's internals.
  return (
    <IconButton
      variant={active ? "accent" : "default"}
      icon={<Heart size={16} fill={active ? "currentColor" : "none"} />}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={() => toggle(productId)}
    />
  );
}
