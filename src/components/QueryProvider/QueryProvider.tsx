"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { QueryProviderProps } from "./types";

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(function createClient() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30_000,
          retry: 1,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
