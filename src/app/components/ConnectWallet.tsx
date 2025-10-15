"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { ChevronDown, User, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { baseSepolia, Chain, liskSepolia } from "viem/chains";
import { useChainId, useDisconnect } from "wagmi";

const SUPPORTED_CHAINS = [baseSepolia, liskSepolia];

const CHAIN_LOGOS: Record<number, string> = {
  [baseSepolia.id]: "/base_logo.webp",
  [liskSepolia.id]: "/lisk_white.png",
};

export default function ConnectWallet() {
  const { login, logout, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [currentChain, setCurrentChain] = useState<Chain>(baseSepolia);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const wallet = wallets[0];
  const address = wallet?.address;
  const shortAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  // Track which chain you're on
  useEffect(() => {
    const matched = SUPPORTED_CHAINS.find((c) => c.id === chainId);
    if (matched) setCurrentChain(matched);
  }, [chainId]);

  const switchChain = async (chain: Chain) => {
    try {
      if (wallet?.switchChain) {
        await wallet.switchChain(chain.id);
        setCurrentChain(chain);
      } else {
        alert("Your connected wallet does not support chain switching.");
      }
    } catch (err) {
      console.error("Failed to switch chain:", err);
    }
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      await disconnect();
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

  if (!ready) {
    return (
      <div className="px-3 py-2 rounded-xl bg-gray-700 text-sm text-[var(--text)]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 relative">
      {/* Chain Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex cursor-pointer items-center gap-1 md:gap-2 px-3 py-2 rounded-xl bg-gray-800 text-sm font-medium text-[var(--text)]"
        >
          <img
            src={CHAIN_LOGOS[currentChain.id]}
            alt={currentChain.name}
            className="w-5 h-5 rounded-full"
          />
          <span className="hidden sm:inline md:text-md text-sm">
            {currentChain.name}
          </span>
          <ChevronDown
            className={`hidden sm:block w-3 h-3 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full mt-2 w-full min-w-[160px] text-white bg-gray-800 rounded-xl border border-gray-700 shadow-md z-50">
            {SUPPORTED_CHAINS.map((chain) => (
              <button
                key={chain.id}
                onClick={() => switchChain(chain)}
                className={`flex items-center cursor-pointer gap-2 w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition ${
                  currentChain.id === chain.id ? "bg-gray-700" : ""
                }`}
              >
                <img
                  src={CHAIN_LOGOS[chain.id]}
                  alt={chain.name}
                  className="w-4 h-4 rounded-full"
                />
                <span className="md:text-md text-sm text-white">
                  {chain.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Wallet Connect Button */}
      {!authenticated ? (
        <button
          className="group flex items-center px-3 py-2 rounded-xl transition-all duration-300 glow-blue cursor-pointer"
          style={{ background: "var(--gradient-accent-soft)" }}
          onClick={login}
        >
          <div className="relative flex items-center gap-2">
            <Wallet className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span className="hidden md:flex text-sm font-bold">
              Connect Wallet
            </span>
            <span className="flex md:hidden text-sm font-bold">Connect</span>
          </div>
        </button>
      ) : (
        <button
          className="group relative overflow-hidden px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer glow-blue"
          onClick={handleLogout}
          style={{ background: "var(--gradient-accent-soft)" }}
        >
          <div className="relative flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "var(--accent)" }}
              >
                <User className="w-3 h-3" />
              </div>
              <span className="text-xs font-mono">{shortAddr}</span>
              <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
