// app/components/Header.tsx
"use client";

import { useState } from "react";
import { ChevronDown, LayoutGrid, Moon, Sun } from "lucide-react"; // optional icons
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ConnectWallet from "./ConnectWallet";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const navItems = [
    // "Dashboard",
    "Earn",
    "Coverage",
    "JagaDAO",
    "Vault",
    "Campaign",
  ];
  const pathname = usePathname();
  const active =
    navItems.find(
      (item) => pathname === `/${item.toLowerCase().replace(/\s+/g, "-")}`
    ) || "Earn";
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleClick = (item: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const targetPath = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
    if (pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push(targetPath);
  };
  return (
    <header
      className="px-6 py-3 flex items-center justify-between sticky w-full top-0 z-50"
      style={{ background: "var(--background)" }}
    >
      {/* Left: Logo & Nav */}
      <div className="flex items-center gap-10">
        <button
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src="/jagantara_icon.png" alt="Logo" width={50} height={50} />
          <span className="font-semibold text-lg">Jagantara</span>
        </button>

        <nav className="flex gap-2">
          {navItems.map((item) => (
            <button
              key={item}
              className={`text-sm px-4.5 py-2.5 rounded-full cursor-pointer font-semibold transition-colors duration-100 ease-in ${
                active === item
                  ? "bg-[var(--secondary)]"
                  : "hover:bg-[var(--secondary)]"
              }`}
              onClick={handleClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Right: Network + Wallet + Toggle */}
      <div className="flex items-center gap-3">
        {/* Wallet */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="z-[100] cursor-pointer rounded-full"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Moon className="h-[1.2rem] w-[1.2rem] transition-all " />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}
