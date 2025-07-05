import { TOKENS } from "@/constants/abi";
import { useStake } from "@/hooks/useJagaStake";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { formatTokenAmount } from "@/lib/formatters";
import {
  formatNextSessionDate,
  formatTimeLeft,
  formatUnixToDate,
  getActiveFrom,
} from "@/lib/utils";
import { Token } from "@/types/stake";
import { ArrowDown, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function DepositInterface() {
  const { stake, isStaking, timeLeft, nextSessionStart, currentSession } =
    useStake();
  const [amountIn, setAmountIn] = useState<string>("");
  const [tokenIn, setTokenIn] = useState<Token>(TOKENS.USDC);
  const [tokenOut, setTokenOut] = useState<Token>(TOKENS.JAGA);
  const amountOut = amountIn || "0.0";
  const tokenInBalance = useTokenBalance(tokenIn);
  const tokenOutBalance = useTokenBalance(tokenOut);
  console.log("NEXT SESISON START: ", nextSessionStart);
  console.log("Current SESISON START: ", currentSession);
  const isInsufficientBalance = () => {
    const formatted = formatTokenAmount(
      tokenInBalance.balance,
      tokenIn.symbol as keyof typeof TOKENS // ✅ use tokenIn here
    );

    const balance = parseFloat(formatted.replace(/,/g, "")); // ✅ strip commas just in case
    return parseFloat(amountIn || "0") > balance;
  };

  const handleStake = async () => {
    if (isStaking || isInsufficientBalance() || !amountIn) return;

    const success = await stake(amountIn);
    if (success) {
      setAmountIn("");
      tokenInBalance.refetch();
      tokenOutBalance.refetch();
    }
  };

  const handleMaxClick = () => {
    const balance =
      Number(tokenInBalance.balance) / Math.pow(10, tokenIn.decimals);
    setAmountIn(balance.toString());
  };

  return (
    <div className="w-full  mx-auto px-4 sm:px-0">
      <div className="glass rounded-2xl p-5 sm:p-6 lg:p-8 card-hover border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Deposit Tokens</h2>
        </div>
        {/* Token Input */}
        <div className="space-y-3 sm:space-y-4 mb-6">
          <div className="relative">
            <div className="p-3 sm:p-4 rounded-xl border bg-[var(--secondary)] border-slate-400">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm opacity-70">USDC</span>
                <span className="text-xs sm:text-sm truncate ml-2 opacity-70">
                  Balance:{" "}
                  {formatTokenAmount(
                    tokenInBalance.balance,
                    tokenIn.symbol as keyof typeof TOKENS
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 ">
                <input
                  type="number"
                  value={amountIn}
                  onChange={(e) => setAmountIn(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-lg sm:text-2xl font-bold outline-none input-primary min-w-0 border px-2 py-1 rounded-md border-slate-400"
                />
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleMaxClick}
                    className="px-2 py-1 text-xs rounded font-medium hover:bg-white/20 transition-colors whitespace-nowrap text-[var(--primary)] cursor-pointer"
                  >
                    MAX
                  </button>
                  <div
                    className="flex items-center gap-1 sm:gap-2 p-2 rounded-xl border"
                    style={{
                      backgroundColor: "rgba(131, 110, 249, 0.1)",
                      borderColor: "rgba(131, 110, 249, 0.3)",
                    }}
                  >
                    <span className="text-base sm:text-lg">💵</span>
                    <span className="font-normal text-sm ">USDC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center ">
          <ArrowDown className="w-6 h-6 float-animation" />
        </div>

        {/* Token Output */}
        <div className="relative mt-5">
          <div className="p-3 sm:p-4 rounded-xl border border-slate-400 bg-[var(--secondary)]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm opacity-70">JAGA</span>
              <span className="text-xs sm:text-sm truncate ml-2 opacity-70">
                Balance:{" "}
                {formatTokenAmount(
                  tokenOutBalance.balance,
                  tokenOut.symbol as keyof typeof TOKENS
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 text-lg sm:text-2xl font-bold min-w-0 truncate">
                {amountOut || "0.0"}
              </div>
              <div
                className="flex items-center gap-1 sm:gap-2 p-2 rounded-xl border"
                style={{
                  backgroundColor: "rgba(131, 110, 249, 0.1)",
                  borderColor: "rgba(131, 110, 249, 0.3)",
                }}
              >
                <span className="text-base sm:text-lg">🛡️</span>
                <span className="font-normal text-sm ">JAGA</span>
              </div>
            </div>
          </div>
        </div>
        {/* Info */}
        <div className="relative mt-5">
          <div className="p-3 sm:p-4 rounded-xl border border-slate-400 bg-[var(--secondary)]">
            <div className="flex justify-between">
              <p className="opacity-70 font-light">📌 Active From</p>
              <p className="font-medium">{getActiveFrom(timeLeft!)}</p>
            </div>
            <div className="flex justify-between">
              <p className="opacity-70 font-light">⌛ Valid Until</p>
              <p className="font-medium">{formatTimeLeft(timeLeft!)}</p>
            </div>
            <div className="flex justify-between">
              <p className="opacity-70 font-light">🔑 Next Session</p>
              <p className="font-medium">{formatNextSessionDate(timeLeft!)}</p>
            </div>
            <div className="flex justify-between">
              <p className="opacity-70 font-light">🕒 Batch Duration</p>
              <p className="font-medium">30 Days</p>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleStake}
          disabled={!amountIn || isStaking || isInsufficientBalance()}
          className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2  ${
            !amountIn || isStaking || isInsufficientBalance()
              ? "bg-blue-300/30  cursor-not-allowed opacity-70"
              : "bg-[image:var(--gradient-accent-soft)]  hover:opacity-90 cursor-pointer"
          }`}
        >
          {isStaking ? (
            <>
              <div className="spinner w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
              <span>Depositing...</span>
            </>
          ) : isInsufficientBalance() ? (
            "Insufficient Balance"
          ) : !amountIn ? (
            "Enter Amount"
          ) : (
            <>
              <TrendingUp className="w-5 h-5" />
              <span>Deposit Tokens</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
