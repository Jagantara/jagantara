"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { Config, State, WagmiProvider } from "wagmi";

import { darkTheme, XellarKitProvider } from "@xellar/kit";
import { config } from "./lib/connector/xellar";
import { ThemeProvider } from "./components/theme-provider";
export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [wagmiConfig] = useState<Config>(() => config);
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme} showConfirmationModal={true}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {props.children}
          </ThemeProvider>
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
