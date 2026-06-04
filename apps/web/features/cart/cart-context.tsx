"use client";

import { createContext, use, useEffect, useState } from "react";

type CartContextValue = {
  items: Map<number, number>;
  add: (productId: number) => void;
  remove: (productId: number) => void;
  setQty: (productId: number, quantity: number) => void;
  getQty: (productId: number) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const stored = localStorage.getItem("kern-cart");
    if (!stored) return;
    try {
      setItems(new Map(JSON.parse(stored) as [number, number][]));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("kern-cart", JSON.stringify([...items]));
  }, [items]);

  function mutate(fn: (m: Map<number, number>) => void) {
    setItems((prev) => {
      const next = new Map(prev);
      fn(next);
      return next;
    });
  }

  return (
    <CartContext
      value={{
        items,
        add: (productId) =>
          mutate((m) => m.set(productId, (m.get(productId) ?? 0) + 1)),
        remove: (productId) => mutate((m) => m.delete(productId)),
        setQty: (productId, quantity) =>
          mutate((m) =>
            quantity <= 0 ? m.delete(productId) : m.set(productId, quantity),
          ),
        getQty: (productId) => items.get(productId) ?? 0,
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
