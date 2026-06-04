"use client";

import { createContext, use, useEffect, useState } from "react";

type FavoritesContextValue = {
  favoriteIds: number[];
  isFavorite: (productId: number) => boolean;
  toggle: (productId: number) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("kern-favorites");
    if (!stored) return;
    try {
      setFavorites(new Set(JSON.parse(stored) as number[]));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("kern-favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  function toggle(productId: number) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }

  return (
    <FavoritesContext
      value={{
        favoriteIds: [...favorites],
        isFavorite: (productId) => favorites.has(productId),
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
