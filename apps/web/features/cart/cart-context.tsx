"use client";

import { createContext, use } from "react";
import { useLocalStorage } from "usehooks-ts";

type CartContextValue = {
  items: Map<number, number>;
  add: (id: number) => void;
  remove: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useLocalStorage<[number, number][]>(
    "kern-cart",
    [],
  );
  const items = new Map(entries);

  function mutate(fn: (draft: Map<number, number>) => void) {
    setEntries((prev) => {
      const draft = new Map(prev);
      fn(draft);
      return [...draft];
    });
  }

  return (
    <CartContext
      value={{
        items,
        add: (id) => mutate((draft) => draft.set(id, (draft.get(id) ?? 0) + 1)),
        remove: (id) => mutate((draft) => draft.delete(id)),
        setQuantity: (id, quantity) =>
          mutate((draft) =>
            quantity <= 0 ? draft.delete(id) : draft.set(id, quantity),
          ),
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart() {
  const ctx = use(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
