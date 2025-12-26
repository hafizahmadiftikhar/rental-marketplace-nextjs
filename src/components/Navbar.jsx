"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBars, FaTimes, FaPhone, FaArrowRight, FaBuilding } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Properties" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Check if current path matches nav item
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-sm"
        }`}
      >
        {/* Top Bar - Desktop Only */}
        <div className="hidden md:block bg-[#2F5233] text-white">
          <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-sm">
            <p className="text-white/80">
              🏠 Find your perfect rental in Cleveland, Ohio
            </p>
            <div className="flex items-center gap-4">
              <a
                href="tel:+18455769038"
                className="flex items-center gap-2 hover:text-[#a5d6a7] transition-colors"
              >
                <FaPhone className="text-xs" />
                (845) 576-9038
              </a>
              <span className="text-white/40">|</span>
              <Link href="/apply" className="hover:text-[#a5d6a7] transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#658C58] to-[#507144] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <FaHome className="text-white text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#2F5233] font-bold text-xl leading-tight">
                  RivoRent
                </span>
                <span className="text-gray-400 text-[10px] font-medium tracking-wider hidden sm:block">
                  RENTALS MADE EASY
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-[#658C58]"
                      : "text-gray-600 hover:text-[#658C58]"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#658C58] rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/apply"
                className="bg-gradient-to-r from-[#658C58] to-[#507144] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#658C58]/25 transition-all duration-300 flex items-center gap-2 group"
              >
                Apply Now
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-[#658C58] hover:bg-[#658C58] hover:text-white transition-all duration-300"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ${
            open
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? "bg-[#658C58] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-3">
                  {item.href === "/search" && <FaBuilding className="text-sm" />}
                  {item.label}
                </span>
                <FaArrowRight
                  className={`text-xs ${
                    isActive(item.href) ? "text-white/70" : "text-gray-400"
                  }`}
                />
              </Link>
            ))}

            {/* Mobile Menu Divider */}
            <div className="border-t border-gray-100 my-3"></div>

            {/* Mobile CTA */}
            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#658C58] to-[#507144] text-white px-4 py-3 rounded-xl text-sm font-semibold mt-2"
            >
              Apply Now
              <FaArrowRight className="text-xs" />
            </Link>

            {/* Mobile Contact */}
            <a
              href="tel:+8455769038"
              className="flex items-center justify-center gap-2 w-full border border-[#658C58] text-[#658C58] px-4 py-3 rounded-xl text-sm font-semibold mt-2"
            >
              <FaPhone className="text-xs" />
              Call Us: (845) 576-9038
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-[calc(40px+80px)]"></div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}