"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ApiKeyModal from "@/components/ApiKeyModal";
import { API_KEY_STORAGE_KEY } from "@/lib/constants";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasKey(!!localStorage.getItem(API_KEY_STORAGE_KEY));
  }, []);

  const navLink = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setMenuOpen(false)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          active
            ? "bg-[#1a1a1a] text-white"
            : "text-[#888] hover:text-white hover:bg-[#1a1a1a]"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#2e2e2e] bg-[#0f0f0f]/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/assets/SketchyNewsCercle.png"
              alt="SketchyNews"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="font-semibold text-base tracking-tight text-white">
              SketchyNews
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLink("/", "Generate")}
            {navLink("/about", "About")}
            <button
              onClick={() => setModalOpen(true)}
              className={`ml-1 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                hasKey
                  ? "border-[#e86a6a]/30 text-[#e86a6a] hover:bg-[#e86a6a]/10"
                  : "border-[#2e2e2e] text-[#888] hover:text-white hover:bg-[#1a1a1a]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  hasKey ? "bg-[#e86a6a]" : "bg-[#555]"
                }`}
              />
              API Key
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                hasKey
                  ? "border-[#e86a6a]/30 text-[#e86a6a]"
                  : "border-[#2e2e2e] text-[#888]"
              }`}
            >
              API Key
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-lg text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#2e2e2e] px-4 py-2 flex flex-col gap-1">
            {navLink("/", "Generate")}
            {navLink("/about", "About")}
          </div>
        )}
      </header>

      <ApiKeyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(key) => setHasKey(!!key)}
      />
    </>
  );
}
