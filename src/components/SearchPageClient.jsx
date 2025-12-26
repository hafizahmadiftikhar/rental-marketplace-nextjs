"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaTimes,
  FaBuilding,
  FaThLarge,
  FaList,
} from "react-icons/fa";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const postalCode = searchParams.get("postalCode");
  const pageParam = parseInt(searchParams.get("page")) || 1;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(postalCode || "");
  const [viewMode, setViewMode] = useState("grid");
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 1,
  });

  const ITEMS_PER_PAGE = 50;

  // Fetch properties with server-side pagination
  const fetchProperties = useCallback(async (currentPage = 1) => {
    setLoading(true);
    try {
      let url;
      if (postalCode) {
        url = `/api/properties/search?postalCode=${postalCode}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
      } else {
        url = `/api/properties?page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      // Handle both old and new API response formats
      if (data.properties) {
        // New format with pagination
        setProperties(data.properties);
        setPagination({
          page: data.pagination?.page || currentPage,
          total: data.pagination?.total || data.properties.length,
          totalPages: data.pagination?.totalPages || 1,
        });
      } else if (Array.isArray(data)) {
        // Old format - array of properties
        setProperties(data);
        setPagination({
          page: currentPage,
          total: data.length,
          totalPages: Math.ceil(data.length / ITEMS_PER_PAGE),
        });
      } else {
        setProperties([]);
        setPagination({ page: 1, total: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error("Failed to fetch properties:", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [postalCode]);

  // Fetch on mount and when postalCode or page changes
  useEffect(() => {
    fetchProperties(pageParam);
  }, [postalCode, pageParam, fetchProperties]);

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      router.push("/search");
    } else {
      router.push(`/search?postalCode=${searchQuery.trim()}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    router.push("/search");
  };

  // Handle page change with URL update
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams();
    if (postalCode) params.set("postalCode", postalCode);
    params.set("page", newPage.toString());
    router.push(`/search?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const startIndex = (pagination.page - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + properties.length, pagination.total);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2F5233] via-[#507144] to-[#658C58] text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              {postalCode ? (
                <>
                  <FaSearch className="text-[#a5d6a7]" />
                  <span className="text-sm text-white/90">Search Results</span>
                </>
              ) : (
                <>
                  <FaBuilding className="text-[#a5d6a7]" />
                  <span className="text-sm text-white/90">Property Listings</span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              {postalCode ? (
                <>
                  Search Results: "<span className="text-[#a5d6a7]">{postalCode}</span>"
                </>
              ) : (
                "All Properties"
              )}
            </h1>

            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {loading
                ? "Loading properties..."
                : postalCode
                ? `Found ${pagination.total} properties matching your search`
                : `Browse ${pagination.total} rental properties in Cleveland, OH`}
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ZIP code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-12 pr-10 py-4 rounded-xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#a5d6a7] text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="bg-white text-[#658C58] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <FaSearch />
                Search
              </button>
            </div>

            {postalCode && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-white/70 text-sm">Active filter:</span>
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-2 font-medium">
                  <FaMapMarkerAlt size={12} />
                  {postalCode}
                  <button
                    onClick={clearSearch}
                    className="ml-1 hover:text-red-300 transition-colors"
                  >
                    <FaTimes size={12} />
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 md:py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {postalCode ? (
                  <>Results for "<span className="text-[#658C58]">{postalCode}</span>"</>
                ) : (
                  "All Properties"
                )}
              </h2>
              <p className="text-gray-500 text-sm">
                {loading
                  ? "Loading..."
                  : `Showing ${pagination.total > 0 ? startIndex + 1 : 0}-${endIndex} of ${pagination.total} properties`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm mr-2">View:</span>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#658C58] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-[#658C58] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className={`${viewMode === "grid" ? "h-48" : "h-32"} bg-gray-200`}></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm">
              <div className="w-24 h-24 bg-[#658C58]/10 rounded-full flex items-center justify-center mb-6">
                <FaHome className="text-[#658C58] text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Properties Found</h2>
              <p className="text-gray-600 text-center max-w-md mb-6">
                {postalCode ? (
                  <>
                    We couldn't find any listings for{" "}
                    <span className="font-bold text-[#658C58]">"{postalCode}"</span>.
                    <br />
                    Try a different ZIP code or browse all properties.
                  </>
                ) : (
                  "No properties available at the moment."
                )}
              </p>
              {postalCode && (
                <button
                  onClick={clearSearch}
                  className="px-6 py-3 bg-[#658C58] text-white rounded-xl font-semibold hover:bg-[#507144] transition-colors"
                >
                  View All Properties
                </button>
              )}
            </div>
          ) : (
            <>
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {properties.map((property) => (
                  <Link key={property._id} href={`/details/${property._id}`}>
                    <div
                      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full ${
                        viewMode === "list" ? "flex flex-col md:flex-row" : ""
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "grid"
                            ? "h-48"
                            : "h-48 md:h-auto md:w-72 flex-shrink-0"
                        }`}
                      >
                        <Image
                          src={property.photos?.[0] || "/placeholder.jpg"}
                          alt={property.propertyName || "Property"}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-[#658C58] text-white text-xs font-medium rounded-full">
                            Available
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-white/95 text-[#658C58] text-sm font-bold rounded-full shadow">
                            {property.rentMin ? `$${property.rentMin}` : "Call"}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`p-4 flex-1 ${
                          viewMode === "list" ? "flex flex-col justify-center" : ""
                        }`}
                      >
                        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-[#658C58] transition-colors">
                          {property.propertyName}
                        </h3>

                        <p className="text-gray-500 text-sm mb-3 flex items-start gap-1 line-clamp-1">
                          <FaMapMarkerAlt className="text-[#658C58] mt-0.5 flex-shrink-0" />
                          {property.location?.fullAddress || property.address || "Cleveland, OH"}
                        </p>

                        <p className="text-[#658C58] font-bold text-lg mb-3">
                          {property.rentMin && property.rentMax
                            ? `$${property.rentMin} - $${property.rentMax}`
                            : property.rentMin
                            ? `From $${property.rentMin}`
                            : "Contact for Price"}
                          <span className="text-gray-400 font-normal text-sm"> /month</span>
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm">
                          {property.beds && (
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                              <FaBed className="text-[#658C58]" />
                              {property.beds} Beds
                            </span>
                          )}
                          {property.baths && (
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                              <FaBath className="text-[#658C58]" />
                              {property.baths} Bath
                            </span>
                          )}
                          {property.sqft && (
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                              <FaRulerCombined className="text-[#658C58]" />
                              {property.sqft} sqft
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-12">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      <FaChevronLeft size={12} />
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((pageNum, idx) =>
                        pageNum === "..." ? (
                          <span key={idx} className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                          <button
                            key={idx}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-xl font-medium transition-all ${
                              pagination.page === pageNum
                                ? "bg-[#658C58] text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#658C58] text-white font-medium rounded-xl hover:bg-[#507144] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      Next
                      <FaChevronRight size={12} />
                    </button>
                  </div>

                  <div className="text-center mt-4 text-gray-500 text-sm">
                    Page {pagination.page} of {pagination.totalPages} • {pagination.total} total properties
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      {!loading && properties.length > 0 && (
        <section className="py-12 px-4 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Ready to Find Your New Home?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us today to schedule a tour or submit your application online.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/apply">
                <button className="px-8 py-3 bg-[#658C58] text-white rounded-xl font-semibold hover:bg-[#507144] transition-colors w-full sm:w-auto">
                  Apply Now
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-3 border-2 border-[#658C58] text-[#658C58] rounded-xl font-semibold hover:bg-[#658C58] hover:text-white transition-all w-full sm:w-auto">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}