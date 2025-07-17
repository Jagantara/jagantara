import { defaultConfig } from "@xellar/kit";
import {
  Chain,
  lisk,
  liskSepolia,
  mainnet,
  monadTestnet,
  sepolia,
} from "viem/chains";
import { Config } from "wagmi";

const liskTestnet: Chain = {
  id: 4202,
  name: "Lisk Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "LSK",
    symbol: "LSK",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"],
    },
    public: {
      http: ["https://rpc.sepolia-api.lisk.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Block Scout",
      url: "https://sepolia-blockscout.lisk.com",
    },
  },
  testnet: true,
};
export const config = defaultConfig({
  appName: "Xellar",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  xellarAppId: process.env.XELLAR_API_KEY,
  xellarEnv: "sandbox",
  chains: [mainnet, sepolia, monadTestnet, lisk, liskTestnet],
  ssr: false,
}) as Config;
