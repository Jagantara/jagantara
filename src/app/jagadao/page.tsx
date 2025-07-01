import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jagantara | Campaign",
  description: "Decentralized coverage",
  icons: "./jagantara_icon.png",
};

export default function JagaDAOPage() {
  return (
    <main className="w-full pt-2 " style={{ background: "var(--background)" }}>
      <section className="bg-[image:var(--gradient-secondary)] mx-10 p-8 rounded-3xl h-[80vh] overflow-y-auto hide-scrollbar py-8 "></section>
    </main>
  );
}
