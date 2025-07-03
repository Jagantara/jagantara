import { Metadata } from "next";

import StakingDetail from "./components/StakingDetail";
export const metadata: Metadata = {
  title: "Jagantara | Earn",
  description: "Decentralized coverage",
  icons: "./jagantara_icon.png",
};
export default function EarnPage() {
  // const [timeFilter, setTimeFilter] = useState("12M");
  return (
    <main className="w-full pt-2 " style={{ background: "var(--background)" }}>
      <section className="bg-[image:var(--gradient-secondary)] mx-10 px-32 rounded-3xl h-[80vh] overflow-y-auto hide-scrollbar ">
        <div className="py-10">
          <StakingDetail />
        </div>
      </section>
    </main>
  );
}
