"use client";

import { createContext, type PropsWithChildren, use } from "react";
import { useLocalStorage } from "usehooks-ts";
import { favoritesStorage } from "./favorites-storage";

type Context = {
  ids: number[];
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
};

const FavoritesContext = createContext<Context | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [ids, setFavoriteIds] = useLocalStorage<number[]>(
    "kern-favorites",
    [],
    {
      initializeWithValue: false,
      deserializer: (raw) => favoritesStorage.parse(JSON.parse(raw)),
    },
  );

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
