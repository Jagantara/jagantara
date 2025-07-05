"use client";

import { useState } from "react";
import { Check, Shield, Star, Crown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import GradientText from "@/components/gradient-text";
import { useInsuranceManager } from "@/hooks/useInsuranceManager";

const tiers = [
  {
    id: "lite",
    name: "Lite",
    icon: Shield,
    bestFor: "Students, first-time Web3 users",
    claimCap: "$5,000",
    startingPrice: 65,
    assetValue: "<$5k",
    durations: [1, 3, 6, 12],
    coverage: ["Basic Smart Contract Failure", "Custody Risk"],
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    id: "shield",
    name: "Shield",
    icon: Star,
    bestFor: "NFT collectors, DAO voters, casual DeFi",
    claimCap: "$15,000",
    startingPrice: 145,
    assetValue: "$5k–15k",
    durations: [1, 3, 6, 12],
    coverage: [
      "Major Smart Contract Failure",
      "Basic DAO Liability",
      "NFT Theft",
      "Custody Risk",
    ],
    color: "bg-yellow-50 border-yellow-200",
    iconColor: "text-yellow-500",
    popular: true,
  },
  {
    id: "max",
    name: "Max",
    icon: Crown,
    bestFor: "Active investors, DeFi builders",
    claimCap: "$50,000",
    startingPrice: 205,
    assetValue: "$15k–25k",
    durations: [3, 6, 12],
    coverage: [
      "All Shield coverage",
      "Advanced DAO Liability",
      "DeFi Hacks",
      "Optional Audit Review",
    ],
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    bestFor: "DAOs, protocols, high-net-worth users",
    claimCap: "$100,000+",
    startingPrice: 295,
    assetValue: "Custom",
    durations: [3, 6, 12],
    coverage: [
      "All Max coverage",
      "Multi-wallet & Cross-chain",
      "Custom treasury options",
      "SLA-backed claims",
    ],
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    custom: true,
  },
];

export default function PremiumsPage() {
  const [selectedTier, setSelectedTier] = useState("shield");
  const [coverAddress, setCoverAddress] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("6");
  const { payPremium, isPaying, refetchIsActive } = useInsuranceManager();
  const currentTier = tiers.find((tier) => tier.id === selectedTier);
  const durationMultiplier =
    selectedDuration === "1"
      ? 1
      : selectedDuration === "3"
        ? 3
        : selectedDuration === "6"
          ? 6
          : 12;
  const totalPrice = currentTier
    ? Math.round(currentTier.startingPrice * durationMultiplier)
    : 0;

  const handlePay = async () => {
    if (isPaying || !coverAddress) return;

    const tierMap: Record<string, number> = {
      lite: 1,
      shield: 2,
      max: 3,
    };

    const tier = tierMap[selectedTier];
    const duration = parseInt(selectedDuration, 10);
    console.log(tier, duration);

    const success = await payPremium(
      tier,
      duration,
      coverAddress,
      String(totalPrice)
    );
    if (success) {
      refetchIsActive();
      console.log("Premium payment successful!");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
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
            Premiums
          </GradientText>
          <p className=" max-w-2xl mx-auto">
            Protect your Web3 assets with comprehensive insurance coverage. Pay
            with USDC, activate instantly on-chain.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tier Selection */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <Card
                    key={tier.id}
                    className={`bg-[image:var(--gradient-secondary)] relative cursor-pointer transition-all duration-200 hover:shadow-lg border-none ${
                      selectedTier === tier.id
                        ? `${tier.color} glow-blue border-none`
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    {tier.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-xs text-white">
                        Popular
                      </Badge>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-white flex items-center justify-center`}
                        >
                          <Icon className={`w-5 h-5 ${tier.iconColor}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tier.name}</CardTitle>
                          <div className="text-lg font-bold ">
                            {tier.custom ? "Custom" : `$${tier.startingPrice}+`}
                            <span className="text-sm font-normal ">/mo</span>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-xs">
                        {tier.bestFor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="">Claim Cap:</span>
                        <span className="font-medium">{tier.claimCap}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="">Asset Value:</span>
                        <span className="font-medium">{tier.assetValue}</span>
                      </div>
                      <div className="space-y-1">
                        {tier.coverage.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center text-xs"
                          >
                            <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                        {tier.coverage.length > 3 && (
                          <div className="text-xs text-gray-500 ml-5">
                            +{tier.coverage.length - 3} more features
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Configuration & Purchase Panel */}
          <div className="lg:col-span-1 border-none bg-[image:var(--gradient-secondary)] rounded-2xl">
            <Card className="sticky top-6 border-none">
              <CardHeader className="">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {currentTier && (
                    <currentTier.icon
                      className={`w-5 h-5 ${currentTier.iconColor}`}
                    />
                  )}
                  {currentTier?.name} Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Duration Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Coverage Details
                  </Label>
                  <div className="flex gap-3">
                    {/* Coverage Duration */}
                    <div className="w-1/2">
                      <Select
                        value={selectedDuration}
                        onValueChange={setSelectedDuration}
                      >
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--secondary)]">
                          {currentTier?.durations.map((duration) => (
                            <SelectItem
                              key={duration}
                              value={duration.toString()}
                              className="cursor-pointer"
                            >
                              {duration} {duration === 1 ? "Month" : "Months"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Cover Address Input */}
                    <div className="w-full">
                      <input
                        type="text"
                        value={coverAddress}
                        onChange={(e) => setCoverAddress(e.target.value)}
                        placeholder="Provide Cover address"
                        className="w-full px-3 py-2 text-sm rounded-md bg-[var(--secondary)] border border-[var(--text)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className=" rounded-lg ">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Payment Token</span>
                    <div className="flex items-center gap-2">
                      💵
                      <span className="text-sm font-medium">USDC</span>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span>Duration</span>
                    <span>{selectedDuration} months</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Monthly Rate</span>
                    <span>${currentTier?.startingPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                    <span>Total Premium</span>
                    <span>${totalPrice} USDC</span>
                  </div>
                </div>

                {/* Purchase Button */}
                <Button
                  className="w-full h-11 bg-[var(--accent)] cursor-pointer hover:bg-[var(--accent)]/70"
                  size="lg"
                  onClick={handlePay}
                  disabled={isPaying || currentTier?.custom}
                >
                  {isPaying
                    ? "Processing..."
                    : currentTier?.custom
                      ? "Contact Sales"
                      : "Purchase Coverage"}
                </Button>

                {/* Coverage Summary */}
                <div className="bg-[var(--secondary)] rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2">
                    Coverage Includes:
                  </h4>
                  <div className="space-y-1">
                    {currentTier?.coverage.map((item, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Policy activates after on-chain payment confirmation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Info Footer */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-[var(--secondary)] rounded-lg p-4">
            <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-sm">Instant Activation</h4>
            <p className="text-xs opacity-70">
              Coverage starts immediately after payment
            </p>
          </div>
          <div className="bg-[var(--secondary)] rounded-lg p-4">
            <Check className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-sm">Fast Claims</h4>
            <p className="text-xs opacity-70">
              Automated verification & quick payouts
            </p>
          </div>
          <div className="bg-[var(--secondary)] rounded-lg p-4">
            <Crown className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <h4 className="font-medium text-sm">Comprehensive</h4>
            <p className="text-xs opacity-70">
              Covers smart contracts, DeFi, NFTs & more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
