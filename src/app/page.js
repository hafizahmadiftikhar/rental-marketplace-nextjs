"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import heroImg from "@/assets/heroimg.jpg";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import ReviewsAnimated from "@/pages/reviewk/Reviewk";
import {
  FaSearch,
  FaHome,
  FaKey,
  FaShieldAlt,
  FaArrowRight,
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaUsers,
  FaBuilding,
  FaHandshake,
  FaTimes,
  FaHistory,
} from "react-icons/fa";

// All available ZIP codes
const POSTAL_CODES = [
  "16146", "43402", "43412", "43416", "43420", "43431", "43440", "43450", "43452", "43460", "43465",
  "43506", "43512", "43517", "43528", "43537", "43542", "43545", "43551", "43554", "43558", "43560",
  "43566", "43571", "43614", "43615", "43623", "44001", "44011", "44012", "44017", "44021", "44022",
  "44023", "44024", "44026", "44035", "44039", "44041", "44044", "44050", "44052", "44053", "44054",
  "44055", "44056", "44057", "44060", "44062", "44067", "44070", "44072", "44074", "44077", "44084",
  "44087", "44089", "44090", "44092", "44094", "44095", "44101", "44102", "44103", "44104", "44105",
  "44106", "44107", "44108", "44109", "44110", "44111", "44112", "44113", "44114", "44115", "44116",
  "44117", "44118", "44119", "44120", "44121", "44122", "44123", "44124", "44125", "44126", "44127",
  "44128", "44129", "44130", "44131", "44132", "44133", "44134", "44135", "44136", "44137", "44138",
  "44139", "44140", "44141", "44142", "44143", "44144", "44145", "44146", "44147", "44149", "44201",
  "44202", "44203", "44212", "44215", "44216", "44221", "44223", "44224", "44230", "44231", "44233",
  "44234", "44236", "44240", "44241", "44243", "44254", "44255", "44256", "44260", "44262", "44264",
  "44266", "44270", "44273", "44278", "44280", "44281", "44286", "44301", "44302", "44303", "44304",
  "44305", "44306", "44307", "44308", "44310", "44311", "44312", "44313", "44314", "44319", "44320",
  "44321", "44333", "44405", "44406", "44408", "44410", "44413", "44418", "44420", "44425", "44429",
  "44437", "44438", "44440", "44444", "44446", "44452", "44460", "44471", "44473", "44481", "44483",
  "44484", "44485", "44502", "44503", "44504", "44505", "44507", "44509", "44510", "44511", "44512",
  "44514", "44515", "44685",
];

// Popular areas with ZIP codes
const POPULAR_AREAS = [
  { code: "44101", area: "Downtown Cleveland" },
  { code: "44102", area: "Ohio City" },
  { code: "44106", area: "University Circle" },
  { code: "44113", area: "Tremont" },
  { code: "44114", area: "Playhouse Square" },
  { code: "44120", area: "Shaker Heights" },
];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const searchRef = useRef(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("recentZipSearches");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      console.log("Error loading recent searches");
    }
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = POSTAL_CODES.filter((code) =>
        code.startsWith(query)
      ).slice(0, 6);
      setSuggestions(filtered);
      setHighlightIndex(-1);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Save to recent searches
  const saveRecentSearch = (value) => {
    try {
      const updated = [value, ...recentSearches.filter((s) => s !== value)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentZipSearches", JSON.stringify(updated));
    } catch (e) {
      console.log("Error saving recent search");
    }
  };

  // Handle search
  const handleSearch = (searchValue) => {
    const value = searchValue || query;
    if (!value.trim()) return;

    saveRecentSearch(value);
    setShowSuggestions(false);
    router.push(`/search?postalCode=${value}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    const totalItems = query ? suggestions.length : recentSearches.length + POPULAR_AREAS.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && showSuggestions) {
        if (query && suggestions[highlightIndex]) {
          handleSearch(suggestions[highlightIndex]);
        } else if (!query) {
          if (highlightIndex < recentSearches.length) {
            handleSearch(recentSearches[highlightIndex]);
          } else {
            const areaIndex = highlightIndex - recentSearches.length;
            if (POPULAR_AREAS[areaIndex]) {
              handleSearch(POPULAR_AREAS[areaIndex].code);
            }
          }
        }
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Clear recent searches
  const clearRecentSearches = (e) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem("recentZipSearches");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/homeprops");
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.log("Error fetching home properties:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#658C58]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#658C58]/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 text-white px-4 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaHome className="text-[#a5d6a7]" />
            <span className="text-sm text-white/90">Cleveland's #1 Rental Platform</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="text-[#a5d6a7]"> Rental Home</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Discover the best rental properties in Cleveland, Ohio.
            Your dream apartment is just a search away.
          </p>

          {/* Search Box with Autocomplete */}
          <div className="max-w-2xl mx-auto" ref={searchRef}>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder="Enter ZIP code (e.g., 44101)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-12 pr-10 py-4 rounded-xl text-gray-800 bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-[#658C58] text-base"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setSuggestions([]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  >
                    <FaTimes />
                  </button>
                )}

                {/* ========== SUGGESTIONS DROPDOWN ========== */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-left max-h-[400px] overflow-y-auto">
                    
                    {/* When user is typing - show matching ZIP codes */}
                    {query && suggestions.length > 0 && (
                      <div className="p-2">
                        <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Matching ZIP Codes
                        </p>
                        {suggestions.map((code, idx) => (
                          <button
                            key={code}
                            onClick={() => handleSearch(code)}
                            className={`w-full px-3 py-3 text-left rounded-lg flex items-center gap-3 transition-colors ${
                              highlightIndex === idx
                                ? "bg-[#658C58] text-white"
                                : "text-gray-700 hover:bg-[#658C58]/10"
                            }`}
                          >
                            <FaMapMarkerAlt className={highlightIndex === idx ? "text-white" : "text-[#658C58]"} />
                            <div>
                              <span className="font-semibold">{code}</span>
                              <span className={`text-sm ml-2 ${highlightIndex === idx ? "text-white/70" : "text-gray-400"}`}>
                                Cleveland, OH
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* No results found */}
                    {query && suggestions.length === 0 && (
                      <div className="p-6 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FaSearch className="text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No ZIP codes found</p>
                        <p className="text-gray-400 text-sm">Try a different ZIP code</p>
                      </div>
                    )}

                    {/* When input is empty - show recent searches and popular areas */}
                    {!query && (
                      <>
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                          <div className="p-2 border-b border-gray-100">
                            <div className="flex items-center justify-between px-3 py-2">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                Recent Searches
                              </p>
                              <button
                                onClick={clearRecentSearches}
                                className="text-xs text-red-500 hover:text-red-700 font-medium"
                              >
                                Clear All
                              </button>
                            </div>
                            {recentSearches.map((search, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSearch(search)}
                                className={`w-full px-3 py-3 text-left rounded-lg flex items-center gap-3 transition-colors ${
                                  highlightIndex === idx
                                    ? "bg-[#658C58] text-white"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                <FaHistory className={highlightIndex === idx ? "text-white" : "text-gray-400"} />
                                <span className="font-medium">{search}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Popular Areas */}
                        <div className="p-2">
                          <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Popular Areas
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {POPULAR_AREAS.map((item, idx) => {
                              const itemIndex = recentSearches.length + idx;
                              return (
                                <button
                                  key={item.code}
                                  onClick={() => handleSearch(item.code)}
                                  className={`px-3 py-3 text-left rounded-lg transition-colors ${
                                    highlightIndex === itemIndex
                                      ? "bg-[#658C58] text-white"
                                      : "text-gray-700 hover:bg-[#658C58]/10"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className={highlightIndex === itemIndex ? "text-white" : "text-[#658C58]"} size={12} />
                                    <span className={`font-bold ${highlightIndex === itemIndex ? "text-white" : "text-[#658C58]"}`}>
                                      {item.code}
                                    </span>
                                  </div>
                                  <p className={`text-xs mt-0.5 ${highlightIndex === itemIndex ? "text-white/70" : "text-gray-500"}`}>
                                    {item.area}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Browse All */}
                        <div className="p-2 border-t border-gray-100">
                          <button
                            onClick={() => router.push("/search")}
                            className="w-full px-3 py-3 text-left rounded-lg text-[#658C58] hover:bg-[#658C58]/10 transition-colors flex items-center justify-between"
                          >
                            <span className="font-semibold">Browse All Properties</span>
                            <FaArrowRight />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSearch()}
                className="bg-gradient-to-r from-[#658C58] to-[#507144] hover:from-[#507144] hover:to-[#658C58] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                Search
                <FaArrowRight />
              </button>
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-white/60 text-sm">Popular:</span>
              {["44101", "44102", "44106", "44113"].map((zip) => (
                <button
                  key={zip}
                  onClick={() => handleSearch(zip)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-colors"
                >
                  {zip}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12">
            {[
              { value: "500+", label: "Properties" },
              { value: "200+", label: "Happy Renters" },
              { value: "50+", label: "Neighborhoods" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-[#a5d6a7]">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: FaSearch,
                title: "Easy Search",
                desc: "Find properties by location, price, and amenities with our smart search.",
              },
              {
                icon: FaShieldAlt,
                title: "Verified Listings",
                desc: "All properties are verified to ensure quality and authenticity.",
              },
              {
                icon: FaKey,
                title: "Quick Apply",
                desc: "Apply online in minutes with our streamlined application process.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-[#658C58]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#658C58] transition-colors">
                  <feature.icon className="text-2xl text-[#658C58] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PROPERTIES ==================== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#658C58]/10 text-[#658C58] rounded-full text-sm font-medium mb-4">
              Featured Properties
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore Rental Properties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover top-rated rental properties in Cleveland, Ohio.
              Each listing is verified and ready for you to explore.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((prop) => (
                <div
                  key={prop._id}
                  onClick={() => router.push(`/details/${prop._id}`)}
                  className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={prop.photos?.[0] || "/placeholder.jpg"}
                      alt={prop.propertyName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-[#658C58] text-white text-xs font-medium rounded-full">
                        Available
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/90 text-gray-800 text-xs font-bold rounded-full">
                        {prop.rentMin ? `$${prop.rentMin}` : "Contact"}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#658C58] transition-colors">
                      {prop.propertyName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 flex items-center gap-1 line-clamp-1">
                      <FaMapMarkerAlt className="text-[#658C58] flex-shrink-0" />
                      {prop.address || prop.subLocations || "Cleveland, OH"}
                    </p>
                    <div className="flex items-center gap-4 text-gray-600 text-sm">
                      {prop.beds && (
                        <span className="flex items-center gap-1">
                          <FaBed className="text-[#658C58]" /> {prop.beds} Beds
                        </span>
                      )}
                      {prop.baths && (
                        <span className="flex items-center gap-1">
                          <FaBath className="text-[#658C58]" /> {prop.baths} Bath
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => router.push("/search")}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#658C58] text-[#658C58] rounded-xl font-semibold hover:bg-[#658C58] hover:text-white transition-all duration-300"
            >
              View All Properties
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/homeimages/rentalsImg.jpg"
                  alt="Why Choose Us"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#658C58] rounded-full flex items-center justify-center">
                    <FaStar className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">4.9/5</p>
                    <p className="text-gray-500 text-sm">Customer Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <span className="inline-block px-4 py-1 bg-[#658C58]/10 text-[#658C58] rounded-full text-sm font-medium mb-4">
                Why RivoRent?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Renting Made Simple & Stress-Free
              </h2>
              <p className="text-gray-600 mb-8">
                Browse the highest quality listings, apply online, sign your lease,
                and even pay your rent from any device. We make the entire rental
                process seamless.
              </p>

              <div className="space-y-4">
                {[
                  { icon: FaCheckCircle, text: "Verified & trusted property listings" },
                  { icon: FaCheckCircle, text: "Easy online application process" },
                  { icon: FaCheckCircle, text: "24/7 customer support available" },
                  { icon: FaCheckCircle, text: "Secure payment processing" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="text-[#658C58] text-lg" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push("/about")}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#658C58] text-white rounded-xl font-semibold hover:bg-[#507144] transition-colors"
              >
                Learn More About Us
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#2F5233] to-[#507144] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Home in 3 Easy Steps
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our streamlined process makes finding and renting your perfect home easier than ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: FaSearch,
                title: "Search Properties",
                desc: "Browse our extensive collection of verified rental listings in your preferred area.",
              },
              {
                step: "02",
                icon: FaBuilding,
                title: "Schedule a Tour",
                desc: "Found something you like? Schedule a viewing at your convenience.",
              },
              {
                step: "03",
                icon: FaKey,
                title: "Move In",
                desc: "Complete your application, sign the lease, and get your keys!",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center p-8">
                {/* Step Number */}
                <span className="absolute top-0 left-1/2 -translate-x-1/2 text-7xl font-bold text-white/5">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="text-3xl text-[#a5d6a7]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FaBuilding, value: "500+", label: "Properties Listed" },
              { icon: FaUsers, value: "1000+", label: "Happy Tenants" },
              { icon: FaHandshake, value: "300+", label: "Successful Deals" },
              { icon: FaStar, value: "4.9", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-[#658C58]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-2xl text-[#658C58]" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOR PROPERTY MANAGERS ==================== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#658C58]/10 text-[#658C58] rounded-full text-sm font-medium mb-4">
              For Property Managers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              The Perfect Place to Manage Your Property
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Work with the best suite of property management tools on the market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                image: "/homeimages/rentalsImg1.jpg",
                title: "Advertise Your Rental",
                desc: "Connect with millions of renters looking for new homes using our comprehensive marketing platform.",
              },
              {
                image: "/homeimages/rentalsImg2.jpg",
                title: "Lease 100% Online",
                desc: "Accept applications, process payments, and sign digital leases all on a single platform.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                  <button className="text-[#658C58] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Learn More <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#658C58] to-[#507144]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of happy renters who found their perfect home through RivoRent.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push("/search")}
              className="px-8 py-4 bg-white text-[#658C58] rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Browse Properties
            </button>
            <button
              onClick={() => router.push("/apply")}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#658C58] transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* ==================== OTHER SECTIONS ==================== */}
      <About />
      <ReviewsAnimated />
      <Contact />
    </div>
  );
}