import { defaultConfig } from "@xellar/kit";
import { baseSepolia, liskSepolia } from "viem/chains";
import { Config } from "wagmi";

export const config = defaultConfig({
  appName: "Xellar",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  xellarAppId:
    process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID ??
    "46574487-464a-4487-9029-56278f8ba8ff",
  xellarEnv: "sandbox",
  chains: [liskSepolia, baseSepolia],
  ssr: true,
}) as Config;
