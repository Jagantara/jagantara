import GradientText from "@/components/gradient-text";
import { Activity, DollarSign, Droplets, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useClaimManager } from "@/hooks/useClaimManager";
import { formatNextSessionDate } from "@/lib/utils";
import { useStake } from "@/hooks/useJagaStake";
import { formatTokenAmount } from "@/lib/calculations";
import { useTheme } from "next-themes";
import { useMorphoReinvest } from "@/hooks/useMorphoReinvest";
export default function VaultStats() {
  const { formattedVaultBalance } = useClaimManager();
  const { timeLeft, currentStake, totalSupply } = useStake();
  const { totalReinvested, isReinvestedLoading } = useMorphoReinvest();
  const { theme } = useTheme();
  const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    color,
    isLoading: cardLoading,
  }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    subtitle?: string;
    color: string;
    isLoading?: boolean;
  }) => (
    <div className="glass rounded-xl p-6 card-hover border border-white/10 shadow-lg bg-[var(--secondary)] backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="p-2 rounded-lg"
            style={{
              backgroundColor: `${color}20`,
              border: `1px solid ${color}40`,
            }}
          >
            {icon}
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
      </div>

      {cardLoading ? (
        <div className="space-y-2">
          <div className="h-8 bg-white/10 rounded shimmer"></div>
          {subtitle && (
            <div className="h-4 bg-white/10 rounded shimmer w-3/4"></div>
          )}
        </div>
      ) : (
        <div>
          <div className="text-2xl font-bold mb-1">{value}</div>
          {subtitle && <div className="text-sm opacity-70">{subtitle}</div>}
        </div>
      )}
    </div>
  );
  return (
    <main>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <GradientText
            colors={[
              "var(--primary)",
              "var(--accent)",
              "var(--primary)",
              "var(--accent)",
            ]}
            animationSpeed={6}
            showBorder={false}
            className="font-normal"
          >
            Vault Stats
          </GradientText>
          <p className="opacity-70">
            Real-time metrics for USDC Jagantara Vault
          </p>

          <div className="text-sm mt-2 opacity-70">
            Current rate ratio: 1 JAGA = 1 USDC
          </div>
        </div>

        {/* Stats Grid - 2x2 Layout with Normal Card Size */}
        <div className="w-full">
          {/* Top Row - TVL and Volume */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <StatCard
              icon={
                <DollarSign className="w-5 h-5" style={{ color: "#10B981" }} />
              }
              title="Total Value Locked"
              value={
                Math.round(Number(formattedVaultBalance)).toLocaleString() +
                " USDC"
              }
              subtitle="Real vault reserves"
              color="#10B981"
              // isLoading={isLoading}
            />

            <StatCard
              icon={
                <Activity className="w-5 h-5" style={{ color: "#836EF9" }} />
              }
              title="Next Session"
              value={`${formatNextSessionDate(timeLeft!)}`}
              subtitle="Next staking batch"
              color="#836EF9"
              // isLoading={isLoading}
            />
          </div>

          {/* Bottom Row - Price and APR */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatCard
              icon={
                <TrendingUp className="w-5 h-5" style={{ color: "#A0055D" }} />
              }
              title="Total Staked"
              value={
                Math.round(Number(totalSupply) / 1e6).toLocaleString() + " USDC"
              }
              subtitle="Total staked in Vault"
              color="#A0055D"
              // isLoading={isLoading}
            />
            <StatCard
              icon={
                <Droplets className="w-5 h-5" style={{ color: "#F59E0B" }} />
              }
              title="APY"
              value={`12,4%`}
              subtitle="Based on company revenue"
              color="#F59E0B"
              // isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="glass rounded-xl p-6 border border-white/10 bg-[var(--secondary)] mt-5 flex items-center justify-between gap-6">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--background)]/20 rounded-full blur-sm" />
            <div className="relative bg-[var(--background)]/10 rounded-full p-2 backdrop-blur-sm">
              <Image
                src="/morpho_logo.png"
                alt="Morpho"
                width={20}
                height={20}
                className="relative z-10"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold ">Morpho Vault</p>
            <p className="text-[var(--text)]/50 text-xs">DeFi Protocol</p>
          </div>
        </div>

        {/* Middle: Total Deposits */}
        <div className="text-center">
          <p className="text-[var(--text)]/50 text-xs font-medium uppercase tracking-wider">
            Total Deposits
          </p>
          <p className=" font-bold text-lg">
            {Math.round(Number(totalReinvested) / 1e6).toLocaleString() +
              " USDC"}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[var(--text)]/50 text-xs font-medium uppercase tracking-wider">
            Collateral
          </p>
          <p className="font-bold text-lg">💵USDC</p>
        </div>

        {/* Right: APY + Collateral */}
        <div className="text-right">
          <p className="text-[var(--text)]/50 text-xs font-medium uppercase tracking-wider">
            APY
          </p>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-emerald-600 text-xl font-bold">4.45</span>
            <span className=" text-sm">%</span>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        <div className="glass rounded-xl p-6 border border-white/10 bg-[var(--secondary)]">
          <div className="text-center flex flex-col justify-center items-center">
            <div className="mb-1 flex justify-center">
              <Image
                src="/morpho_logo2.png"
                alt="lisk"
                width={40}
                height={40}
              />
            </div>
            <div className="font-semibold mb-1">Hedge</div>
            <div className="text-2xl font-bold">Morpho</div>
            <div className="text-sm opacity-70">Value Preservation</div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-white/10 bg-[var(--secondary)]">
          <div className="text-center">
            <div className="text-3xl mb-2">🏦</div>
            <div className="font-semibold mb-1">Governance</div>
            <div className="text-2xl font-bold ">JagaDAO</div>
            <div className="text-sm opacity-70">Community Staking</div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-white/10 bg-[var(--secondary)]">
          <div className="text-center flex flex-col justify-center items-center">
            <div className="text-3xl mb-2">
              {theme === "dark" ? (
                <Image
                  src={"/lisk_white.png"}
                  alt={"lisk"}
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src={"/lisk_logo.png"}
                  alt={"lisk"}
                  width={40}
                  height={40}
                />
              )}
            </div>
            <div className="font-semibold mb-1">Network</div>
            <div className="text-2xl font-bold">Lisk</div>
            <div className="text-sm opacity-70">Testnet</div>
          </div>
        </div>
      </div>
    </main>
  );
}
