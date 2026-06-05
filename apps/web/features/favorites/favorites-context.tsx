"use client";

import { createContext, type PropsWithChildren, use } from "react";
import { useLocalStorage } from "usehooks-ts";

type Context = {
  ids: number[];
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
};

const FavoritesContext = createContext<Context | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    "kern-favorites",
    [],
    { initializeWithValue: false },
  );

  const ids = favoriteIds ?? [];

  function toggle(id: number) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  return (
    <FavoritesContext
      value={{
        ids,
        isFavorite: (id) => ids.includes(id),
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
