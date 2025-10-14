"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { ChevronDown, User, Wallet, Network } from "lucide-react";
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
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const wallet = wallets[0];
  const address = wallet?.address;
  const shortAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const [currentChain, setCurrentChain] = useState<Chain>(baseSepolia);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    await disconnect();
  };
  // Detect the connected chain
  useEffect(() => {
    const matched = SUPPORTED_CHAINS.find((c) => c.id === chainId);
    if (matched) setCurrentChain(matched);
  }, [chainId]);

  const switchChain = async (chain: any) => {
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
          className="flex cursor-pointer items-center gap-1 md:gap-2 px-3 py-2 rounded-xl bg- text-sm font-mediumtext-[var(--text)]"
        >
          {/* Network Logo — always visible */}
          <img
            src={CHAIN_LOGOS[currentChain.id]}
            alt={currentChain.name}
            className="w-5 h-5 rounded-full"
          />

          {/* Network Name — hidden on mobile */}
          <span className="hidden sm:inline md:text-md text-sm ">
            {currentChain.name}
          </span>

          {/* Dropdown Icon — hidden on very small screens for minimalism */}
          <ChevronDown
            className={`hidden sm:block w-3 h-3 transition-transform  ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full mt-2 w-full text-white bg-gray-800 rounded-xl border border-gray-700 shadow-md z-50">
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
                <span className="hidden sm:inline md:text-md text-sm text-white">
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
          className="group relative overflow-hidden bg-[var(--gradient-primary)]  px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer glow-blue"
          onClick={handleLogout}
          style={{ background: "var(--gradient-accent-soft)" }}
        >
          <div className="relative flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div
                className="w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center"
                style={{ background: "var(--accent)" }}
              >
                <User className="w-3 h-3 " />
              </div>
              <span className="text-xs font-mono ">{shortAddr}</span>
              <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
