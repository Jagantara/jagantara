import GradientText from "@/components/gradient-text";
import { Activity, DollarSign, Droplets, TrendingUp } from "lucide-react";
import Image from "next/image";
export default function VaultStats() {
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
              value={`0`}
              subtitle="Real pool reserves"
              color="#10B981"
              // isLoading={isLoading}
            />

            <StatCard
              icon={
                <Activity className="w-5 h-5" style={{ color: "#836EF9" }} />
              }
              title="24h Volume"
              value={`0`}
              subtitle="Estimated trading"
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
              title="CAMP Price"
              value={`0`}
              subtitle="USDC per CAMP"
              color="#A0055D"
              // isLoading={isLoading}
            />

            <StatCard
              icon={
                <Droplets className="w-5 h-5" style={{ color: "#F59E0B" }} />
              }
              title="APR"
              value={`0%`}
              subtitle="Based on trading fees"
              color="#F59E0B"
              // isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="glass rounded-xl p-6 border border-white/10 bg-[var(--secondary)]">
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-semibold mb-1" style={{ color: "#FBFAF9" }}>
              Trading Fee
            </div>
            <div className="text-2xl font-bold" style={{ color: "#836EF9" }}>
              0.3%
            </div>
            <div
              className="text-sm"
              style={{ color: "rgba(251, 250, 249, 0.7)" }}
            >
              Per transaction
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-white/10 bg-[var(--secondary)]">
          <div className="text-center">
            <div className="text-3xl mb-2">🏦</div>
            <div className="font-semibold mb-1" style={{ color: "#FBFAF9" }}>
              Protocol
            </div>
            <div className="text-2xl font-bold" style={{ color: "#A0055D" }}>
              NadTrade
            </div>
            <div
              className="text-sm"
              style={{ color: "rgba(251, 250, 249, 0.7)" }}
            >
              AMM Protocol
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-white/10 bg-[var(--secondary)]">
          <div className="text-center flex flex-col justify-center items-center">
            <div className="text-3xl mb-2">
              <Image
                src={"/monad_logo.webp"}
                alt={"monad"}
                width={40}
                height={40}
              />
            </div>
            <div className="font-semibold mb-1">Network</div>
            <div className="text-2xl font-bold text-purple-500">Monad</div>
            <div className="text- opacity-70">Testnet</div>
          </div>
        </div>
      </div>
    </main>
  );
}
