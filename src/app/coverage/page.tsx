import { Metadata } from "next";
import CoverageInterface from "./components/CoverageInterface";
export const metadata: Metadata = {
  title: "Jagantara | Coverage",
  description: "Decentralized coverage",
  icons: "./jagantara_icon.png",
};
export default function ClaimPage() {
  return (
    <main className="w-full pt-2 " style={{ background: "var(--background)" }}>
      <section className=" mx-10 px-20 rounded-3xl h-[80vh] overflow-y-auto hide-scrollbar ">
        <div className="">
          <CoverageInterface />
        </div>
      </section>
    </main>
  );
}
