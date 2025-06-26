"use client";

import { useState } from "react";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../../components/ui/resizable-navbar";
import ConnectWallet from "./ConnectWallet";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export default function Header() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "FAQ",
      link: "#contact",
    },
    {
      name: "Docs",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <header className="sticky w-full top-0 z-50 ">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          {/* <NavbarLogo /> */}
          <a className="font-bold text-lg cursor-pointer z-100" href="/">
            Jagantara
          </a>
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="z-[100]"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <ConnectWallet />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}
