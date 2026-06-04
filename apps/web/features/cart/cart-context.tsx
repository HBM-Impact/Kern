"use client";

import { createContext, use, useEffect, useReducer } from "react";

type CartItem = { productId: number; quantity: number };

type CartAction =
  | { type: "INIT"; items: CartItem[] }
  | { type: "ADD"; productId: number }
  | { type: "REMOVE"; productId: number }
  | { type: "SET_QTY"; productId: number; quantity: number };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "INIT":
      return action.items;
    case "ADD": {
      const existing = state.find((i) => i.productId === action.productId);
      if (existing) {
        return state.map((i) =>
          i.productId === action.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...state, { productId: action.productId, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.productId !== action.productId);
    case "SET_QTY": {
      if (action.quantity <= 0)
        return state.filter((i) => i.productId !== action.productId);
      return state.map((i) =>
        i.productId === action.productId
          ? { ...i, quantity: action.quantity }
          : i,
      );
    }
  }
}

type CartContextValue = {
  items: CartItem[];
  add: (productId: number) => void;
  remove: (productId: number) => void;
  setQty: (productId: number, quantity: number) => void;
  getQty: (productId: number) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const stored = localStorage.getItem("kern-cart");
    if (!stored) return;
    try {
      dispatch({ type: "INIT", items: JSON.parse(stored) as CartItem[] });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("kern-cart", JSON.stringify(items));
  }, [items]);

  return (
    <CartContext
      value={{
        items,
        add: (productId) => dispatch({ type: "ADD", productId }),
        remove: (productId) => dispatch({ type: "REMOVE", productId }),
        setQty: (productId, quantity) =>
          dispatch({ type: "SET_QTY", productId, quantity }),
        getQty: (productId) =>
          items.find((i) => i.productId === productId)?.quantity ?? 0,
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
