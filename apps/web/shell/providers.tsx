"use client";

import { minutesToMs } from "@repo/utils/time";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CartProvider } from "@/features/cart/cart-context";
import { FavoritesProvider } from "@/features/favorites/favorites-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: minutesToMs(1),
            gcTime: minutesToMs(5),
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <CartProvider>
      <FavoritesProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
