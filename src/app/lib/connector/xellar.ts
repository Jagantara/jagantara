import { defaultConfig } from "@xellar/kit";
import { liskSepolia, mainnet, monadTestnet, sepolia } from "viem/chains";
import { Config, cookieStorage } from "wagmi";

export const config = defaultConfig({
  appName: "Xellar",
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  xellarAppId: process.env.XELLAR_API_KEY,
  xellarEnv: "sandbox",
  chains: [mainnet, sepolia, liskSepolia, monadTestnet],
  ssr: true,
}) as Config;
