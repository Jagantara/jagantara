import { Metadata } from "next";
import DAOInterface from "./components/DAOInterface";

export const metadata: Metadata = {
  title: "Jagantara | JagaDAO",
  description: "Decentralized coverage",
  icons: "./jagantara_icon.png",
};

export default function JagaDAOPage() {
  return (
    <main className="w-full pt-2 " style={{ background: "var(--background)" }}>
      <section className="bg-[image:var(--gradient-secondary)] mx-10 px-20 rounded-3xl h-[80vh] overflow-y-auto hide-scrollbar ">
        <div className="py-10">
          <DAOInterface />
        </div>
      </section>
    </main>
  );
}
