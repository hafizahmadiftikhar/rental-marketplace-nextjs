"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRandomAmenities } from "../../../utils/getRandomAmenities";
import {
  getRandomReviews,
  getAverageRating,
} from "../../../utils/getRandomReviews";
import ModelCarousel from "../../../components/ModelCarousel/ModelCarousel";

import Image from "next/image";
import {
  FaPhoneAlt,
  FaGlobe,
  FaLanguage,
  FaClock,
  FaHome,
  FaHeart,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import FAQSection from "@/components/faqs/Faqs";
import Link from "next/link";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const [randomAmenities, setRandomAmenities] = useState({
    community: [],
    apartment: [],
    other: [],
  });
  const [randomReviews, setRandomReviews] = useState([]);

  // Fetch single property (FAST)
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/getProperty/${id}`);
        if (!res.ok) {
          setProperty(null);
          return;
        }
        const data = await res.json();
        setProperty(data);
      } catch (e) {
        console.error("Error fetching property:", e);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  useEffect(() => {
    if (property) {
      setRandomAmenities(getRandomAmenities());
      setRandomReviews(getRandomReviews(5));
    }
  }, [property]);

  const averageRating = getAverageRating(randomReviews);
// Copy link function
const handleShare = async () => {
  const url = window.location.href;
  
  try {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2 sec baad reset
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};
  // Loading State
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] md:h-[70vh] w-full">
        <div className="relative w-20 h-20 md:w-28 md:h-28 mb-4 md:mb-6">
          <div className="relative w-full h-full animate-pulse">
            <FaHome className="w-full h-full text-[#658C58]" />
          </div>
        </div>
        <p className="text-lg md:text-xl text-gray-700 font-semibold mb-2 flex items-center">
          Fetching your dream property
          <span className="ml-2 animate-pulse">...</span>
        </p>
        <p className="text-gray-500 text-center text-sm md:text-base max-w-xs mt-2">
          Please hold tight, we are loading all the details for you.
        </p>
      </div>
    );

  // Not Found State
  if (!property)
    return (
      <h1 className="text-center p-10 text-xl md:text-3xl">
        No Property Found
      </h1>
    );

  const images = property.photos ?? [];
  const totalSlides = Math.ceil(images.length / 5);
  const currentImages = images.slice(index * 5, index * 5 + 5);

  const nextSlide = () => setIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="flex flex-col w-full bg-gray-50">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="w-full flex justify-center py-3 md:py-4 lg:py-6 bg-white">
        <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] max-w-7xl">
          
          {/* Mobile View - Single Image */}
          <div className="md:hidden relative h-[280px] sm:h-[320px] rounded-xl overflow-hidden shadow-lg">
            {images.length > 0 ? (
              <Image
                src={images[index % images.length]}
                alt={`Property ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <FaHome className="text-gray-400 text-6xl" />
              </div>
            )}
            
            {/* Mobile Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-[#658C58] p-2 rounded-full shadow-md"
                >
                  <FaChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-[#658C58] p-2 rounded-full shadow-md"
                >
                  <FaChevronRight size={16} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {(index % images.length) + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Desktop View - Grid Layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 grid-rows-2 gap-2 lg:gap-3 h-[350px] lg:h-[400px] xl:h-[450px] rounded-2xl overflow-hidden">
              
              {/* Main Large Image */}
              <div className="col-span-2 row-span-2 relative group cursor-pointer">
                {currentImages[0] && (
                  <>
                    <Image
                      src={currentImages[0]}
                      alt="Main Property"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </>
                )}
              </div>

              {/* 4 Smaller Images */}
              {currentImages.slice(1, 5).map((img, i) => (
                <div key={i} className="relative group cursor-pointer overflow-hidden">
                  <Image
                    src={img}
                    alt={`Property ${i + 2}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              ))}
            </div>

            {/* Navigation */}
            {images.length > 5 && (
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={prevSlide}
                  className="bg-[#658C58] text-white px-4 py-2 rounded-lg hover:bg-[#507144] transition flex items-center gap-2"
                >
                  <FaChevronLeft size={14} /> Previous
                </button>
                <span className="flex items-center text-gray-600 font-medium">
                  {index + 1} / {totalSlides}
                </span>
                <button
                  onClick={nextSlide}
                  className="bg-[#658C58] text-white px-4 py-2 rounded-lg hover:bg-[#507144] transition flex items-center gap-2"
                >
                  Next <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== CONTENT SECTION ==================== */}
      <section className="w-full flex justify-center py-6 md:py-8 lg:py-10">
        <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] max-w-7xl flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* ========== LEFT CONTENT ========== */}
          <div className="w-full lg:w-[65%] space-y-5 md:space-y-6">
            
            {/* Property Header */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                  {property.propertyName}
                </h1>
                <div className="flex items-center gap-2 text-[#658C58] flex-shrink-0">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <FaHeart size={18} />
                  </button>
              <button 
  onClick={handleShare}
  className="p-2 hover:bg-gray-100 rounded-full transition relative"
  title="Copy link"
>
  <FaShareAlt size={18} />
  {copied && (
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
      Link Copied!
    </span>
  )}
</button>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base mb-3">
                📍 {property.location?.fullAddress || "N/A"}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                  {Array(5).fill().map((_, i) => (
                    <FaStar key={i} size={12} className="text-yellow-500" />
                  ))}
                  <span className="text-xs text-gray-700 ml-1 font-medium">4.8</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">8 reviews</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Listed 5 days ago</span>
              </div>
            </div>

            {/* Property Info Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <InfoBox title="Monthly Rent" icon="💰"
                value={
                  property.rentMin && property.rentMax
                    ? property.rentMin === property.rentMax
                      ? `$${property.rentMin}`
                      : `$${property.rentMin} - $${property.rentMax}`
                    : property.rentMin ? `$${property.rentMin}`
                    : property.rentMax ? `$${property.rentMax}`
                    : "Contact"
                }
              />
              <InfoBox title="Bedrooms" value={`${property.beds || "N/A"}`} icon="🛏️" />
              <InfoBox title="Bathrooms" value={`${property.baths || "N/A"}`} icon="🚿" />
              <InfoBox title="Sq Feet" value={`${property.sqft || "N/A"}`} icon="📐" />
            </div>

            {/* Property Overview */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3">📋 Property Overview</h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {property.description || "No description available."}
              </p>
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 md:p-5">
              <h2 className="text-base md:text-lg font-bold text-blue-700 mb-1">🎉 Special Offer!</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Get <span className="font-bold text-blue-600">1 month FREE</span> when you sign a 12 month lease!
              </p>
            </div>

            {/* Neighborhood */}
            {property.neighborhoodDescription && (
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3">🏘️ Neighborhood</h2>
                <p className="text-gray-600 text-sm md:text-base">{property.neighborhoodDescription}</p>
              </div>
            )}

            {/* Amenities */}
            {randomAmenities.community.length > 0 && (
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">🏢 Community Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                  {randomAmenities.community.map((amenity) => (
                    <div key={amenity.id} className="flex flex-col items-center p-3 bg-[#E8F5E9] rounded-lg hover:shadow-md transition">
                      {amenity.icon && <amenity.icon size={22} className="text-[#2E7D32] mb-1" />}
                      <p className="text-[#2E7D32] text-xs font-medium text-center">{amenity.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {randomAmenities.apartment.length > 0 && (
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">🏠 Apartment Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                  {randomAmenities.apartment.map((amenity) => (
                    <div key={amenity.id} className="flex flex-col items-center p-3 bg-[#E8F5E9] rounded-lg hover:shadow-md transition">
                      {amenity.icon && <amenity.icon size={22} className="text-[#2E7D32] mb-1" />}
                      <p className="text-[#2E7D32] text-xs font-medium text-center">{amenity.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Models/Floor Plans */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">🏡 Available Floor Plans</h2>
              {property.models && property.models.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.models.map((model, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition">
                      <div className="relative w-full h-36 md:h-44">
                        <Image
                          src={model.images?.[0]?.url || "/dummy-property.png"}
                          alt={model.modelName || "Model"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 md:p-4">
                        <h3 className="text-base font-bold text-[#2F5233] mb-1">{model.modelName || "Unknown"}</h3>
                        <p className="text-sm text-gray-600">Availability: {model.availability || "N/A"}</p>
                        <p className="text-sm text-[#658C58] font-semibold">{model.rentLabel || "Contact for pricing"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">No floor plans available.</p>
              )}
            </div>

            {/* Model Carousel */}
            {property.models && property.models.length > 0 && (
              <ModelCarousel models={property.models} />
            )}

            {/* Reviews */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">⭐ Reviews</h2>
              <div className="flex flex-col sm:flex-row gap-4 mb-5">
                <div className="flex flex-col items-center justify-center p-4 bg-[#658C58] rounded-xl text-white min-w-[120px]">
                  <p className="text-3xl font-bold">{averageRating}</p>
                  <div className="flex gap-0.5 my-1">
                    {Array(5).fill().map((_, i) => (
                      <FaStar key={i} size={10} className={i < Math.round(averageRating) ? "text-yellow-300" : "text-white/40"} />
                    ))}
                  </div>
                  <p className="text-xs text-white/80">out of 5</p>
                </div>
                <div className="flex flex-col justify-center flex-1 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-800 font-semibold">{randomReviews.length} Reviews</p>
                  <p className="text-gray-600 text-sm">Based on renter experiences</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {randomReviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-0.5">
                        {Array(5).fill().map((_, i) => (
                          <FaStar key={i} size={10} className={i < review.stars ? "text-yellow-500" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs">{review.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{review.title}</h3>
                    <p className="text-gray-600 text-xs line-clamp-2">{review.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <FAQSection />

            {/* Contact Info */}
        {/* Contact Info */}
<div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">📞 Contact Info</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
      <FaPhoneAlt className="text-[#658C58]" size={16} />
      <span className="text-sm font-medium text-gray-800">(845) 576-9038</span>
    </div>
    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
      <FaGlobe className="text-[#658C58]" size={16} />
      <span className="text-sm font-medium text-gray-800">RevoRent.com</span>
    </div>
    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
      <FaLanguage className="text-[#658C58]" size={16} />
      <span className="text-sm font-medium text-gray-800">English</span>
    </div>
    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
      <FaClock className="text-[#658C58]" size={16} />
      <span className="text-sm font-medium text-gray-800">8am - 10pm</span>
    </div>
  </div>
</div>
          </div>

          {/* ========== RIGHT SIDEBAR ========== */}
          <div className="w-full lg:w-[35%]">
            <div className="lg:sticky lg:top-4 space-y-4">
              {/* Price & Contact Card */}
              <div className="bg-white shadow-lg rounded-xl md:rounded-2xl p-5 border border-gray-100">
                <div className="text-center mb-4">
                  <p className="text-2xl md:text-3xl font-bold text-[#658C58]">
                    {property.rentMin && property.rentMax
                      ? property.rentMin === property.rentMax
                        ? `$${property.rentMin}`
                        : `$${property.rentMin} - $${property.rentMax}`
                      : "Contact for Price"}
                  </p>
                  <p className="text-gray-500 text-sm">per month</p>
                </div>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Available Now
                  </div>
                  <div className="flex items-center gap-2">🛏️ {property.beds || "N/A"} Bedrooms</div>
                  <div className="flex items-center gap-2">🚿 {property.baths || "N/A"} Bathrooms</div>
                  <div className="flex items-center gap-2">📐 {property.sqft || "N/A"} sq ft</div>
                </div>

                <Link href="/apply">
                  <button className="w-full bg-[#658C58] text-white py-3 rounded-xl mb-2 hover:bg-[#507144] transition font-semibold shadow-md">
                    🗓️ Schedule Tour
                  </button>
                </Link>
                <Link href="/apply">
                  <button className="w-full border-2 border-[#658C58] text-[#658C58] py-3 rounded-xl hover:bg-[#658C58] hover:text-white transition font-semibold">
                    ✉️ Send Message
                  </button>
                </Link>
                <p className="text-center text-gray-400 text-xs mt-3">Usually responds within 24 hours</p>
              </div>

              {/* Quick Facts */}
              <div className="bg-[#E8F5E9] rounded-xl p-5">
                <h3 className="font-bold text-[#2E7D32] mb-3">💡 Quick Facts</h3>
                <ul className="space-y-2 text-sm text-[#2E7D32]">
                  <li>✓ Pet Friendly</li>
                  <li>✓ Parking Available</li>
                  <li>✓ In-unit Laundry</li>
                  <li>✓ Air Conditioning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoBox({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow-md transition text-center">
      <div className="text-xl md:text-2xl mb-1">{icon}</div>
      <p className="text-gray-500 text-xs uppercase tracking-wide">{title}</p>
      <p className="text-gray-800 font-bold text-sm md:text-base">{value}</p>
    </div>
  );
}