'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Cuboid, Moon, Menu, X, LogIn } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';


import {
  ChevronDown,
  PlusCircle,
  LayoutDashboard,
  CalendarDays,
  LogOut,
} from "lucide-react";



const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore Studios', href: '/studios' },
  { name: 'How It Works', href: '/works' },
  { name: 'About Us', href: '/about' },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  console.log(user);
  const handleSignout = () => {
    authClient.signOut();
  };

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  if(isPending){
    <div>loading</div>
  }
  return (
    <div className=' w-full  border border-gray-200/80 bg-white/90 px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl'>
    <header className="sticky top-0 z-50 w-full max-w-7xl mx-auto ">
      <nav className="mx-auto flex max-w-360 items-center justify-between   ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 shadow-md shadow-orange-200">
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
                    ? ' text-orange-500'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-orange-500'
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

{user ? (
  <Popover>
    <PopoverTrigger>
      <button className="flex items-center gap-2 rounded-full border border-gray-200 p-1.5 pr-3 transition hover:bg-gray-50">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image as string} alt={user.name || "User"} />
          <AvatarFallback>
            {user.name?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <span className="max-w-24 truncate text-sm font-semibold text-gray-800">
          {user.name}
        </span>

        <ChevronDown size={16} className="text-gray-500" />
      </button>
    </PopoverTrigger>

    <PopoverContent align="end" className="w-60 p-2">
      <div className="border-b border-gray-100 px-3 py-2">
        <p className="text-xs text-gray-400">Signed in as</p>
        <p className="text-sm font-semibold text-gray-900">
          {user.name}
        </p>
        <p className="truncate text-xs text-gray-500">
          {user.email}
        </p>
      </div>

      <div className="space-y-1 py-2">
        <Link
          href="/add-studio"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
        >
          <PlusCircle size={17} />
          Add New Studio
        </Link>

        <Link
          href="/my-listing"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
        >
          <LayoutDashboard size={17} />
          My Studio Listings
        </Link>

        <Link
          href="/my-booking"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
        >
          <CalendarDays size={17} />
          My Bookings
        </Link>
      </div>

      <div className="border-t border-gray-100 pt-2">
        <button
          onClick={handleSignout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </PopoverContent>
  </Popover>
) : (
  <>
    
    <div className="flex items-center gap-3">
    <Link
      href="/login"
      className="flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-500 hover:text-orange-500"
    >
      <LogIn size={17} />
      Sign In
    </Link>

    <Link
      href="/register"
      className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
    >
      Register
    </Link>
  </div>
  </>
)}
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
      {/* Mobile Navigation */}
{isOpen && (
  <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg lg:hidden">
    {/* Navigation Links */}
    <div className="space-y-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setIsOpen(false)}
          className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
            pathname === link.href
              ? "bg-orange-100 text-orange-500"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>

    <hr className="my-3 border-gray-100" />

    {user ? (
      <>
        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-4">
          <Avatar className="h-11 w-11">
            <AvatarImage
              src={user.image as string}
              alt={user.name || "User"}
            />
            <AvatarFallback>
              {user.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        {/* User Menu */}
        <div className="mt-3 space-y-1">
          <Link
            href="/add-studio"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <PlusCircle size={18} />
            Add New Studio
          </Link>

          <Link
            href="/my-listing"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <LayoutDashboard size={18} />
            My Studio Listings
          </Link>

          <Link
            href="/my-booking"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <CalendarDays size={18} />
            My Bookings
          </Link>
        </div>

        <hr className="my-3 border-gray-100" />

        {/* Sign Out */}
        <button
          onClick={async () => {
            await authClient.signOut();
            setIsOpen(false);
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </>
    ) : (
      <>
        <Link
          href="/login"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <LogIn size={18} />
          Sign In
        </Link>

        <Link
          href="/register"
          onClick={() => setIsOpen(false)}
          className="mt-2 block rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Register
        </Link>
      </>
    )}
  </div>
)}
    </header>
    </div>
  );
}
