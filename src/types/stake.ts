import type { Address } from "viem";

export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logo: string;
}

export type Policy = {
  tier: bigint;
  startTime: bigint;
  duration: bigint;
  coveredAddress: `0x${string}`;
};

export type ContractAddresses = {
  USDC: Address;
  JAGA_TOKEN: Address;
  INSURANCE_MANAGER: Address;
  JAGA_STAKE: Address;
  MORPHO: Address;
  CLAIM_MANAGER: Address;
  DAO_GOVERNANCE: Address;
  MORPHO_REINVEST: Address;
};
