// Make sure to import `createConfig` from `@privy-io/wagmi`, not `wagmi`
import { createConfig } from "@privy-io/wagmi";
import { http } from "viem";
import { baseSepolia, liskSepolia, mainnet, sepolia } from "viem/chains";

export const config = createConfig({
  chains: [baseSepolia, liskSepolia], // Pass your required chains as an array
  transports: {
    [baseSepolia.id]: http(),
    [liskSepolia.id]: http(),
    // For each of your required chains, add an entry to `transports` with
    // a key of the chain's `id` and a value of `http()`
  },
});
