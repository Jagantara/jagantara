import { NextResponse } from "next/server";
import { defaultConfig } from "@xellar/kit";
import { liskSepolia } from "viem/chains";

export async function GET() {
  const config = defaultConfig({
    appName: "Xellar",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
    xellarAppId: process.env.XELLAR_API_KEY!,
    xellarEnv: "sandbox",
    chains: [liskSepolia],
    ssr: true,
  });

  return NextResponse.json({ config });
}
