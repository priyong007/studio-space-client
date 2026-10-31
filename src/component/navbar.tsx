
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Cuboid, Moon, Menu, X, LogIn } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-gray-200/80 bg-white/90 px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-orange-200">
            <Cuboid size={27} className="text-gray-900" />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Studio <span className="text-orange-500">Space</span>
            </h1>
            <p className="text-[9px] font-semibold tracking-[2px] text-gray-500">
              CREATIVE MARKETPLACE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? " text-orange-500"
                    : "text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-5 lg:flex">
          <div className="h-10 w-px bg-gray-200" />

          <button
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-100"
          >
            <Moon size={18} />
          </button>

          <Link
            href="/login"
            className={`text-sm font-medium transition hover:text-orange-500 ${
              pathname === "/login"
                ? "text-orange-500"
                : "text-gray-700"
            }`}
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className={`rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 ${
              pathname === "/register"
                ? "bg-orange-600"
                : "bg-orange-500"
            }`}
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-800 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="mx-auto mt-3 max-w-[1440px] rounded-2xl border border-gray-200 bg-white p-5 shadow-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-100 text-orange-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <hr className="my-2 border-gray-100" />

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
                pathname === "/login"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <LogIn size={18} />
              Sign In
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className={`rounded-xl px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-600 ${
                pathname === "/register"
                  ? "bg-orange-600"
                  : "bg-orange-500"
              }`}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
