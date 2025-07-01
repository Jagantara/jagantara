"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import CountUp from "@/components/countup";
import GradientText from "@/components/gradient-text";
export default function Component() {
  const [activeStep, setActiveStep] = useState(1);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to step changes
  const step = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1, 2, 3, 3]);

  useEffect(() => {
    const unsubscribe = step.onChange((latest) => {
      setActiveStep(Math.round(latest));
    });
    return unsubscribe;
  }, [step]);

  const renderCanvas = () => {
    switch (activeStep) {
      case 1:
        return <Step1Canvas />;
      case 2:
        return <Step2Canvas />;
      case 3:
        return <Step3Canvas />;
      default:
        return <Step1Canvas />;
    }
  };

  return (
    <div className=" ">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Content - Sticky */}
          <div className="lg:sticky lg:top-16 lg:h-[80vh] lg:flex lg:flex-col lg:justify-center p-8">
            <div className="space-y-12">
              <div className="flex flex-row justify-between items-end">
                <GradientText
                  colors={[
                    "var(--primary)",
                    "var(--accent)",
                    "var(--primary)",
                    "var(--accent)",
                  ]}
                  animationSpeed={6}
                  showBorder={false}
                  className="font-semibold !pb-0"
                >
                  How it Works
                </GradientText>
                <Button
                  size="lg"
                  style={{
                    background: "var(--gradient-primary)",
                    color: "white",
                  }}
                  className="group hover:opacity-90 cursor-pointer glow-blue relative overflow-hidden pr-10"
                  onClick={() => window.open("/dashboard", "_blank")} // 👈 open in new tab
                >
                  Deposit Now
                  <ArrowUpRight className="ml-2 h-4 w-4 arrow-animate-out transition-all duration-300 group-hover:arrow-out" />
                  <ArrowUpRight className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-0 arrow-animate-in transition-all duration-300 group-hover:arrow-in" />
                </Button>
              </div>

              <div className="space-y-8">
                <motion.div
                  className="space-y-4"
                  animate={{
                    opacity: activeStep === 1 ? 1 : 0.5,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-2xl font-bold ${activeStep === 1 ? "text-blue-400" : "text-gray-500"}`}
                    >
                      01
                    </span>
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-3 ${activeStep === 1 ? "" : "text-gray-400"}`}
                      >
                        Deposit in Jagantara Vault
                      </h3>
                      {activeStep === 1 && (
                        <p className=" leading-relaxed">
                          Earn yield by depositing an asset into a vault curated
                          by third-party risk experts. Each vault has a unique
                          risk profile and strategy determined by the curator.
                          Creating Morpho Vaults is permissionless, so users
                          should assess a vault's curator and risk exposure
                          before depositing.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-4"
                  animate={{
                    opacity: activeStep === 2 ? 1 : 0.5,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-2xl font-bold ${activeStep === 2 ? "text-blue-400" : "text-gray-500"}`}
                    >
                      02
                    </span>
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-3 ${activeStep === 2 ? "" : "text-gray-400"}`}
                      >
                        Assets are supplied to Morpho Markets
                      </h3>
                      {activeStep === 2 && (
                        <p className=" leading-relaxed">
                          A Morpho Vault can only allocate deposits to Morpho
                          Markets whitelisted by the curator. Depositors in the
                          vault are exposed to risks related to each market,
                          including the collateral asset, liquidation LTV, and
                          oracles.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-4"
                  animate={{
                    opacity: activeStep === 3 ? 1 : 0.5,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-2xl font-bold ${activeStep === 3 ? "text-blue-400" : "text-gray-500"}`}
                    >
                      03
                    </span>
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-3 ${activeStep === 3 ? "" : "text-gray-400"}`}
                      >
                        Earn yield from borrowers
                      </h3>
                      {activeStep === 3 && (
                        <p className=" leading-relaxed">
                          The supplied assets are lent to borrowers who pay
                          interest. This interest is distributed back to vault
                          depositors as yield, minus any fees taken by the vault
                          curator or protocol.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="flex flex-col justify-between p-4 rounded-2xl shadow-md  bg-[image:var(--gradient-primary)] text-white">
                <p className="text-sm font-normal opacity-70">Total Deposits</p>
                <span className="text-4xl font-normal tracking-tight">
                  $
                  <CountUp from={0} to={10000000} separator="," duration={1} />
                </span>
              </div>
            </div>
          </div>

          {/* Right Canvas - Changes based on scroll */}
          <div className="min-h-[200vh] flex items-start justify-center pt-20">
            <div className="sticky top-30">{renderCanvas()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1 Canvas Component
function Step1Canvas() {
  return (
    <svg
      width="400"
      height="600"
      viewBox="0 0 400 600"
      className="w-full max-w-md"
    >
      <defs>
        <radialGradient id="lenderGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
        <radialGradient id="lenderGradient2" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </radialGradient>
        <linearGradient id="wethGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="30%" stopColor="#60a5fa" />
          <stop offset="70%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <text
          x="200"
          y="25"
          textAnchor="middle"
          className="fill-[var(--text)] text-sm font-medium"
        >
          Staker
        </text>
        <ellipse
          cx="200"
          cy="55"
          rx="25"
          ry="20"
          fill="url(#lenderGradient)"
          filter="url(#glow)"
        />
        <ellipse
          cx="200"
          cy="100"
          rx="30"
          ry="30"
          fill="url(#lenderGradient2)"
          filter="url(#glow)"
        />

        <line
          x1="200"
          y1="130"
          x2="200"
          y2="170"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
        <polygon points="195,165 200,175 205,165" fill="#60a5fa" />

        <ellipse
          cx="200"
          cy="200"
          rx="40"
          ry="25"
          fill="url(#wethGradient)"
          filter="url(#glow)"
        />
        <text
          x="200"
          y="205"
          textAnchor="middle"
          className="fill-[var(--text)]  text-xs font-bold"
        >
          USDC
        </text>

        <line
          x1="200"
          y1="225"
          x2="200"
          y2="280"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
        <polygon points="195,275 200,285 205,275" fill="#60a5fa" />

        <text
          x="200"
          y="310"
          textAnchor="middle"
          className="fill-[var(--text)]  text-sm font-medium"
        >
          Jagantara Vault
        </text>

        <g transform="translate(200, 400)">
          <path
            d="M -50 -50 L 50 -50 L 50 50 L -50 50 Z"
            fill="url(#vaultGradient)"
            filter="url(#glow)"
          />
          <path
            d="M 50 -50 L 70 -70 L 70 30 L 50 50 Z"
            fill="url(#lenderGradient2)"
          />
          <path
            d="M -50 -50 L -30 -70 L 70 -70 L 50 -50 Z"
            fill="url(#lenderGradient2)"
          />
          <motion.foreignObject
            x={-40}
            y={-40}
            width={80}
            height={80}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/jagantara_icon.png"
              alt="Jagantara Icon"
              width="80"
              height="80"
              style={{
                pointerEvents: "none",
                borderRadius: "50%",
                filter: "brightness(0.6)", // ⬅️ darkens the icon
              }}
            />
          </motion.foreignObject>
        </g>
      </motion.g>
    </svg>
  );
}

// Step 2 Canvas Component
function Step2Canvas() {
  return (
    <svg
      width="400"
      height="600"
      viewBox="0 0 400 600"
      className="w-full max-w-md"
    >
      <defs>
        <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="30%" stopColor="#60a5fa" />
          <stop offset="70%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="marketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* WETH Vault at top */}
        <text
          x="210"
          y="15"
          textAnchor="middle"
          className="fill-[var(--text)] text-sm font-medium"
        >
          Jagantara Vault
        </text>
        <g transform="translate(200, 80)">
          <path
            d="M -40 -40 L 40 -40 L 40 40 L -40 40 Z"
            fill="url(#vaultGradient)"
            filter="url(#glow)"
          />
          <path
            d="M 40 -40 L 55 -55 L 55 25 L 40 40 Z"
            fill="url(#marketGradient)"
          />
          <path
            d="M -40 -40 L -25 -55 L 55 -55 L 40 -40 Z"
            fill="url(#marketGradient)"
          />
          <motion.foreignObject
            x={-35}
            y={-35}
            width={80}
            height={80}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/jagantara_icon.png"
              alt="Jagantara Icon"
              width="70"
              height="70"
              style={{
                pointerEvents: "none",
                borderRadius: "50%",
                filter: "brightness(0.6)", // ⬅️ darkens the icon
              }}
            />
          </motion.foreignObject>
        </g>

        {/* Arrow down */}
        <line
          x1="200"
          y1="130"
          x2="200"
          y2="180"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
        <polygon points="195,175 200,185 205,175" fill="#60a5fa" />

        {/* Dotted container for markets */}
        <rect
          x="50"
          y="200"
          width="300"
          height="200"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1"
          strokeDasharray="8,4"
          rx="10"
          opacity="0.6"
        />

        {/* Three market cylinders */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* wstETH / WETH */}
          <g transform="translate(120, 280)">
            <ellipse
              cx="0"
              cy="-25"
              rx="35"
              ry="8"
              fill="url(#marketGradient)"
            />
            <rect
              x="-35"
              y="-25"
              width="70"
              height="50"
              fill="url(#marketGradient)"
              filter="url(#glow)"
            />
            <ellipse cx="0" cy="25" rx="35" ry="8" fill="#1e40af" />
            <text
              x="0"
              y="45"
              textAnchor="middle"
              className="fill-white text-xs font-medium"
            >
              wstETH / WETH
            </text>
          </g>

          {/* sDAI / WETH */}
          <g transform="translate(200, 280)">
            <ellipse
              cx="0"
              cy="-25"
              rx="35"
              ry="8"
              fill="url(#marketGradient)"
            />
            <rect
              x="-35"
              y="-25"
              width="70"
              height="50"
              fill="url(#marketGradient)"
              filter="url(#glow)"
            />
            <ellipse cx="0" cy="25" rx="35" ry="8" fill="#1e40af" />
            <text
              x="0"
              y="45"
              textAnchor="middle"
              className="fill-white text-xs font-medium"
            >
              sDAI / WETH
            </text>
          </g>

          {/* sfrxETH / WETH */}
          <g transform="translate(280, 280)">
            <ellipse
              cx="0"
              cy="-25"
              rx="35"
              ry="8"
              fill="url(#marketGradient)"
            />
            <rect
              x="-35"
              y="-25"
              width="70"
              height="50"
              fill="url(#marketGradient)"
              filter="url(#glow)"
            />
            <ellipse cx="0" cy="25" rx="35" ry="8" fill="#1e40af" />
            <text
              x="0"
              y="45"
              textAnchor="middle"
              className="fill-white text-xs font-medium"
            >
              sfrxETH / WETH
            </text>
          </g>
        </motion.g>

        {/* Connecting arrows */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <line
            x1="200"
            y1="185"
            x2="120"
            y2="230"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <polygon points="115,225 125,235 120,240" fill="#60a5fa" />

          <line
            x1="200"
            y1="185"
            x2="200"
            y2="230"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <polygon points="195,225 200,235 205,225" fill="#60a5fa" />

          <line
            x1="200"
            y1="185"
            x2="280"
            y2="230"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <polygon points="275,225 285,235 280,240" fill="#60a5fa" />
        </motion.g>

        {/* Bottom element (partially visible) */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ellipse
            cx="200"
            cy="480"
            rx="40"
            ry="15"
            fill="url(#marketGradient)"
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}

// Step 3 Canvas Component
function Step3Canvas() {
  return (
    <svg
      width="400"
      height="600"
      viewBox="0 0 400 600"
      className="w-full max-w-md"
    >
      <defs>
        <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="30%" stopColor="#60a5fa" />
          <stop offset="70%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="yieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Borrowers at bottom */}
        <text
          x="200"
          y="550"
          textAnchor="middle"
          className="fill-[var(--text)]  text-sm font-medium"
        >
          Policyholders
        </text>

        <ellipse
          cx="200"
          cy="455"
          rx="25"
          ry="20"
          fill="url(#yieldGradient)"
          filter="url(#glow)"
        />
        <ellipse
          cx="200"
          cy="500"
          rx="30"
          ry="30"
          fill="url(#yieldGradient)"
          filter="url(#glow)"
        />
        {/* Arrows from Policyholder to $ icons */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left Line + Arrow */}
          <line
            x1="200"
            y1="500"
            x2="100"
            y2="350"
            stroke="#34d399"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <polygon points="95,355 100,345 105,355" fill="#34d399" />

          {/* Center Line + Arrow */}
          <line
            x1="200"
            y1="500"
            x2="200"
            y2="350"
            stroke="#34d399"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <polygon points="195,355 200,345 205,355" fill="#34d399" />

          {/* Right Line + Arrow */}
          <line
            x1="200"
            y1="500"
            x2="300"
            y2="350"
            stroke="#34d399"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <polygon points="295,355 300,345 305,355" fill="#34d399" />
        </motion.g>

        {/* Yield flow visualization */}
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <circle
            cx="100"
            cy="320"
            r="20"
            fill="url(#yieldGradient)"
            filter="url(#glow)"
          />
          <text
            x="100"
            y="325"
            textAnchor="middle"
            className="fill-[var(--text)]  text-xs font-bold"
          >
            $
          </text>

          <circle
            cx="200"
            cy="320"
            r="20"
            fill="url(#yieldGradient)"
            filter="url(#glow)"
          />
          <text
            x="200"
            y="325"
            textAnchor="middle"
            className="fill-[var(--text)]  text-xs font-bold"
          >
            $
          </text>

          <circle
            cx="300"
            cy="320"
            r="20"
            fill="url(#yieldGradient)"
            filter="url(#glow)"
          />
          <text
            x="300"
            y="325"
            textAnchor="middle"
            className="fill-[var(--text)]  text-xs font-bold"
          >
            $
          </text>
        </motion.g>

        {/* Arrows pointing up (yield flow) */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          {/* Left Line + Arrow */}
          <line
            x1="100"
            y1="300"
            x2="100"
            y2="250"
            stroke="#34d399"
            strokeWidth="2"
          />
          <polygon points="95,245 100,235 105,245" fill="#34d399" />

          {/* Center Line + Arrow */}
          <line
            x1="200"
            y1="300"
            x2="200"
            y2="250"
            stroke="#34d399"
            strokeWidth="2"
          />
          <polygon points="195,245 200,235 205,245" fill="#34d399" />

          {/* Right Line + Arrow */}
          <line
            x1="300"
            y1="300"
            x2="300"
            y2="250"
            stroke="#34d399"
            strokeWidth="2"
          />
          <polygon points="295,245 300,235 305,245" fill="#34d399" />
        </motion.g>

        {/* Vault receiving yield */}
        <text
          x="210"
          y="50"
          textAnchor="middle"
          className="fill-[var(--text)]  text-sm font-medium"
        >
          Jagantara Vault
        </text>
        <g transform="translate(200, 150)">
          <path
            d="M -50 -50 L 50 -50 L 50 50 L -50 50 Z"
            fill="url(#vaultGradient)"
            filter="url(#glow)"
          />
          <path
            d="M 50 -50 L 70 -70 L 70 30 L 50 50 Z"
            fill="url(#yieldGradient)"
            opacity="0.7"
          />
          <path
            d="M -50 -50 L -30 -70 L 70 -70 L 50 -50 Z"
            fill="url(#yieldGradient)"
            opacity="0.7"
          />
          <motion.foreignObject
            x={-35}
            y={-35}
            width={80}
            height={80}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/jagantara_icon.png"
              alt="Jagantara Icon"
              width="70"
              height="70"
              style={{
                pointerEvents: "none",
                borderRadius: "50%",
                filter: "brightness(0.6)", // ⬅️ darkens the icon
              }}
            />
          </motion.foreignObject>
        </g>
      </motion.g>
    </svg>
  );
}
