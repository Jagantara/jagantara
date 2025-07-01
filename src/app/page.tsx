"use client";

import CountUp from "@/components/countup";
import Orb from "@/components/orb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ArrowRight,
  ArrowUpRight,
  Badge,
  CheckCircle,
  Shield,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import SplitText from "@/components/split-text";
import FadeContent from "@/components/fade-content";
import AnimatedContent from "@/components/animated-content";
import Image from "next/image";
import { StickyScrollFileClaim } from "./components/sticky-scroll-file";
import FAQLanding from "./components/FAQLanding";
import { animatePageOut } from "@/lib/transition";
import { FaWallet } from "react-icons/fa6";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  return (
    <>
      <main className="flex-1 mx-auto max-w-11/12 px-5 pb-5 ">
        <section className="w-full pb-5">
          <div className=" md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:gap-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  {/* <Badge
                    variant="secondary"
                    className="w-fit"
                    style={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--primary)",
                    }}
                  >
                    🚀 Now Live on Mainnet
                  </Badge> */}
                  <div className="">
                    <SplitText
                      text="Decentralized Protection "
                      className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none "
                      delay={20}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="left"
                      // style={{ color: "var(--text)" }}
                    />
                    <SplitText
                      text="for Your Precious"
                      className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none pr-5"
                      delay={20}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="left"
                      // style={{ color: "var(--text)" }}
                    />
                    <FadeContent
                      blur={false}
                      duration={2000}
                      easing="ease-out"
                      initialOpacity={0}
                    >
                      <h1
                        className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                        style={{ color: "var(--text)" }}
                      >
                        <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent pr-5">
                          Digital Assets
                        </span>
                      </h1>
                    </FadeContent>
                  </div>

                  <p
                    className="max-w-[600px] md:text-xl font-light"
                    style={{
                      color: "var(--text)",
                      opacity: 0.8,
                    }}
                  >
                    Jagantara provides comprehensive insurance coverage for your
                    cryptocurrency, NFTs, and DeFi investments. Powered by
                    blockchain technology for transparent, trustless protection.
                  </p>
                </div>
                <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={false}
                  duration={1.2}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Button
                        size="lg"
                        style={{
                          background: "var(--gradient-primary)",
                          color: "white",
                        }}
                        className="group hover:opacity-90 cursor-pointer glow-blue relative overflow-hidden pr-10"
                        onClick={() => window.open("/dashboard", "_blank")} // 👈 open in new tab
                      >
                        Launch App
                        <ArrowUpRight className="ml-2 h-4 w-4 arrow-animate-out transition-all duration-300 group-hover:arrow-out" />
                        <ArrowUpRight className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-0 arrow-animate-in transition-all duration-300 group-hover:arrow-in" />
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="group hover:opacity-80 cursor-pointer relative overflow-hidden pr-10"
                        style={{
                          background: "var(--secondary)",
                          color: "var(--text)",
                          borderColor: "var(--secondary)",
                        }}
                      >
                        Get Coverage
                        <ArrowUpRight className="ml-2 h-4 w-4 arrow-animate-out transition-all duration-300 group-hover:arrow-out" />
                        <ArrowUpRight className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-0 arrow-animate-in transition-all duration-300 group-hover:arrow-in" />
                      </Button>
                    </div>

                    <div
                      className="flex items-center gap-4 text-sm"
                      style={{ color: "var(--text)", opacity: 0.8 }}
                    >
                      <div className="flex items-center gap-1">
                        <CheckCircle
                          className="h-4 w-4"
                          style={{ color: "var(--primary)" }}
                        />
                        <span>$50M+ Assets Protected</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle
                          className="h-4 w-4"
                          style={{ color: "var(--primary)" }}
                        />
                        <span>24/7 Coverage</span>
                      </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:gap-6 ">
                      {/* Total Deposits */}
                      <div className="flex flex-col justify-between p-4 rounded-2xl shadow-md  bg-[image:var(--gradient-primary)] text-white">
                        <p className="text-sm font-normal opacity-70">
                          Total Deposits
                        </p>
                        <span className="text-4xl font-normal tracking-tight">
                          $
                          <CountUp
                            from={0}
                            to={10000000}
                            separator=","
                            duration={1}
                          />
                        </span>
                      </div>

                      {/* Policies Issued */}
                      <div className="flex flex-col justify-between p-4 rounded-2xl shadow-md bg-gradient-to-br from-[#002747] to-[#050208] text-white">
                        <p className="text-sm font-normal opacity-70">
                          Total Wallet Protected
                        </p>
                        <span className="text-4xl font-normal tracking-tight flex gap-1 items-end">
                          <Wallet size={30} />
                          <CountUp
                            from={0}
                            to={100000}
                            separator=","
                            duration={1}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedContent>
              </div>
              <div className="flex items-center justify-center ">
                <div className="relative w-full h-[600px] cursor-grab">
                  <Orb
                    hoverIntensity={1}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                  />
                  <FadeContent
                    blur={false}
                    duration={2000}
                    easing="ease-out"
                    initialOpacity={0}
                  >
                    {/* Desktop Icon */}
                    <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none float-animation">
                      <Image
                        src="/jagantara_icon.png"
                        alt="Jagantara Icon"
                        loading="lazy"
                        width={400}
                        height={400}
                      />
                    </div>

                    {/* Mobile Icon */}
                    <div className="absolute inset-0 flex md:hidden items-center justify-center pointer-events-none float-animation">
                      <Image
                        src="/jagantara_icon.png"
                        alt="Jagantara Icon"
                        loading="lazy"
                        width={250}
                        height={250}
                      />
                    </div>
                  </FadeContent>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:mx-6">
          <StickyScrollFileClaim />
        </section>

        <section
          id="FAQ"
          className="scroll-mt-28 w-full md:mx-6 flex flex-col justify-center items-center"
        >
          <FAQLanding />
        </section>

        <section className="w-full md:mx-6 py-20 flex flex-col justify-center items-center gap-15">
          <h1 className="text-4xl font-normal">
            Backed by trusted names in finance
          </h1>
          <div className="flex gap-5 flex-row items-end">
            <Image
              src={"/backing_img/ojk_logo.png"}
              width={200}
              height={150}
              alt="OJK Logo"
            />
            <Image
              src={"/backing_img/BI_Logo.png"}
              width={250}
              height={150}
              alt="BI Logo"
            />
            <Image
              src={"/backing_img/indodax_logo.png"}
              width={250}
              height={150}
              className="pb-3"
              alt="BI Logo"
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
