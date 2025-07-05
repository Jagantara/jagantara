"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Vote,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wallet,
  BarChart3,
} from "lucide-react";
import { useAccount } from "wagmi";
import ConnectWallet from "@/app/components/ConnectWallet";

interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: "active" | "passed" | "rejected" | "pending";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorum: number;
  timeLeft: string;
  category: string;
}

export default function DAOInterface() {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [userVotingPower] = useState(1250); // Mock user voting power
  const [userTokens] = useState(5000); // Mock user token balance
  const { isConnected } = useAccount();
  const proposals: Proposal[] = [
    {
      id: "1",
      title: "Expand Coverage to NFT Collections",
      description:
        "Proposal to extend insurance coverage to include blue-chip NFT collections with floor prices above 5 ETH. This would include coverage for smart contract risks, marketplace hacks, and metadata corruption.",
      proposer: "0x742d...8f3a",
      status: "active",
      votesFor: 15420,
      votesAgainst: 3280,
      totalVotes: 18700,
      quorum: 20000,
      timeLeft: "2 days, 14 hours",
      category: "Coverage Expansion",
    },
    {
      id: "2",
      title: "Reduce Premium Rates for DeFi Protocols",
      description:
        "Adjust premium calculation algorithm to reduce rates for established DeFi protocols with 12+ months of operation and TVL above $100M.",
      proposer: "0x1a2b...9c4d",
      status: "active",
      votesFor: 22100,
      votesAgainst: 8900,
      totalVotes: 31000,
      quorum: 20000,
      timeLeft: "5 days, 8 hours",
      category: "Premium Adjustment",
    },
    {
      id: "2",
      title: "Reduce Premium Rates for DeFi Protocols",
      description:
        "Adjust premium calculation algorithm to reduce rates for established DeFi protocols with 12+ months of operation and TVL above $100M.",
      proposer: "0x1a2b...9c4d",
      status: "active",
      votesFor: 22100,
      votesAgainst: 8900,
      totalVotes: 31000,
      quorum: 20000,
      timeLeft: "5 days, 8 hours",
      category: "Premium Adjustment",
    },
    {
      id: "2",
      title: "Reduce Premium Rates for DeFi Protocols",
      description:
        "Adjust premium calculation algorithm to reduce rates for established DeFi protocols with 12+ months of operation and TVL above $100M.",
      proposer: "0x1a2b...9c4d",
      status: "active",
      votesFor: 22100,
      votesAgainst: 8900,
      totalVotes: 31000,
      quorum: 20000,
      timeLeft: "5 days, 8 hours",
      category: "Premium Adjustment",
    },
    {
      id: "3",
      title: "Treasury Diversification Strategy",
      description:
        "Allocate 30% of treasury funds to stablecoins and traditional assets to reduce volatility and ensure claim payment capability during market downturns.",
      proposer: "0x9f8e...2b1c",
      status: "passed",
      votesFor: 28500,
      votesAgainst: 12300,
      totalVotes: 40800,
      quorum: 20000,
      timeLeft: "Ended",
      category: "Treasury Management",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "passed":
        return "bg-emerald-100 text-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Vote className="h-4 w-4" />;
      case "passed":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleVote = (proposalId: string, vote: "for" | "against") => {
    // Mock voting logic
    console.log(`Voted ${vote} on proposal ${proposalId}`);
  };

  return (
    <div>
      {isConnected ? (
        <div className=" shadow-lg  rounded-2xl">
          {/* Header */}
          {/* <header className=" shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Jagantara DAO
                </h1>
                <p className="text-sm text-gray-600">
                  Digital Assets Insurance Governance
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Card className="p-3">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-purple-600" />
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {userTokens.toLocaleString()} JAG
                    </p>
                    <p className="text-xs text-gray-500">
                      Voting Power: {userVotingPower}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header> */}

          <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs defaultValue="active" className="space-y-6 ">
              <div className="flex justify-between items-center">
                <TabsList className="grid w-full max-w-md grid-cols-3 border-slate-500">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <div className="flex items-center space-x-4 text-sm ">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>12,847 Members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>68% Participation</span>
                  </div>
                </div>
              </div>

              <TabsContent value="active" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Proposals List */}
                  <div className="lg:col-span-2 space-y-4">
                    {proposals
                      .filter((p) => p.status === "active")
                      .map((proposal) => (
                        <Card
                          key={proposal.id}
                          className="hover:shadow-md transition-shadow cursor-pointer bg-[var(--secondary)]"
                          onClick={() => setSelectedProposal(proposal.id)}
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    className={getStatusColor(proposal.status)}
                                  >
                                    {getStatusIcon(proposal.status)}
                                    <span className="ml-1 capitalize">
                                      {proposal.status}
                                    </span>
                                  </Badge>
                                  <Badge variant="outline">
                                    {proposal.category}
                                  </Badge>
                                </div>
                                <CardTitle className="text-lg">
                                  {proposal.title}
                                </CardTitle>
                              </div>
                              <div className="text-right text-sm ">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{proposal.timeLeft}</span>
                                </div>
                              </div>
                            </div>
                            <CardDescription className="line-clamp-2">
                              {proposal.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span>
                                  ✅ For: {proposal.votesFor.toLocaleString()}
                                </span>
                                <span>
                                  ❌ Against:{" "}
                                  {proposal.votesAgainst.toLocaleString()}
                                </span>
                              </div>
                              <Progress
                                value={
                                  (proposal.votesFor /
                                    (proposal.votesFor +
                                      proposal.votesAgainst)) *
                                  100
                                }
                                className="h-2 bg-white/40"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>
                                  Quorum: {proposal.totalVotes.toLocaleString()}
                                  /{proposal.quorum.toLocaleString()}
                                </span>
                                <span>
                                  {(
                                    (proposal.totalVotes / proposal.quorum) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>

                  {/* Voting Panel */}
                  <div className="space-y-6 sticky top-10 self-start">
                    {selectedProposal ? (
                      <Card className="bg-[var(--secondary)]">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Vote className="h-5 w-5" />
                            <span>Cast Your Vote</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {(() => {
                            const proposal = proposals.find(
                              (p) => p.id === selectedProposal
                            );
                            if (!proposal) return null;

                            return (
                              <>
                                <div className="p-3 bg-[var(--third)] rounded-lg">
                                  <h4 className="font-medium text-sm mb-1">
                                    {proposal.title}
                                  </h4>
                                  <p className="text-xs  line-clamp-3">
                                    {proposal.description}
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Your Voting Power:</span>
                                    <span className="font-medium">
                                      {userVotingPower}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Time Remaining:</span>
                                    <span className="font-medium">
                                      {proposal.timeLeft}
                                    </span>
                                  </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                  <Button
                                    className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                                    onClick={() =>
                                      handleVote(proposal.id, "for")
                                    }
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    Vote For
                                  </Button>
                                  <Button
                                    className="w-full cursor-pointer bg-red-600 hover:bg-red-700"
                                    onClick={() =>
                                      handleVote(proposal.id, "against")
                                    }
                                  >
                                    <XCircle className="h-4 w-4 " />
                                    Vote Against
                                  </Button>
                                </div>
                              </>
                            );
                          })()}
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-[var(--secondary)] ">
                        <CardContent className="py-6">
                          <div className="text-center ">
                            <Vote className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>Select a proposal to vote</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Governance Stats */}
                    <Card className="bg-[var(--secondary)]">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          🏛️Governance Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm ">🗝️ Total Proposals</span>
                          <span className="font-medium">47</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm ">✅ Passed</span>
                          <span className="font-medium text-green-600">32</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm ">❌ Rejected</span>
                          <span className="font-medium text-red-600">13</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm ">⌛ Active</span>
                          <span className="font-medium text-blue-600">2</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-sm ">Avg. Participation</span>
                          <span className="font-medium">68.2%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {proposals
                  .filter((p) => p.status !== "active")
                  .map((proposal) => (
                    <Card key={proposal.id} className="bg-[var(--secondary)]">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={getStatusColor(proposal.status)}
                              >
                                {getStatusIcon(proposal.status)}
                                <span className="ml-1 capitalize">
                                  {proposal.status}
                                </span>
                              </Badge>
                              <Badge variant="outline">
                                {proposal.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">
                              {proposal.title}
                            </CardTitle>
                          </div>
                        </div>
                        <CardDescription>
                          {proposal.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>
                              For: {proposal.votesFor.toLocaleString()}
                            </span>
                            <span>
                              Against: {proposal.votesAgainst.toLocaleString()}
                            </span>
                          </div>
                          <Progress
                            value={
                              (proposal.votesFor /
                                (proposal.votesFor + proposal.votesAgainst)) *
                              100
                            }
                            className="h-2 bg-white/40"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="analytics">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-[var(--secondary)]">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" />
                        <span>Participation Trend</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">68.2%</div>
                      <p className="text-sm text-gray-600">
                        Average participation rate
                      </p>
                      <div className="mt-2 text-sm text-green-600">
                        +5.3% from last month
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[var(--secondary)]">
                    <CardHeader>
                      <CardTitle>Token Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Community</span>
                          <span>45%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Treasury</span>
                          <span>30%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Team</span>
                          <span>15%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Advisors</span>
                          <span>10%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[var(--secondary)]">
                    <CardHeader>
                      <CardTitle>Top Voters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* {[
                      { address: "0x742d...8f3a", votes: 15 },
                      { address: "0x1a2b...9c4d", votes: 12 },
                      { address: "0x9f8e...2b1c", votes: 11 },
                    ].map((voter, index) => (
                      <div
                        key={voter.address}
                        className="flex items-center space-x-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{index + 1}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{voter.address}</p>
                          <p className="text-xs text-gray-500">
                            {voter.votes} votes cast
                          </p>
                        </div>
                      </div>
                    ))} */}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
            To access your JagaDAO and Vote, please connect your wallet
            securely.
          </p>
          <ConnectWallet />
        </div>
      )}
    </div>
  );
}
