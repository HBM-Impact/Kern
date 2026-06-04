"use client";

import { createContext, use } from "react";
import { useLocalStorage } from "usehooks-ts";

type FavoritesContextValue = {
  ids: number[];
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    "kern-favorites",
    [],
  );

  function toggle(id: number) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  return (
    <FavoritesContext
      value={{
        ids: favoriteIds,
        isFavorite: (id) => favoriteIds.includes(id),
        toggle,
      }}
    >
      {children}
    </FavoritesContext>
  );
}

export function useFavorites() {
  const ctx = use(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
