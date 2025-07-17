// app/components/Header.tsx
"use client";

import { useState } from "react";
import { SiFarcaster } from "react-icons/si";
import { usePathname, useRouter } from "next/navigation";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
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
          <a href="https://x.com/Jagantara_ofc" target="_blank">
            <FaXTwitter size={20} />
          </a>
          <a href="https://discord.gg/fNkrb6FB55" target="_blank">
            <FaDiscord size={20} />
          </a>
          <a
            href="https://www.linkedin.com/company/jaganusantara"
            target="_blank"
          >
            <FaLinkedin size={20} />
          </a>
          <a href="">
            <FaInstagram size={20} />
          </a>
          <a href="https://t.me/+QjYXOLJ3diNmM2I1" target="_blank">
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
