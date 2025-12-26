"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
   
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <FaHome className="text-[#658C58] text-2xl" />
          <span className="text-[#658C58] font-bold text-xl">RivoRent</span>
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <button
          className="md:hidden text-2xl text-[#658C58]"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links (Desktop Only) */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                pathname === item.href
                  ? "text-white bg-[#658C58]"
                  : "text-gray-700 hover:text-white hover:bg-[#658C58]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-2 px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)} // close on click
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                pathname === item.href
                  ? "text-white bg-[#658C58]"
                  : "text-gray-700 hover:text-white hover:bg-[#658C58]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
