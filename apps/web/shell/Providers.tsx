"use client";

import { minutesToMs } from "@repo/utils/time";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type PropsWithChildren, useState } from "react";
import { CartProvider } from "@/features/cart/cart-context";
import { FavoritesProvider } from "@/features/favorites/favorites-context";

export function Providers({ children }: PropsWithChildren) {
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
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <CartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CartProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
