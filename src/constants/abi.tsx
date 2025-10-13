import USDC_JSON from "./USDC_ABI.json";
import JAGATOKEN_JSON from "./JAGA_TOKEN_ABI.json";
import JAGASTAKE_JSON from "./JAGA_STAKE_ABI.json";
import INSURANCE_MANAGER_JSON from "./INSURANCE_MANAGER_ABI.json";
import CLAIM_MANAGER_JSON from "./CLAIM_MANAGER_ABI.json";
import DAO_GOVERNANCE_JSON from "./DAO_GOVERNANCE_ABI.json";
import ERC20_ABI_JSON from "./ERC20_ABI.json";
import MORPHO_ABI_JSON from "./MORPHO_ABI.json";
import MORPHO_REINVEST_ABI_JSON from "./MORPHO_REINVEST_ABI.json";
import { baseSepolia, liskSepolia } from "viem/chains";
import { ContractAddresses, Token } from "@/types/stake";
export const ERC20_ABI = ERC20_ABI_JSON;
export const USDC_ABI = USDC_JSON;
export const JAGA_TOKEN_ABI = JAGATOKEN_JSON;
export const JAGA_STAKE_ABI = JAGASTAKE_JSON;
export const INSURANCE_MANAGER_ABI = INSURANCE_MANAGER_JSON;
export const CLAIM_MANAGER_ABI = CLAIM_MANAGER_JSON;
export const DAO_GOVERNANCE_ABI = DAO_GOVERNANCE_JSON;
export const MORPHO_ABI = MORPHO_ABI_JSON;
export const MORPHO_REINVEST_ABI = MORPHO_REINVEST_ABI_JSON;

export const CONTRACTS: Record<number, ContractAddresses> = {
  [baseSepolia.id]: {
    USDC: "0x37C95286A8b3b88755846dE0E16c9B93cAA0c073",
    JAGA_TOKEN: "0x685669079EfeA9EC17E22d52712AD153A47A22B0",
    INSURANCE_MANAGER: "0x39e3a4Ef7bf4f8d19F1b4A8254543147c1381Da9",
    JAGA_STAKE: "0x8eBEbF610bFa0b55B58b45B9cE61a2cCF5C68C9D",
    MORPHO: "0xcD0e4070212936BE838B5696eE636cd611a61e2B",
    CLAIM_MANAGER: "0x023496f9f3d8C1301ec71b8912eADDFDf7F767Ba",
    DAO_GOVERNANCE: "0x01B970195f1cCEb1E289D33F4659a57043fFda3F",
    MORPHO_REINVEST: "0xc80B0fe072A26a967060974f7911c0e6Ce41Badc",
  },
  [liskSepolia.id]: {
    USDC: "0x0E0F426A812ed0EE7A4777C9c3b0DF5057C56523",
    JAGA_TOKEN: "0x5287fcEDEF1f494015982C5196aF6815CB3e11A1",
    INSURANCE_MANAGER: "0x785cc2075036DBCC74765E5bE70a4DdbC25A21B2",
    JAGA_STAKE: "0xe2317847BDaf117b4293A1835738ef458CE5f3D7",
    MORPHO: "0xcE06aaCc9ea3Be8DE63d6A0c9fF51cC1A14AdFb7",
    CLAIM_MANAGER: "0x8f762558B21877650c2293c4126A7cCF0Fdb9648",
    DAO_GOVERNANCE: "0x69c4837fC3ea692C93814f1617029E07243444a6",
    MORPHO_REINVEST: "0x74FD13634185Aee87eFa4911C7B3E214F352A9F3",
  },
};

// Token configurations
export const TOKENS: Record<
  number,
  {
    JAGA: Token;
    USDC: Token;
  }
> = {
  [baseSepolia.id]: {
    JAGA: {
      address: CONTRACTS[baseSepolia.id].JAGA_TOKEN,
      symbol: "JAGA",
      name: "JagaDAO Token",
      decimals: 6,
      logo: "🛡️",
    },
    USDC: {
      address: CONTRACTS[baseSepolia.id].USDC,
      symbol: "USDC",
      name: "USDC",
      decimals: 6,
      logo: "💵",
    },
  },
  [liskSepolia.id]: {
    JAGA: {
      address: CONTRACTS[liskSepolia.id].JAGA_TOKEN,
      symbol: "JAGA",
      name: "JagaDAO Token",
      decimals: 6,
      logo: "🛡️",
    },
    USDC: {
      address: CONTRACTS[liskSepolia.id].USDC,
      symbol: "USDC",
      name: "USDC",
      decimals: 6,
      logo: "💵",
    },
  },
};

export function getContracts(chainId?: number) {
  return CONTRACTS[chainId ?? liskSepolia.id];
}

export function getTokens(chainId?: number) {
  return TOKENS[chainId ?? liskSepolia.id];
}
