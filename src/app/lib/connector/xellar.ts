import { defaultConfig } from "@xellar/kit";
import { liskSepolia } from "viem/chains";
import { Config } from "wagmi";

export const config = defaultConfig({
  appName: "Xellar",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  xellarAppId: process.env.NEXT_PUBLIC_XELLAR_API_KEY,
  xellarEnv: "sandbox",
  chains: [liskSepolia],
  ssr: true,
}) as Config;
