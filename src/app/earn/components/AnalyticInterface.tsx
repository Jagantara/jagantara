import GradientText from "@/components/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Percent,
  Calendar,
} from "lucide-react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { FaClock } from "react-icons/fa6";
import { useStake } from "@/hooks/useJagaStake";
import { formatTokenAmount } from "@/lib/formatters";
type TimeFilter = "7D" | "30D" | "12M";
type StakingData = { date: string; rewards: number; deposits: number };
export default function AnalyticInterface() {
  const { currentStake, refetchCurrentStake } = useStake();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("12M");
  const stakingDataSets: Record<TimeFilter, StakingData[]> = {
    "7D": [
      { date: "Mon", rewards: 45, deposits: 74500 },
      { date: "Tue", rewards: 52, deposits: 74600 },
      { date: "Wed", rewards: 48, deposits: 74700 },
      { date: "Thu", rewards: 55, deposits: 74800 },
      { date: "Fri", rewards: 62, deposits: 74900 },
      { date: "Sat", rewards: 58, deposits: 75000 },
      { date: "Sun", rewards: 65, deposits: 75100 },
    ],
    "30D": [
      { date: "Week 1", rewards: 320, deposits: 72000 },
      { date: "Week 2", rewards: 380, deposits: 73200 },
      { date: "Week 3", rewards: 420, deposits: 74100 },
      { date: "Week 4", rewards: 450, deposits: 74500 },
    ],
    "12M": [
      { date: "Jan", rewards: 1200, deposits: 45000 },
      { date: "Feb", rewards: 1350, deposits: 47500 },
      { date: "Mar", rewards: 1480, deposits: 49200 },
      { date: "Apr", rewards: 1620, deposits: 52100 },
      { date: "May", rewards: 1750, deposits: 54800 },
      { date: "Jun", rewards: 1890, deposits: 57600 },
      { date: "Jul", rewards: 2020, deposits: 60400 },
      { date: "Aug", rewards: 2180, deposits: 63200 },
      { date: "Sep", rewards: 2340, deposits: 66100 },
      { date: "Oct", rewards: 2510, deposits: 69000 },
      { date: "Nov", rewards: 2680, deposits: 71800 },
      { date: "Dec", rewards: 2850, deposits: 74500 },
    ],
  };

  const currentData = stakingDataSets[timeFilter];
  const chartConfig = {
    id: "staking-chart",
    color: "var(--primary)",
  } as ChartConfig;
  return (
    <div className="flex flex-col gap-10 h-full ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
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
            Analytics
          </GradientText>
          <p className=" mx-3">Track your staking rewards and deposits</p>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-1 p-1  rounded-lg transition-colors duration-100 ease-in">
            {["7D", "30D", "12M"].map((period) => (
              <Button
                key={period}
                variant={timeFilter === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter(period as TimeFilter)}
                className={
                  timeFilter === period
                    ? "bg-[var(--accent)] cursor-pointer"
                    : "cursor-pointer hover:bg-[var(--accent)]"
                }
              >
                {period}
              </Button>
            ))}
          </div>
          <Button className="gap-1 bg-[image:var(--gradient-third)]  cursor-pointer">
            <DollarSign className="h-4 w-4" />
            Stake More
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-[image:var(--gradient-third)] ">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Total Deposits
            </CardTitle>
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 opacity-80" />
              <span className="text-2xl font-bold">
                {formatTokenAmount(currentStake, "USDC")}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 text-sm opacity-90 text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% </span>
              <span className="text-[var(--text)]">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-[image:var(--gradient-third)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium  ">
              Total Rewards Earned
            </CardTitle>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold ">$2,850</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+8.2% </span>
              <span className="text-[var(--text)]">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-[image:var(--gradient-third)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium ">Current APY</CardTitle>
            <div className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold ">12.4%</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="secondary" className="bg-white text-green-600">
              Variable Rate
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-[image:var(--gradient-third)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium ">Days Staked</CardTitle>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 " />
              <span className="text-2xl font-bold ">247</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm ">Since Jan 2024</div>
          </CardContent>
        </Card>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rewards Chart */}
        <Card className="border-0 shadow-lg bg-[var(--third)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Rewards Over Time
            </CardTitle>
            <CardDescription>
              {timeFilter === "7D"
                ? "Daily rewards"
                : timeFilter === "30D"
                  ? "Weekly rewards"
                  : "Monthly rewards"}{" "}
              earned from staking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="">
              <LineChart
                accessibilityLayer
                data={currentData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--text)"
                  strokeOpacity={0.3}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                  tick={{ fill: "var(--text)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fill: "var(--text)" }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="rewards"
                  type="natural"
                  stroke="var(--color-rewards)"
                  strokeWidth={3}
                  dot={{
                    fill: "var(--color-rewards)",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Deposits Chart */}
        <Card className="border-0 shadow-lg bg-[var(--third)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              Total Deposits Growth
            </CardTitle>
            <CardDescription>Cumulative deposits over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="">
              <LineChart
                accessibilityLayer
                data={currentData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--text)"
                  strokeOpacity={0.3}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                  tick={{ fill: "var(--text)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  tick={{ fill: "var(--text)" }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="deposits"
                  type="natural"
                  stroke="var(--color-deposits)"
                  strokeWidth={3}
                  dot={{
                    fill: "var(--color-deposits)",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
