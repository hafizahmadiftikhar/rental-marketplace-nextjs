"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHome,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
} from "react-icons/fa";

const postalCodes = [
  16146, 43402, 43412, 43416, 43420, 43431, 43440, 43450, 43452, 43460, 43465,
  43506, 43512, 43517, 43528, 43537, 43542, 43545, 43551, 43554, 43558, 43560,
  43566, 43571, 43614, 43615, 43623, 44001, 44011, 44012, 44017, 44021, 44022,
  44023, 44024, 44026, 44035, 44039, 44041, 44044, 44050, 44052, 44053, 44054,
  44055, 44056, 44057, 44060, 44062, 44067, 44070, 44072, 44074, 44077, 44084,
  44087, 44089, 44090, 44092, 44094, 44095, 44101, 44102, 44103, 44104, 44105,
  44106, 44107, 44108, 44109, 44110, 44111, 44112, 44113, 44114, 44115, 44116,
  44117, 44118, 44119, 44120, 44121, 44122, 44123, 44124, 44125, 44126, 44127,
  44128, 44129, 44130, 44131, 44132, 44133, 44134, 44135, 44136, 44137, 44138,
  44139, 44140, 44141, 44142, 44143, 44144, 44145, 44146, 44147, 44149, 44201,
  44202, 44203, 44212, 44215, 44216, 44221, 44223, 44224, 44230, 44231, 44233,
  44234, 44236, 44240, 44241, 44243, 44254, 44255, 44256, 44260, 44262, 44264,
  44266, 44270, 44273, 44278, 44280, 44281, 44286, 44301, 44302, 44303, 44304,
  44305, 44306, 44307, 44308, 44310, 44311, 44312, 44313, 44314, 44319, 44320,
  44321, 44333, 44405, 44406, 44408, 44410, 44413, 44418, 44420, 44425, 44429,
  44437, 44438, 44440, 44444, 44446, 44452, 44460, 44471, 44473, 44481, 44483,
  44484, 44485, 44502, 44503, 44504, 44505, 44507, 44509, 44510, 44511, 44512,
  44514, 44515, 44685,
];

const Footer = () => {
  const [showAllCodes, setShowAllCodes] = useState(false);
  const displayedCodes = showAllCodes ? postalCodes : postalCodes.slice(0, 40);

  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#658C58] rounded-lg flex items-center justify-center">
                <FaHome className="text-white text-xl" />
              </div>
              <span className="font-bold text-2xl text-white">RivoRent</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for finding the perfect rental property in Cleveland, Ohio. 
              We make renting simple, transparent, and stress-free.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, href: "https://www.facebook.com/share/19yyDn7Fpo/?mibextid=wwXIfr" },
                { icon: FaTwitter, href: "https://x.com/RivoRent" },
                { icon: FaInstagram, href: "http://instagram.com/_rivorent" },
                { icon: FaLinkedin, href: "http://linkedin.com/in/rivo-rent-a1136139a" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#658C58] transition-all duration-300"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Quick Links
              <span className="absolute bottom-[-8px] left-0 w-10 h-1 bg-[#658C58] rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Browse Properties", href: "/search" },
                { name: "Apply Now", href: "/apply" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#658C58] transition-colors duration-300 flex items-center gap-2 group text-sm"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Contact Us
              <span className="absolute bottom-[-8px] left-0 w-10 h-1 bg-[#658C58] rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#658C58]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-[#658C58] text-sm" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Cleveland, Ohio</p>
                  <p className="text-gray-500 text-xs">United States</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#658C58]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-[#658C58] text-sm" />
                </div>
                <a href="tel:+18455769038" className="text-gray-400 text-sm hover:text-[#658C58] transition-colors">
                  (845) 576-9038
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#658C58]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-[#658C58] text-sm" />
                </div>
                <a href="mailto:Support@Rivo.Rent" className="text-gray-400 text-sm hover:text-[#658C58] transition-colors">
                  Support@Rivo.Rent
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <p className="text-sm font-medium text-white mb-2">Business Hours</p>
              <p className="text-gray-400 text-xs">Fri: 8:00 AM - 10:00 PM</p>
              <p className="text-gray-400 text-xs">Sat: 10:00 AM - 4:00 PM</p>
              {/* <p className="text-gray-400 text-xs">Sun: 10:00 AM - 4:00 PM</p> */}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Stay Updated
              <span className="absolute bottom-[-8px] left-0 w-10 h-1 bg-[#658C58] rounded-full"></span>
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest properties and exclusive deals.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#658C58]/50 border border-white/10"
              />
              <button className="w-full bg-[#658C58] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#507144] transition-colors">
                Subscribe
              </button>
            </div>

            <div className="mt-6 flex gap-2">
              <div className="px-3 py-1.5 bg-white/5 rounded-lg">
                <p className="text-[10px] text-gray-500">Licensed</p>
                <p className="text-xs text-white font-medium">Real Estate</p>
              </div>
              <div className="px-3 py-1.5 bg-white/5 rounded-lg">
                <p className="text-[10px] text-gray-500">Verified</p>
                <p className="text-xs text-white font-medium">Properties</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Service Areas - Postal Codes */}
<div className="mt-12 pt-10 border-t border-white/10">
  <div className="flex items-center justify-between mb-6">
    <h4 className="text-lg font-semibold text-white">
      Service Areas <span className="text-gray-500 text-sm font-normal ml-2">({postalCodes.length} ZIP Codes)</span>
    </h4>
    <button
      onClick={() => setShowAllCodes(!showAllCodes)}
      className="flex items-center gap-2 text-[#658C58] text-sm hover:underline"
    >
      {showAllCodes ? "Show Less" : "View All"}
      {showAllCodes ? <FaChevronUp /> : <FaChevronDown />}
    </button>
  </div>
  
  {/* ✅ Changed from flex-wrap to grid */}
  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
    {displayedCodes.map((code) => (
      <Link
        key={code}
        href={`/search?postalCode=${code}`}
        className="px-2 py-1.5 bg-white/5 rounded-lg text-gray-400 text-xs hover:bg-[#658C58] hover:text-white transition-all duration-300 text-center"
      >
        {code}
      </Link>
    ))}
  </div>
</div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} RivoRent Inc. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-[#658C58] transition-colors">
                Privacy Policy
              </Link>
              {/* <Link href="/terms" className="text-gray-500 hover:text-[#658C58] transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-[#658C58] transition-colors">
                Sitemap
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;