"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const postalCode = searchParams.get("postalCode");

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Fetch properties whenever postalCode changes
  useEffect(() => {
    if (!postalCode) {
      setProperties([]);
      setLoading(false);
      return;
    }

    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/properties/search?postalCode=${postalCode}`);
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
        setPage(1); // Reset page when new postalCode
      }
    }

    fetchData();
  }, [postalCode]);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = properties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <h1 className="text-4xl font-extrabold text-[#658C58] text-center mb-12 tracking-wide">
        Properties in: {postalCode || "Unknown"}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : paginatedData.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 animate-fadeIn">
          <div className="w-24 h-24 bg-[#658C58]/10 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <span className="text-[#658C58] text-5xl">🏡</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide mb-3">
            No Properties Found
          </h2>
          <p className="text-gray-600 text-lg max-w-xl text-center leading-relaxed">
            We couldn't find any listings for the postal code{" "}
            <span className="font-bold text-[#658C58]">{postalCode}</span>.
            <br />
            Try searching another location or explore nearby areas!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {paginatedData.map((property) => (
              <div key={property._id} className="block">
                <Link href={`/details/${property._id}`}>
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition p-3 cursor-pointer border border-gray-100 hover:-translate-y-1 duration-300">
                    <div className="relative w-full h-60 rounded-xl overflow-hidden">
                      <Image
                        src={property.photos?.[0] || "/placeholder.jpg"}
                        alt={property.propertyName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        {property.propertyName}
                      </h2>

                      <p className="text-gray-600 text-sm mb-3">
                        {property.location?.fullAddress}
                      </p>

                      <p className="text-[#658C58] font-extrabold text-xl mb-2">
                        {property.rentMin && property.rentMax
                          ? `$${property.rentMin} - $${property.rentMax}`
                          : "Call for Rent"}
                      </p>

                      <div className="text-gray-600 text-sm bg-gray-100 px-3 py-2 rounded-lg inline-block">
                        {property.beds} Beds • {property.baths} Baths • {property.sqft} sqft
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 gap-4 items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-6 py-2 bg-[#658C58] text-white font-semibold rounded-xl hover:bg-[#567549] disabled:opacity-40 transition"
            >
              Previous
            </button>

            <span className="px-4 py-2 font-bold text-lg text-gray-700">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-6 py-2 bg-[#658C58] text-white font-semibold rounded-xl hover:bg-[#567549] disabled:opacity-40 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
