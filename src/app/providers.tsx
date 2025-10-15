"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { Config, State } from "wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { darkTheme, XellarKitProvider } from "@xellar/kit";
import { WagmiProvider } from "@privy-io/wagmi";
import { ThemeProvider } from "@/components/theme-provider";
import FadeContent from "@/components/fade-content";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/graphql";
import { baseSepolia, liskSepolia } from "viem/chains";
import { config } from "./lib/wagmi";
export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [wagmiConfig] = useState<Config>(() => config);
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID ?? ""}
      config={{
        // Create embedded wallets for users who don't have a wallet
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia, liskSepolia],
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        appearance: {
          walletList: [
            "metamask",
            "coinbase_wallet",
            "base_account",
            "detected_ethereum_wallets",
          ],
          theme: "light",
          showWalletLoginFirst: true,
          walletChainType: "ethereum-only",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ApolloProvider client={apolloClient}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {/* <XellarKitProvider theme={darkTheme} showConfirmationModal={true}> */}
              {/* <FadeContent
              blur={false}
              duration={2000}
              easing="ease-out"
              initialOpacity={0}
            > */}
              {/* {props.children} */}
              {/* </FadeContent> */}
              {/* </XellarKitProvider> */}

              {props.children}
            </ThemeProvider>
          </ApolloProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
