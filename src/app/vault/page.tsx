import { Metadata } from "next";
import VaultVisualization from "./components/vault-canvas";
import GradientText from "@/components/gradient-text";
import { Button } from "@/components/ui/moving-border";

export const metadata: Metadata = {
  title: "Jagantara | Vault",
  description: "Decentralized coverage",
  icons: "./jagantara_icon.png",
};

export default function VaultPage() {
  return (
    <main className="w-full pt-2 pb-20">
      <section className="bg-[image:var(--gradient-secondary)] mx-10 rounded-3xl">
        <VaultVisualization />
      </section>
    </main>
  );
}
