// app/components/Header.tsx
"use client";

import { useState } from "react";
import { SiFarcaster } from "react-icons/si";
import { usePathname, useRouter } from "next/navigation";
import { FaDiscord, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
export default function Header() {
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();
  const pathname = usePathname(); // get current path

  return (
    <header
      className="px-16 py-5 flex items-center justify-between  w-full bottom-0 z- fixed"
      style={{ background: "var(--background)" }}
    >
      {/* Left: Logo & Nav */}
      <div className="flex items-center gap-10">
        <nav className="flex gap-10 text-slate-500 transition-colors duration-100 ease-in">
          <button className="hover:text-[var(--text)] cursor-pointer">
            Docs
          </button>
          <button className="hover:text-[var(--text)] cursor-pointer">
            Policies
          </button>
          <button className="hover:text-[var(--text)] cursor-pointer">
            Terms and Conditions
          </button>
          <button className="hover:text-[var(--text)] cursor-pointer">
            Support Center
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex gap-3">
          <a href="">
            <FaXTwitter size={20} />
          </a>
          <a href="">
            <FaDiscord size={20} />
          </a>
          <a href="">
            <FaLinkedin size={20} />
          </a>
          <a href="">
            <SiFarcaster size={20} />
          </a>
          <a href="">
            <FaTelegramPlane size={20} />
          </a>
        </div>
        <p className="text-slate-500">
          © 2025 Jagantara. All Rights Reserved.
        </p>
      </div>
    </header>
  );
}
