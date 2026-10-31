
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Newsletter from "./newsletter";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const categories = [
  { name: "Photography Studios", href: "/studios?category=photography" },
  { name: "Music Studios", href: "/studios?category=music" },
  { name: "Dance Studios", href: "/studios?category=dance" },
  { name: "Podcast Studios", href: "/studios?category=podcast" },
  { name: "Creative Spaces", href: "/studios?category=creative" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    name: "X",
    href: "https://x.com",
    icon: FaXTwitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-[#faf9f6]">

      {/* Main Footer */}
      <div className="mx-auto max-w-360 px-6 pb-12 pt-16 lg:px-10">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand Section */}
          <div className="lg:col-span-4">

            <Link href="/" className="mb-5 inline-flex items-center gap-3">

              {/* Logo */}

              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  Studio <span className="text-orange-500">Space</span>
                </h2>

                <p className="text-[9px] font-semibold tracking-[2px] text-gray-500">
                  CREATIVE MARKETPLACE
                </p>
              </div>

            </Link>

            <p className="max-w-sm text-sm leading-7 text-gray-500">
              Discover inspiring creative spaces and connect with
              amazing studios. Studio Space makes it easy to find
              and book the perfect place to bring your ideas to life.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>

          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">

            <h3 className="mb-6 text-base font-bold text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-all duration-300 hover:pl-1 hover:text-orange-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Categories */}
          <div className="lg:col-span-2">

            <h3 className="mb-6 text-base font-bold text-gray-900">
              Popular Categories
            </h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-gray-500 transition-all duration-300 hover:pl-1 hover:text-orange-500"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">

            <h3 className="mb-4 text-base font-bold text-gray-900">
              Stay in the Creative Loop
            </h3>

            <p className="mb-5 text-sm leading-6 text-gray-500">
              Get the latest studio updates, creative inspiration,
              and exclusive offers directly in your inbox.
            </p>

            <Newsletter/>

            <p className="mt-3 text-xs leading-5 text-gray-400">
              By subscribing, you agree to receive our updates.
            </p>

          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">

        <div className="mx-auto flex max-w-360 flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:flex-row sm:px-10 sm:text-left">

          <p className="text-xs text-gray-500">
            © Studio Space. All rights reserved.
          </p>

          <div className="flex items-center gap-6">

            <Link
              href="/privacy-policy"
              className="text-xs text-gray-500 transition hover:text-orange-500"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-gray-500 transition hover:text-orange-500"
            >
              Terms & Conditions
            </Link>

          </div>

          <p className="text-xs text-gray-400">
            Made for Creators, with Creativity.
          </p>

        </div>
      </div>

    </footer>
  );
}

