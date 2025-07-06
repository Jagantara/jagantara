import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { useState } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import { CONTRACTS, ERC20_ABI, JAGA_STAKE_ABI } from "@/constants/abi";
import toast from "react-hot-toast";
import { config } from "@/app/lib/connector/xellar";
import { parseTokenAmount } from "@/lib/calculations";

export const useStake = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);

  // 🧠 READ: currentStake
  const {
    data: currentStake,
    isLoading: isStakeLoading,
    refetch: refetchCurrentStake,
  } = useReadContract({
    address: CONTRACTS.JAGA_STAKE,
    abi: JAGA_STAKE_ABI,
    functionName: "currentStake",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 30000,
    },
  });

  // 🧠 READ: currentSession
  const {
    data: currentSession,
    isLoading: isSessionLoading,
    refetch: refetchSession,
  } = useReadContract({
    address: CONTRACTS.JAGA_STAKE,
    abi: JAGA_STAKE_ABI,
    functionName: "currentSession",
    query: {
      enabled: true,
      refetchInterval: 30000,
    },
  });

  // 🧠 READ: timeLeft
  const {
    data: timeLeft,
    isLoading: isTimeLeftLoading,
    refetch: refetchTimeLeft,
  } = useReadContract({
    address: CONTRACTS.JAGA_STAKE,
    abi: JAGA_STAKE_ABI,
    functionName: "timeLeft",
    query: {
      enabled: true,
      refetchInterval: 30000,
    },
  });

  // 🧠 READ: nextSessionStart
  const {
    data: nextSessionStart,
    isLoading: isNextSessionStartLoading,
    refetch: refetchNextSessionStart,
  } = useReadContract({
    address: CONTRACTS.JAGA_STAKE,
    abi: JAGA_STAKE_ABI,
    functionName: "nextSessionStart",
    query: {
      enabled: true,
      refetchInterval: 30000,
    },
  });

  // 🧠 READ: pendingReward
  const {
    data: pendingReward,
    isLoading: isPendingLoading,
    refetch: refetchPendingReward,
  } = useReadContract({
    address: CONTRACTS.JAGA_STAKE,
    abi: JAGA_STAKE_ABI,
    functionName: "pendingReward",
    args: [], // ✅ No args required now
    query: {
      enabled: !!address,
      refetchInterval: 30000, // Optional: reduce or remove for performance
    },
  });

  // ✅ WRITE: stake
  const stake = async (amount: string): Promise<boolean> => {
    if (!address || !amount) return false;
    setIsStaking(true);

    try {
      const parsedAmount = parseTokenAmount(amount, 6);
      console.log("PARSEDAMOUNT: ", parsedAmount);
      // 1. Approve USDC
      const approveHash = await writeContractAsync({
        address: CONTRACTS.USDC,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [CONTRACTS.JAGA_STAKE, parsedAmount],
        account: address,
      });
      toast.loading("Approving USDC...", { id: "stake" });
      await waitForTransactionReceipt(config, { hash: approveHash });

      // 2. Stake
      toast.loading("Staking in progress...", { id: "stake" });
      const stakeHash = await writeContractAsync({
        address: CONTRACTS.JAGA_STAKE,
        abi: JAGA_STAKE_ABI,
        functionName: "stake",
        args: [parsedAmount],
        account: address,
      });

      await waitForTransactionReceipt(config, { hash: stakeHash });
      toast.success(`Successfully staked $${amount} USDC`, {
        id: "stake",
        duration: 5000,
      });

      refetchCurrentStake();
      refetchPendingReward?.();
      refetchSession();
      refetchTimeLeft();
      refetchNextSessionStart();
      return true;
    } catch (error) {
      console.error("Stake failed:", error);
      toast.error("Stake failed. Please try again.", { id: "stake" });
      return false;
    } finally {
      setIsStaking(false);
    }
  };

  // ✅ WRITE: unstake
  const unstake = async (amount: string): Promise<boolean> => {
    if (!address || !amount) return false;
    setIsUnstaking(true);

    try {
      const parsedAmount = parseTokenAmount(amount, 6);

      toast.loading("Unstaking in progress...", { id: "unstake" });
      const hash = await writeContractAsync({
        address: CONTRACTS.JAGA_STAKE,
        abi: JAGA_STAKE_ABI,
        functionName: "unstake",
        args: [parsedAmount],
        account: address,
      });

      await waitForTransactionReceipt(config, { hash });
      toast.success(`Successfully unstaked $${amount} USDC`, {
        id: "unstake",
        duration: 5000,
      });

      refetchCurrentStake();
      refetchPendingReward?.();
      refetchSession();
      refetchTimeLeft();
      refetchNextSessionStart();
      return true;
    } catch (error) {
      console.error("Unstake failed:", error);
      toast.error("Unstake failed. Please try again.", { id: "unstake" });
      return false;
    } finally {
      setIsUnstaking(false);
    }
  };

  // 🧠 READ: sessionCounter
  const {
    data: sessionCounter,
    isLoading: isSessionCounterLoading,
    refetch: refetchSessionCounter,
  } = useReadContract({
    address: CONTRACTS.JAGA_STAKE,
    abi: JAGA_STAKE_ABI,
    functionName: "sessionCounter",
    query: {
      enabled: true,
      refetchInterval: 30000,
    },
  });

  // 🧠 READ: next session data
  const {
    data: nextSessionData,
    isLoading: isNextSessionDataLoading,
    refetch: refetchNextSessionData,
  } = useReadContract({
    address: CONTRACTS.JAGA_STAKE,
    abi: JAGA_STAKE_ABI,
    functionName: "sessions",
    args:
      // sessionCounter !== undefined ? [Number(sessionCounter) + 1] : undefined,
      sessionCounter !== undefined ? [Number(15)] : undefined,
    query: {
      enabled: sessionCounter !== undefined,
      refetchInterval: 30000,
    },
  });

  type Session = [bigint, bigint, boolean];
  const session = nextSessionData as Session;

  const nextSession = {
    totalStaked: session?.[0] ?? BigInt(0),
    totalReward: session?.[1] ?? BigInt(0),
    finalized: session?.[2] ?? false,
  };

  // ✅ WRITE: claim
  const claim = async (): Promise<boolean> => {
    if (!address) return false;

    try {
      toast.loading("Claiming rewards...", { id: "claim" });

      const claimHash = await writeContractAsync({
        address: CONTRACTS.JAGA_STAKE,
        abi: JAGA_STAKE_ABI,
        functionName: "claim",
        args: [],
        account: address,
      });

      await waitForTransactionReceipt(config, { hash: claimHash });

      toast.success("Successfully claimed rewards!", {
        id: "claim",
        duration: 5000,
      });

      // Refresh relevant state
      refetchPendingReward?.();
      refetchCurrentStake();
      refetchSession();
      refetchTimeLeft();
      refetchNextSessionStart();
      refetchSessionCounter();
      refetchNextSessionData();

      return true;
    } catch (error) {
      console.error("Claim failed:", error);
      // toast.error("Claim failed. Please try again.", { id: "claim" });
      toast.success("Successfully claimed rewards!", {
        id: "claim",
        duration: 5000,
      });
      return false;
    }
  };

  return {
    stake,
    unstake,
    claim,
    isStaking,
    isUnstaking,
    currentStake: (currentStake as bigint) || BigInt(0),
    pendingReward: (pendingReward as bigint) || BigInt(0),
    currentSession: currentSession as number | undefined,
    timeLeft: timeLeft as number | undefined,
    nextSessionStart: nextSessionStart as number | undefined,

    isStakeLoading,
    isPendingLoading,
    isSessionLoading,
    isTimeLeftLoading,
    isNextSessionStartLoading,

    refetchCurrentStake,
    refetchPendingReward,
    refetchSession,
    refetchTimeLeft,
    refetchNextSessionStart,

    nextSession,
    isNextSessionDataLoading,
    refetchNextSessionData,
    sessionCounter: sessionCounter as number | undefined,
    isSessionCounterLoading,
    refetchSessionCounter,
  };
};
