import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { useState } from "react";
import { config } from "@/app/lib/connector/xellar";
import { DAO_GOVERNANCE_ABI, CONTRACTS } from "@/constants/abi";
import toast from "react-hot-toast";

// Types
export enum ClaimStatus {
  Pending,
  Approved,
  Rejected,
}

export const useDAOGovernance = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // 🔹 Submit a claim
  const submitClaim = async (
    reason: string,
    title: string,
    claimType: string,
    amount: bigint
  ): Promise<number | null> => {
    if (!address) return null;
    setIsSubmitting(true);
    try {
      const hash = await writeContractAsync({
        address: CONTRACTS.DAO_GOVERNANCE,
        abi: DAO_GOVERNANCE_ABI,
        functionName: "submitClaim",
        args: [reason, title, claimType, amount],
        account: address,
      });
      await waitForTransactionReceipt(config, { hash });
      toast.success("Claim submitted successfully");
      // Cannot return claim ID directly, would need to extract from event logs or track manually
      return null;
    } catch (err) {
      console.error("submitClaim error", err);
      toast.error("Claim submission failed");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 Vote on a claim
  const voteOnClaim = async (claimId: number, approve: boolean) => {
    if (!address) return;
    setIsVoting(true);
    try {
      const hash = await writeContractAsync({
        address: CONTRACTS.DAO_GOVERNANCE,
        abi: DAO_GOVERNANCE_ABI,
        functionName: "vote",
        args: [claimId, approve],
        account: address,
      });
      await waitForTransactionReceipt(config, { hash });
      toast.success("Vote cast successfully");
    } catch (err) {
      console.error("voteOnClaim error", err);
      toast.error("Failed to cast vote");
    } finally {
      setIsVoting(false);
    }
  };

  // 🔹 Execute vote
  const executeVote = async (claimId: number): Promise<number | null> => {
    if (!address) return null;
    setIsExecuting(true);
    try {
      const hash = await writeContractAsync({
        address: CONTRACTS.DAO_GOVERNANCE,
        abi: DAO_GOVERNANCE_ABI,
        functionName: "executeVote",
        args: [claimId],
        account: address,
      });
      const receipt = await waitForTransactionReceipt(config, { hash });
      toast.success("Vote executed");
      return null; // Ratio can be read from the event if needed
    } catch (err) {
      console.error("executeVote error", err);
      toast.error("Vote execution failed");
      return null;
    } finally {
      setIsExecuting(false);
    }
  };

  // 🔹 Read claim status
  const getClaimStatus = async (
    claimId: number
  ): Promise<ClaimStatus | null> => {
    try {
      const status = await readContract(config, {
        address: CONTRACTS.DAO_GOVERNANCE,
        abi: DAO_GOVERNANCE_ABI,
        functionName: "getClaimStatus",
        args: [claimId],
      });
      return status as ClaimStatus;
    } catch (err) {
      console.error("getClaimStatus error", err);
      return null;
    }
  };

  // 🔹 Read claim data
  const getClaimData = async (
    claimId: number
  ): Promise<{
    claimant: string;
    amount: bigint;
    approvedAt: bigint;
  } | null> => {
    try {
      const [claimant, amount, approvedAt] = (await readContract(config, {
        address: CONTRACTS.DAO_GOVERNANCE,
        abi: DAO_GOVERNANCE_ABI,
        functionName: "getClaimData",
        args: [claimId],
      })) as [string, bigint, bigint];

      return { claimant, amount, approvedAt };
    } catch (err) {
      console.error("getClaimData error", err);
      return null;
    }
  };

  return {
    submitClaim,
    voteOnClaim,
    executeVote,
    getClaimStatus,
    getClaimData,
    isSubmitting,
    isVoting,
    isExecuting,
  };
};
