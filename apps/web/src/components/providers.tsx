"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { SmoothScroll } from "./smooth-scroll";
const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        forcedTheme="light"
        disableTransitionOnChange
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
