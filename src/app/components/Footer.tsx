"use client";
import Image from "next/image";
import Link from "next/link"; // Use Next.js Link for internal navigation
import { FaTelegramPlane } from "react-icons/fa";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
// A reusable component for footer links to keep the code clean
type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link
      href={href}
      className="hover:text-[var(--text)] transition-colors duration-300 text-slate-500 font-medium"
    >
      {children}
    </Link>
  </li>
);

export default function Footer() {
  // Define the link data in an object for easier management
  const footerSections = {
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "Research", href: "#" },
      { name: "GitHub", href: "#" },
      { name: "Brand Kit", href: "#" },
      { name: "Audits", href: "#" },
    ],
    "Data & Analytics": [
      { name: "Block Analitica", href: "#" },
      { name: "Dune", href: "#" },
      { name: "Token Terminal", href: "#" },
      { name: "DeFiLlama", href: "#" },
    ],
    Community: [
      { name: "Twitter", href: "https://x.com/Jagantara_ofc" },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/jaganusantara",
      },
      { name: "Instagram", href: "https://www.instagram.com/jagantara.xyz" },
      { name: "Discord", href: "https://discord.gg/fNkrb6FB55" },
      { name: "Telegram", href: "https://t.me/+QjYXOLJ3diNmM2I1" },
    ],
    Company: [
      { name: "Terms of use", href: "#" },
      { name: "Legal Notice", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Disclaimers", href: "#" },
    ],
  };

  return (
    <footer className="w-full mt-5 bg-[image:var(--gradient-secondary)] text-text h-fit">
      <div className=" mx-auto px-10 md:px-20 py-10 flex flex-col md:flex-row justify-between">
        {/* Logo Section */}
       
    
        {/* Left: Logo & Nav */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 mb-4 md:mb-0">
          <Image
            src="/jagantara_icon.png"
            width={70}
            height={70}
            alt="Jagantara Icon"
          />
          <nav className="flex flex-col md:flex-row gap-2 md:gap-10 text-slate-500 transition-colors duration-100 ease-in text-sm md:text-base">
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

        {/* Right: Socials & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
          <div className="flex gap-3">
            <a href="https://x.com/Jagantara_ofc" target="_blank">
              <FaXTwitter size={18} />
            </a>
            <a href="https://discord.gg/fNkrb6FB55" target="_blank">
              <FaDiscord size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/jaganusantara"
              target="_blank"
            >
              <FaLinkedin size={18} />
            </a>
            <a href="https://www.instagram.com/jagantara.xyz" target="_blank">
              <FaInstagram size={18} />
            </a>
            <a href="https://t.me/+QjYXOLJ3diNmM2I1" target="_blank">
              <FaTelegramPlane size={18} />
            </a>
          </div>
          <p className="text-slate-500 text-xs md:text-sm text-center md:text-right">
            © 2025 Jagantara. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
