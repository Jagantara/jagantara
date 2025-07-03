import { RefreshCw, Search } from "lucide-react";
import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { FaClock } from "react-icons/fa6";
import GradientText from "@/components/gradient-text";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ✅ Mock transaction data
  const combinedTransactions = [
    {
      type: "Reward",
      amount: "+$45.20",
      date: "2 hours ago",
      status: "completed",
      hash: "0xabc123",
      address: "0xUserWallet1",
    },
    {
      type: "Deposit",
      amount: "+$1,000",
      date: "1 day ago",
      status: "completed",
      hash: "0xdef456",
      address: "0xUserWallet2",
    },
    {
      type: "Reward",
      amount: "+$42.80",
      date: "1 day ago",
      status: "completed",
      hash: "0xghi789",
      address: "0xUserWallet3",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
    {
      type: "Reward",
      amount: "+$41.50",
      date: "2 days ago",
      status: "completed",
      hash: "0xjkl012",
      address: "0xUserWallet4",
    },
  ];

  // ✅ Filter logic
  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return combinedTransactions;
    return combinedTransactions.filter((tx) =>
      `${tx.hash} ${tx.address} ${tx.type}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, combinedTransactions]);

  // ✅ Manual Refresh Handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // await refreshAll();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, end);
  }, [filteredTransactions, currentPage]);

  //   if (isLoading) {
  //     return (
  //       <div className="w-full max-w-6xl mx-auto px-4 sm:px-0">
  //         <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl">
  //           <div className="text-center py-12">
  //             <div className="spinner w-8 h-8 mx-auto mb-4"></div>
  //             <div
  //               className="text-lg font-semibold mb-2"
  //               style={{ color: "#FBFAF9" }}
  //             >
  //               Loading indexed data...
  //             </div>
  //             <div style={{ color: "rgba(251, 250, 249, 0.7)" }}>
  //               Fetching from Ponder indexer
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-0">
      <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6 space-y-4 lg:space-y-0">
          <div className="flex items-center gap-3">
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
              Transaction History
            </GradientText>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors disabled:opacity-50 cursor-pointer bg-[var(--accent)]"
              style={{ borderColor: "rgba(251, 250, 249, 0.2)" }}
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="text-sm">
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </span>
            </button>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search address or hash..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border input-primary text-sm w-full sm:w-64 opacity-70 bg-[var(--secondary)]"
                style={{ borderColor: "rgba(251, 250, 249, 0.2)" }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                No transactions found
              </h3>
              <p className="text-sm sm:text-base text-white/70">
                {paginatedData.length === 0
                  ? "No transactions have been indexed yet. Try to stake or claim!"
                  : "Try adjusting your filters or search terms."}
              </p>
            </div>
          ) : (
            <Card className="border-0 shadow-lg bg-[var(--third)] px-10 py-8">
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <FaClock /> Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest staking transactions and rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedData.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 px-5 rounded-lg bg-[var(--secondary)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${activity.type === "Reward" ? "bg-green-500" : "bg-blue-500"}`}
                        />
                        <div>
                          <p className="font-medium">{activity.type}</p>
                          <p className="text-sm">{activity.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${activity.type === "Reward" ? "text-green-600" : "text-blue-600"}`}
                        >
                          {activity.amount}
                        </p>
                        <p className="text-xs">{activity.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        {filteredTransactions.length > ITEMS_PER_PAGE && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
