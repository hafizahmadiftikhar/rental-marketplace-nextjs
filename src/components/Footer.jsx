"use client";
import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHome,
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
  const columns = 10;
  const itemsPerColumn = Math.ceil(postalCodes.length / columns);
  const postalColumns = Array.from({ length: columns }, (_, i) =>
    postalCodes.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
  );

  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left: Logo */}
        <div className="flex flex-col gap-2 text-black">
          <div className="flex items-center gap-2">
            <FaHome className="text-3xl text-black" />
            <span className="font-bold text-2xl text-black">RivoRent Inc.</span>
          </div>
          <p className="mt-2 text-sm text-black">
            Your go-to platform for finding the best rental properties in
            Cleveland, OH.
          </p>
        </div>

        {/* Middle: Routes + Postal Codes */}
        <div className="flex flex-col md:flex-row gap-12 w-full">
          {/* Quick Links */}
          <div className="flex flex-col gap-2 text-black">
            <h4 className="font-semibold mb-2 text-black">Quick Links</h4>
            <Link
              href="/"
              className="hover:text-[#658C58] transition text-black"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-[#658C58] transition text-black"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#658C58] transition text-black"
            >
              Contact
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-[#658C58] transition text-black"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Postal Codes - Desktop (unchanged) */}
          <div className="hidden md:flex gap-6 w-full">
            {postalColumns.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-1 text-sm text-black">
                <h4 className="font-semibold mb-2 text-black">Postal Codes</h4>
                {col.map((code) => (
                  <Link
                    key={code}
                    href={`/search?postalCode=${code}`}
                    className="hover:text-[#658C58] transition text-black"
                  >
                    {code}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Postal Codes - Mobile Only (3 columns) */}
          <div className="md:hidden grid grid-cols-3 gap-4 w-full">
            {Array.from({ length: 3 }, (_, i) =>
              postalCodes.slice(i * 50, (i + 1) * 50)
            ).map((col, idx) => (
              <div key={idx} className="flex flex-col gap-1 text-sm text-black">
                <h4 className="font-semibold mb-2 text-black">Postal Codes</h4>
                {col.map((code) => (
                  <Link
                    key={code}
                    href={`/search?postalCode=${code}`}
                    className="hover:text-[#658C58] transition text-black"
                  >
                    {code}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex flex-col gap-4 text-black">
          <h4 className="font-semibold mb-2 text-black">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a
              href="https://www.facebook.com/share/19yyDn7Fpo/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#658C58] transition text-black"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/rivorent?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#658C58] transition text-black"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#658C58] transition text-black"
            >
              <FaInstagram />
            </a>
            <a
              href="http://linkedin.com/in/rivo-rent-a1136139a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#658C58] transition text-black"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-12 text-sm text-black">
        © {new Date().getFullYear()} Rivo Rents. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
