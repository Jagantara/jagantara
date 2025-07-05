"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Wallet,
  FileText,
  CheckCircle,
  Info,
  AlertTriangle,
  Hash,
  Clock,
  Send,
} from "lucide-react";
import { useAccount } from "wagmi";
import ConnectWallet from "@/app/components/ConnectWallet";
import GradientText from "@/components/gradient-text";
import { useInsuranceManager } from "@/hooks/useInsuranceManager";
import PremiumsPage from "./PremiumCards";
import { useDAOGovernance } from "@/hooks/useDAOGovernance";
import { parseTokenAmount } from "@/lib/formatters";

interface ClaimSubmissionData {
  claimant: string; // address
  coveredAddress: string;
  tier: string;
  title: string;
  reason: string; // detailed reason
  claimType: string;
  amount: string; // amount in USD (will be converted to wei-like format)
  currency: string;
  // Additional fields for better UX (not in smart contract)
  supportingEvidence: string;
  acknowledgments: boolean[];
}

export default function CoverageInterface() {
  const { submitClaim, isSubmitting } = useDAOGovernance();
  const { isConnected, address } = useAccount();
  const { isActive, policy } = useInsuranceManager();
  const [userAddress, setUserAddress] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [claimId, setClaimId] = useState<number | null>(null);
  console.log("POLICY: ", policy);
  const [formData, setFormData] = useState<ClaimSubmissionData>({
    claimant: "",
    coveredAddress: "",
    tier: "",
    reason: "",
    amount: "",
    currency: "USDC",
    claimType: "",
    title: "",
    supportingEvidence: "",
    acknowledgments: [false, false, false, false],
  });

  const premiumTypes = [
    { value: "Tier-1", label: "Jaga Lite" },
    { value: "Tier-2", label: "Jaga Shield" },
    { value: "Tier-3", label: "Jaga Max" },
    { value: "Tier-4", label: "Jaga Enterprise" },
  ];

  const claimTypesByTier = {
    "Tier-1": ["Basic Smart Contract Failure", "Custody Risk"],
    "Tier-2": [
      "Major Smart Contract Failure",
      "Basic DAO Liability",
      "NFT Theft",
      "Custody Risk",
    ],
    "Tier-3": [
      "Advanced DAO Liability",
      "DeFi Hacks",
      "Optional Audit Review",
      "All Shield coverage",
    ],
    "Tier-4": [
      "Multi-wallet & Cross-chain",
      "Custom treasury options",
      "SLA-backed claims",
      "All Max coverage",
    ],
  };

  const acknowledgmentTexts = [
    "I confirm that all information provided is accurate and complete",
    "I understand that this claim will be voted on by DAO members",
    "I agree to provide additional evidence if requested during the voting process",
    "I understand that false claims may result in penalties and loss of coverage",
  ];

  const updateFormData = (field: keyof ClaimSubmissionData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAcknowledgment = (index: number, checked: boolean) => {
    const newAcknowledgments = [...formData.acknowledgments];
    newAcknowledgments[index] = checked;
    setFormData((prev) => ({ ...prev, acknowledgments: newAcknowledgments }));
  };

  const formatAmountForContract = (amount: string, currency: string) => {
    // Convert to wei-like format (multiply by 10^18 for precision)
    const numAmount = Number.parseFloat(amount);
    if (currency === "USD") {
      return BigInt(Math.floor(numAmount * 1e18)).toString();
    }
    return BigInt(Math.floor(numAmount * 1e18)).toString();
  };

  const handleClaim = async () => {
    await submitClaim(
      formData.reason,
      formData.title,
      formData.claimType,
      parseTokenAmount(formData.amount, 6)
    );
    window.location.reload();
  };

  const isFormValid = () => {
    return (
      formData.reason.trim().length > 50 &&
      formData.amount &&
      Number.parseFloat(formData.amount) > 0 &&
      formData.claimType &&
      formData.title &&
      formData.acknowledgments.every((ack) => ack)
    );
  };

  const tierIndex = Number(policy?.[3]) - 1;
  const currentTier = premiumTypes?.[tierIndex]?.value;

  // Get claim types based on tier
  const availableClaimTypes =
    currentTier &&
    claimTypesByTier[currentTier as keyof typeof claimTypesByTier]
      ? claimTypesByTier[currentTier as keyof typeof claimTypesByTier]
      : [];
  useEffect(() => {
    if (policy && policy.length > 3) {
      const tierIndex = Number(policy[3]) - 1;
      const tier = premiumTypes[tierIndex]?.label || "";

      updateFormData("coveredAddress", policy[2]); // assuming policy[2] is the address
      updateFormData("tier", tier);
    }
  }, [policy]);
  if (submissionSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              Claim Submitted Successfully!
            </CardTitle>
            <CardDescription>
              Your claim has been submitted to the DAO for voting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Claim ID:</span>
                  <span className="font-mono font-medium">#{claimId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">
                    {Number.parseFloat(formData.amount).toLocaleString()}{" "}
                    {formData.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Claimant:</span>
                  <span className="font-mono text-xs">{formData.claimant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending DAO Vote
                  </Badge>
                </div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your claim is now live for DAO voting. Members will review your
                submission and vote to approve or reject the claim. You'll be
                notified of the outcome via email and on-chain events.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setSubmissionSuccess(false);
                  setFormData({
                    claimant: userAddress,
                    coveredAddress: "",
                    tier: "",
                    reason: "",
                    amount: "",
                    currency: "USD",
                    claimType: "",
                    title: "",
                    supportingEvidence: "",
                    acknowledgments: [false, false, false, false],
                  });
                }}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Submit Another Claim
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                View Claim Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {isConnected ? (
        isActive ? (
          <>
            <div className=" rounded-2xl">
              <div className="mx-10 py-8 ">
                <div className="space-y-6">
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
                    Get Coverage
                  </GradientText>
                  {/* Claim Form */}
                  <Card className="bg-[var(--secondary)] border-none">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>Claim Details</span>
                      </CardTitle>
                      <CardDescription>
                        Provide the essential information for your insurance
                        claim. This data will be stored on-chain and voted on by
                        DAO members.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Smart Contract Fields */}
                      <div className="space-y-4">
                        <div className="bg-[var(--third)]/40 p-4 rounded-lg border border-none">
                          <h4 className="font-medium mb-2 flex items-center">
                            <Hash className="h-4 w-4 mr-2" />
                            Smart Contract Data
                          </h4>
                          <div className="grid gap-3 text-sm">
                            <div className="flex justify-between">
                              <span className="">Claimant Address:</span>
                              <span className="font-mono">{address}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="">Claim Amount:</span>
                              <span className="font-medium text-green-500">
                                {formData.amount
                                  ? `${Number.parseFloat(formData.amount).toLocaleString()} ${formData.currency}`
                                  : "Not set"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="">Reason Length:</span>
                              <span className="font-medium ">
                                {formData.reason.length} characters
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="title">Claim Title *</Label>
                            <Input
                              id="title"
                              type="text"
                              placeholder="ex. Drained Wallet"
                              value={formData.title}
                              className="w-full bg-[var(--third)]/40 border-none"
                              onChange={(e) =>
                                updateFormData("title", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2 cursor-not-allowed">
                            <Label htmlFor="title">
                              Cover Wallet Address *
                            </Label>
                            <Input
                              id="covered-address"
                              type="text"
                              placeholder="Provide a wallet address that you want to cover"
                              value={policy[2]}
                              className="w-full bg-[var(--third)]/40 border-none"
                              disabled
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2 cursor-not-allowed">
                            <Label htmlFor="claim-type">Premium Tier *</Label>
                            <Input
                              id="premium"
                              type="text"
                              placeholder="How long do you want to be covered (in months)..."
                              value={premiumTypes[Number(policy[3]) - 1].label}
                              className="w-full bg-[var(--third)]/40 border-none"
                              disabled
                            />
                          </div>
                          <div className="space-y-2 cursor-not-allowed">
                            <Label htmlFor="duration">
                              Duration (in months) *
                            </Label>
                            <Input
                              id="duration"
                              type="text"
                              placeholder="How long do you want to be covered (in months)..."
                              value={policy[1].toString()}
                              className="w-full bg-[var(--third)]/40 border-none"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2 cursor-not-allowed">
                            <Label htmlFor="claim-type">Claim Type *</Label>
                            <Select
                              value={formData.claimType}
                              onValueChange={(value) =>
                                updateFormData("claimType", value)
                              }
                            >
                              <SelectTrigger
                                id="claim-type"
                                className="w-full bg-[var(--third)]/40 border-none cursor-pointer"
                              >
                                <SelectValue placeholder="Select a claim type..." />
                              </SelectTrigger>
                              <SelectContent className="cursor-pointer bg-[var(--third)]">
                                {availableClaimTypes.map((claim) => (
                                  <SelectItem
                                    key={claim}
                                    value={claim}
                                    className="cursor-pointer"
                                  >
                                    {claim}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2 cursor-not-allowed">
                            <Label htmlFor="amount">Amount *</Label>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="How much you want to recover"
                              value={formData.amount}
                              className="w-full bg-[var(--third)]/40 border-none"
                              onChange={(e) =>
                                updateFormData("amount", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="reason">
                            Detailed Reason * (stored as string in contract)
                          </Label>
                          <Textarea
                            id="reason"
                            placeholder="Provide a comprehensive description of your claim. Include details about what happened, when it occurred, which protocols/assets were affected, transaction hashes if available, and any other relevant information that will help DAO members make an informed voting decision..."
                            rows={6}
                            className="bg-[var(--third)]/40 border-none"
                            value={formData.reason}
                            onChange={(e) =>
                              updateFormData("reason", e.target.value)
                            }
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Minimum 50 characters required</span>
                            <span>{formData.reason.length}/1000</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Acknowledgments */}
                      <div className="space-y-4">
                        <Label>Required Acknowledgments *</Label>
                        <div className="space-y-3">
                          {acknowledgmentTexts.map((text, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <Checkbox
                                id={`ack-${index}`}
                                checked={formData.acknowledgments[index]}
                                className="data-[state=checked]:bg-[var(--third)] cursor-pointer"
                                onCheckedChange={(checked) =>
                                  updateAcknowledgment(
                                    index,
                                    checked as boolean
                                  )
                                }
                              />

                              <Label
                                htmlFor={`ack-${index}`}
                                className="text-sm leading-5"
                              >
                                {text}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Alert className="bg-yellow-300/70 text-black">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Important:</strong> Once submitted, your claim
                          will be permanently recorded on the blockchain and
                          cannot be modified. DAO members will vote to approve
                          or reject your claim based on the information
                          provided.
                        </AlertDescription>
                      </Alert>

                      <Button
                        onClick={handleClaim}
                        disabled={!isFormValid() || isSubmitting}
                        className="w-full bg-[image:var(--gradient-third)] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Submitting to Blockchain...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Claim to DAO
                          </>
                        )}
                      </Button>

                      {!isFormValid() && (
                        <div className="text-sm text-red-600">
                          <p>Please complete all required fields:</p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            {!formData.claimType && <li>Select claim type</li>}
                            {!formData.title && <li>Set incident date</li>}
                            {!formData.amount && <li>Enter claim amount</li>}
                            {formData.reason.length < 50 && (
                              <li>
                                Provide detailed reason (minimum 50 characters)
                              </li>
                            )}
                            {!formData.acknowledgments.every((ack) => ack) && (
                              <li>Accept all acknowledgments</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Smart Contract Preview */}
                  <Card className="bg-[var(--secondary)] border-none">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Hash className="h-5 w-5" />
                        <span>Smart Contract Preview </span>
                      </CardTitle>
                      <CardDescription>
                        Preview of data that will be sent to the ClaimProposal
                        struct
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <div className="space-y-1">
                          <div>
                            <span className="text-blue-400">claimant:</span> "
                            {address}"
                          </div>
                          <div>
                            <span className="text-blue-400">
                              coveredAddress:
                            </span>{" "}
                            "{formData.coveredAddress}"
                          </div>
                          <div>
                            <span className="text-blue-400">tier:</span> "
                            {formData.tier}"
                          </div>
                          <div>
                            <span className="text-blue-400">title:</span> "
                            {formData.title}"
                          </div>
                          <div>
                            <span className="text-blue-400">reason:</span> "
                            {formData.reason}"
                          </div>
                          <div>
                            <span className="text-blue-400">claimType:</span> "
                            {formData.claimType}"
                          </div>
                          <div>
                            <span className="text-blue-400">amount:</span>{" "}
                            {formData.amount}000000n
                          </div>
                          <div className="text-gray-500">
                            // Other fields set by contract:
                          </div>
                          <div className="text-gray-500">
                            // createdAt: block.timestamp
                          </div>
                          <div className="text-gray-500">// yesVotes: 0</div>
                          <div className="text-gray-500">// noVotes: 0</div>
                          <div className="text-gray-500">
                            // status: ClaimStatus.Pending
                          </div>
                          <div className="text-gray-500">// approvedAt: 0</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Show cards to buy premiums
          <div>
            <PremiumsPage />
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center text-center py-20 px-4 space-y-6 pb-20">
          <Image
            src="/jagantara_icon.png"
            alt="Jagantara Icon"
            width={150}
            height={150}
            className="animate-pulse"
          />
          <h1 className="text-2xl font-bold text-[var(--text)]">
            Connect Your Wallet
          </h1>
          <p className="text-sm text-muted-foreground max-w-md">
            To file a Claim, please connect your wallet securely and subscribed
            to a premium.
          </p>
          <ConnectWallet />
        </div>
      )}
    </div>
  );
}
