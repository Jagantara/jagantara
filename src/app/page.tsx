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
import { ArrowRight, Badge, CheckCircle, Shield } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import SplitText from "@/components/split-text";
import FadeContent from "@/components/fade-content";
import AnimatedContent from "@/components/animated-content";
import Image from "next/image";
function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <main className="flex-1 mx-auto max-w-11/12">
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
                        <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
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
                        style={{ background: "var(--primary)", color: "white" }}
                        className="hover:opacity-90 cursor-pointer"
                      >
                        Get Coverage Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="hover:opacity-80 cursor-pointer"
                        style={{
                          background: "var(--secondary)",
                          color: "var(--text)",
                          borderColor: "var(--secondary)",
                        }}
                      >
                        View Demo
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
                          Total Claimed
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
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none float-animation ">
                      <Image
                        src="/jagantara_icon.png" // or use an <Icon /> component
                        alt="Icon"
                        loading="lazy"
                        width={400}
                        height={400}
                      />
                    </div>
                  </FadeContent>
                </div>
              </div>
            </div>
          </div>
        </section>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem voluptatum dolor rem sed dolorum at odio repellat
          laboriosam dicta, obcaecati fugiat praesentium labore, ea a nihil
          necessitatibus neque iste quasi.
        </p>
      </main>
    </>
  );
}

export default App;
