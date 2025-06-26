"use client";
import { ConnectButton } from "@xellar/kit";
import { ChevronDown, User, Wallet } from "lucide-react";
export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        isConnected,
        openProfileModal,
      }) => (
        <div className="flex items-center gap-4 ">
          {!isConnected ? (
            <button
              className="group flex items-center px-3 py-2 rounded-xl transition-all duration-300 gradient-monad-primary glow-purple cursor-pointer"
              onClick={openConnectModal}
            >
              <div className="relative flex items-center gap-2">
                <Wallet className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span className="text-sm font-bold">Connect Wallet</span>
              </div>
            </button>
          ) : (
            <button
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-50 to-blue-50 hover:from-emerald-100 hover:to-blue-100 border border-emerald-200/50 text-gray-800 py-1 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer"
              onClick={openProfileModal}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-blue-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-1">
                {/* Balance Section */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white/60 rounded-lg border border-white/40">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-emerald-700">
                    {account?.balanceFormatted?.slice(0, 6)}{" "}
                    {chain?.nativeCurrency?.symbol}
                  </span>
                </div>
                {/* Separator */}
                <div className="w-px h-4 bg-gray-300"></div>

                {/* Address Section */}
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-mono text-gray-600">
                    {account?.address?.slice(0, 6)}...
                    {account?.address?.slice(-4)}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gray-400 transition-transform group-hover:rotate-180" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
            </button>
          )}
        </div>
      )}
    </ConnectButton.Custom>
  );
}
