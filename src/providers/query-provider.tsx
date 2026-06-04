"use client";

import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus:
              false,
          },
        },
      })
  );

  return (
    <QueryClientProvider
      client={queryClient}
    >
    <ToastProvider>
      {children}
    </ToastProvider>
    </QueryClientProvider>
  );
}