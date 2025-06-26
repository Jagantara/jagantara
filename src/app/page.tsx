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

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <main className="flex-1  px-10 mx-auto  max-w-11/12">
        <section className="w-full py-5">
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
                  <h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    style={{ color: "var(--text)" }}
                  >
                    Decentralized Protection for Your {""}
                    <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                      Digital Assets
                    </span>
                  </h1>
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
              <div className="flex items-center justify-center ">
                <div className="relative w-3/4 h-[600px] cursor-grab">
                  <Orb
                    hoverIntensity={1}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                  />
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
