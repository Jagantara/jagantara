import { Metadata } from "next";
import { ChatInterface } from "./components/ChatInterface";

export const metadata: Metadata = {
  title: "Jagantara | JagaBot",
  description: "Decentralized coverage",
  icons: "./jagantara_icon.png",
};

export default function JagaBotPage() {
  return (
    <main className="w-full pt-2 " style={{ background: "var(--background)" }}>
      <section className=" mx-10 px-20 rounded-3xl h-[80vh] overflow-y-auto hide-scrollbar ">
        <div className="">
          <ChatInterface />
        </div>
      </section>
    </main>
  );
}
