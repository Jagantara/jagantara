import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CONTRACTS, ERC20_ABI, INSURANCE_MANAGER_ABI } from "@/constants/abi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/app/lib/connector/xellar";

import { useState } from "react";
import toast from "react-hot-toast";
import { parseTokenAmount } from "@/lib/calculations";
import { Policy } from "@/types/stake";

export const useInsuranceManager = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isPaying, setIsPaying] = useState(false);

  // 🧠 READ: isActive status
  const {
    data: isActive,
    isLoading: isActiveLoading,
    refetch: refetchIsActive,
  } = useReadContract({
    address: CONTRACTS.INSURANCE_MANAGER as `0x${string}`,
    abi: INSURANCE_MANAGER_ABI,
    functionName: "isActive",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 30000,
    },
  });

  const {
    data: policy,
    isLoading: isPolicyLoading,
    refetch: refetchPolicy,
  } = useReadContract({
    address: CONTRACTS.INSURANCE_MANAGER as `0x${string}`,
    abi: INSURANCE_MANAGER_ABI,
    functionName: "policies",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 30000,
    },
  }) as { data: any; isLoading: boolean; refetch: () => void };

  // 🛠 WRITE: Pay Premium
  const payPremium = async (
    tier: number,
    duration: number,
    coveredAddress: string,
    amount: string
  ): Promise<boolean> => {
    if (!address || !tier || !duration || !coveredAddress) return false;
    setIsPaying(true);
    const premiumPrice = await readContract(config, {
      address: CONTRACTS.INSURANCE_MANAGER,
      abi: INSURANCE_MANAGER_ABI,
      functionName: "tierToPrice",
      args: [tier],
    });

    const expectedPremium = BigInt(premiumPrice as string) * BigInt(duration);
    console.log("EXPECTED PREMIUM: ", expectedPremium.toString());

    try {
      const expectedPremium = Number(premiumPrice) * duration;
      console.log("EXPECTED PREMIUM: ", expectedPremium);
      // 1. Approve USDC
      const approveHash = await writeContractAsync({
        address: CONTRACTS.USDC,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [CONTRACTS.INSURANCE_MANAGER, expectedPremium],
        account: address,
      });
      await waitForTransactionReceipt(config, { hash: approveHash });
      toast.loading("Paying insurance premium...", { id: "payPremium" });

      const hash = await writeContractAsync({
        address: CONTRACTS.INSURANCE_MANAGER as `0x${string}`,
        abi: INSURANCE_MANAGER_ABI,
        functionName: "payPremium",
        args: [tier, duration, coveredAddress],
        account: address,
      });

      await waitForTransactionReceipt(config, { hash });

      toast.success("Insurance premium paid!", { id: "payPremium" });

      refetchIsActive();
      refetchPolicy();
      return true;
    } catch (err) {
      console.error("payPremium error", err);
      toast.error("Failed to pay premium", { id: "payPremium" });
      return false;
    } finally {
      setIsPaying(false);
    }
  };

  return {
    isActive: (isActive as boolean) || false,
    isActiveLoading,
    refetchIsActive,
    policy,
    isPolicyLoading,
    refetchPolicy,
    payPremium,
    isPaying,
  };
};
