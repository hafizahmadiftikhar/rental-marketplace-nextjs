"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRandomAmenities } from "../../../utils/getRandomAmenities"; // adjust path if needed
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
import Head from "next/head";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);
  const [randomAmenities, setRandomAmenities] = useState({
    community: [],
    apartment: [],
    other: [],
  });
  const [randomReviews, setRandomReviews] = useState([]);

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
      setRandomReviews(getRandomReviews(5)); // pick 5 random reviews
    }
  }, [property]);
  const averageRating = getAverageRating(randomReviews);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[88vh] w-full">
        {/* Glowing Circle with Floating Icon */}
        <div className="relative w-32 h-32 mb-6">
          {/* Green glowing circle */}
          {/* <div className="absolute inset-0 rounded-full border-4 border-[#658C58] opacity-50 animate-ping-slow"></div> */}

          {/* Floating Icon */}
          <div className="relative w-full h-full animate-float">
            <FaHome className="w-full h-full text-[#658C58] shadow-lg" />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-2 flex items-center">
          Fetching your dream property
          <span className="ml-2 animate-dots">...</span>
        </p>

        {/* Subtext */}
        <p className="text-gray-500 text-center max-w-xs mt-2 animate-fade-in">
          Please hold tight, we are loading all the details for you.
        </p>
      </div>
    );

  if (!property)
    return <h1 className="text-center p-10 text-3xl">No Property Found</h1>;

  const images = property.photos ?? [];
  const totalSlides = Math.ceil(images.length / 8);
  const currentImages = images.slice(index * 8, index * 8 + 8);
  const isFirstRound = index === 0;

  const nextSlide = () => setIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <>
      {/* SEO Meta Tags for Facebook Sharing */}
      <Head>
        <title>{property?.propertyName || "Property"} - RevoRent</title>
        <meta
          name="description"
          content={
            property?.description?.substring(0, 160) ||
            "Discover amazing properties for rent with RevoRent"
          }
        />

        {/* Facebook Open Graph Tags */}
        <meta
          property="og:title"
          content={property?.propertyName || "Luxury Property"}
        />
        <meta
          property="og:description"
          content={
            property?.description?.substring(0, 160) ||
            "Discover amazing properties for rent with RevoRent"
          }
        />
        <meta
          property="og:image"
          content={property?.photos?.[0] || "/default-property.jpg"}
        />
        <meta
          property="og:url"
          content={`https://revorent.com/properties/${id}`}
        />
        <meta property="og:site_name" content="RevoRent" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={property?.propertyName || "Luxury Property"}
        />
        <meta
          name="twitter:description"
          content={
            property?.description?.substring(0, 160) ||
            "Discover amazing properties for rent with RevoRent"
          }
        />
        <meta
          name="twitter:image"
          content={property?.photos?.[0] || "/default-property.jpg"}
        />
      </Head>

      <div className="flex flex-col w-full">
        {/* 🔹 HERO SECTION */}
        <section className="relative w-full h-[88vh] bg-gray-100 flex items-center justify-center overflow-hidden">
          <div className="w-[95%] h-[95%] relative flex items-center justify-center rounded-3xl bg-white shadow-xl overflow-hidden">
            {/* Mobile View - Single Image */}
            <div className="md:hidden w-full h-full">
              {images.length > 0 && (
                <div className="relative w-full h-full">
                  <Image
                    src={images[index % images.length]}
                    alt={`Property ${index + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Web View - Original Layout */}
            <div className="hidden md:flex w-full h-full">
              {isFirstRound ? (
                <>
                  <div className="w-1/2 h-full p-2 relative rounded-2xl overflow-hidden shadow-lg">
                    {currentImages[0] && (
                      <Image
                        src={currentImages[0]}
                        alt="Main Property"
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>

                  <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-2 p-2">
                    {currentImages.slice(1, 5).map((img, i) => (
                      <div
                        key={i}
                        className="relative rounded-2xl overflow-hidden shadow-md"
                      >
                        <Image
                          src={img}
                          alt={`Property ${i + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-3 p-4">
                  {currentImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-2xl overflow-hidden shadow-md"
                    >
                      <Image
                        src={img}
                        alt={`Property ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#658C58] text-white p-3 rounded-full hover:bg-[#507144] transition"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#658C58] text-white p-3 rounded-full hover:bg-[#507144] transition"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </section>

        {/* 🔹 BELOW SECTION */}
        <section className="w-full flex justify-center bg-gray-50 py-10">
          <div className="w-[95%] flex flex-col lg:flex-row gap-6">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-[70%] pr-0 lg:pr-4 space-y-8">
              {/* Property Header */}
              <div className="flex flex-col space-y-3 border-b pb-6">
                <div className="flex items-start justify-between">
                  <h1 className="text-4xl font-semibold text-gray-800">
                    {property.propertyName}
                  </h1>
                  <div className="flex items-center gap-4 text-[#658C58]">
                    <FaHeart
                      className="cursor-pointer hover:scale-110 transition"
                      size={22}
                    />
                    <FaShareAlt
                      className="cursor-pointer hover:scale-110 transition"
                      size={22}
                    />
                  </div>
                </div>

                <p className="text-gray-600 text-lg">
                  {property.location?.fullAddress || "N/A"}
                </p>

                {/* Property Overview */}
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800 mt-10">
                    Property Overview
                  </h2>
                  <p className="text-gray-600 leading-relaxed mt-3">
                    {property.description || "No description available."}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="flex items-center text-yellow-500">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={i} size={16} />
                      ))}
                  </div>
                  <span className="text-sm text-gray-600">4.8 (8 reviews)</span>
                  <span className="text-sm text-gray-500 ml-4">
                    • 5 Days Ago
                  </span>
                </div>
              </div>
              {/* Property Info Boxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-300 rounded-xl divide-x divide-dashed divide-gray-400 overflow-hidden">
<InfoBox
  title="Monthly Rent"
  value={
    property.rentMin && property.rentMax
      ? property.rentMin === property.rentMax
        ? `$${property.rentMin}`  // Single price: $1200
        : `$${property.rentMin} - $${property.rentMax}`  // Range: $1200 - $1500
      : property.rentMin
        ? `$${property.rentMin}`
        : property.rentMax
          ? `$${property.rentMax}`
          : "Contact for Rent"  // No price available
  }
/>
                <InfoBox
                  title="Bedrooms"
                  value={`${property.beds || "N/A"} bd`}
                />
                <InfoBox
                  title="Bathrooms"
                  value={`${property.baths || "N/A"} ba`}
                />
                <InfoBox
                  title="Square Feet"
                  value={`${property.sqft || "N/A"} sq ft`}
                />
              </div>
              {/* Special Offer */}
              {/* 🔹 SPECIAL OFFER BOX */}
              <div className="mt-8 border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  1 month off for 1 & 2 bedroom floor plans or Co-Living!
                </h2>
                <p className="text-gray-700">
                  1, 2 & co-living floor plans get 1 month free when you sign
                  for a 12 month lease & move in by 11/30.
                </p>
              </div>
              {/* 🏘️ ABOUT THE NEIGHBORHOOD */}
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  About the Neighborhood
                </h2>
                {property.neighborhoodDescription && (
                  <p className="text-gray-600">
                    {property.neighborhoodDescription}
                  </p>
                )}
              </div>
              {/* Amenities Sections */}
              <div className="mt-12 space-y-8">
                {/* Community Amenities */}
                {randomAmenities.community.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      Community Amenities
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {randomAmenities.community.map((amenity) => (
                        <div
                          key={amenity.id}
                          className="flex flex-col items-center justify-center h-36 p-8 bg-[#D1E7DD] rounded-xl shadow-md hover:scale-105 transition"
                        >
                          {amenity.icon && (
                            <amenity.icon
                              size={45}
                              className="text-[#0F5132] mb-3"
                            />
                          )}
                          <p className="text-[#0F5132] text-center text-sm font-medium">
                            {amenity.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Apartment Amenities */}
                {randomAmenities.apartment.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      Apartment Amenities
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {randomAmenities.apartment.map((amenity) => (
                        <div
                          key={amenity.id}
                          className="flex flex-col items-center justify-center h-36 p-8 bg-[#D1E7DD] rounded-xl shadow-md hover:scale-105 transition"
                        >
                          {amenity.icon && (
                            <amenity.icon
                              size={45}
                              className="text-[#0F5132] mb-3"
                            />
                          )}
                          <p className="text-[#0F5132] text-center text-sm font-medium">
                            {amenity.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Amenities */}
                {randomAmenities.other.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      Other Amenities
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {randomAmenities.other.map((amenity) => (
                        <div
                          key={amenity.id}
                          className="flex flex-col items-center justify-center h-36 p-8 bg-[#D1E7DD] rounded-xl shadow-md hover:scale-105 transition"
                        >
                          {amenity.icon && (
                            <amenity.icon
                              size={45}
                              className="text-[#0F5132] mb-3"
                            />
                          )}
                          <p className="text-[#0F5132] text-center text-sm font-medium">
                            {amenity.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* 🔹 MODELS SECTION */}
              <div className="mt-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                  Available Models
                </h2>
                {property.models && property.models.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {property.models.map((model, i) => (
                      <div
                        key={i}
                        className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl overflow-hidden border border-[#658C58]"
                      >
                        {/* Image */}
                        <div className="relative w-full lg:w-1/2 h-64 lg:h-80">
                          <Image
                            src={
                              model.images && model.images[0]?.url
                                ? model.images[0].url
                                : "/dummy-property.png"
                            }
                            alt={model.modelName || "Model Image"}
                            fill
                            className="object-contain rounded-l-1xl"
                          />
                        </div>
                        {/* Details */}
                        <div className="p-6 w-full lg:w-1/2 flex flex-col justify-center gap-3">
                          <h3 className="text-2xl font-bold text-[#2F5233]">
                            {model.modelName || "Unknown Model"}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Availability:{" "}
                            <span className="font-semibold">
                              {model.availability || "N/A"}
                            </span>
                          </p>
                          <p className="text-gray-600 text-sm">
                            {model.rentLabel || "No Rent Info"}
                          </p>
                          {model.details?.length > 0 && (
                            <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                              {model.details.map((d, idx) => (
                                <li key={idx}>{d}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No Models Available.</p>
                )}
              </div>

              {/* Nearby Attractions */}
              {property.nearby?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    Nearby Attractions
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {property.nearby.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* ... somewhere below your models section ... */}
              {property.models && property.models.length > 0 && (
                <ModelCarousel models={property.models} />
              )}
              {/* 🔹 REVIEWS SECTION */}
              {/* 🔹 REVIEWS SECTION */}
              <div className="mt-12 w-full">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                  Reviews
                </h2>

                {/* Rating summary row */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  {/* Left Box */}
                  <div className="flex flex-col items-center justify-center p-8 rounded-xl shadow-lg bg-white w-full md:w-1/3 border border-gray-200">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-[#658C58] mb-2">
                        {averageRating}
                      </p>
                      <div className="flex justify-center mb-3">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <FaStar
                              key={i}
                              size={20}
                              className={
                                i < Math.round(averageRating)
                                  ? "text-[#658C58]"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                      </div>
                      <p className="text-lg text-gray-600 mb-4">Great</p>
                      <div className="w-full bg-gray-800 rounded-md py-2">
                        <p className="text-center text-white font-medium text-sm">
                          Out of 5
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Box */}
                  <div className="flex flex-col justify-center p-8 rounded-xl shadow-lg w-full md:w-2/3 bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <FaStar
                            key={i}
                            size={20}
                            className={
                              i < Math.round(averageRating)
                                ? "text-[#658C58]"
                                : "text-gray-300"
                            }
                          />
                        ))}
                    </div>
                    <p className="text-gray-700 text-lg mb-2 font-medium">
                      {randomReviews.length} renter reviews
                    </p>
                    <p className="text-gray-600">
                      Share details about your experience about this property
                    </p>
                  </div>
                </div>

                {/* Reviews Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {randomReviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex flex-col p-6 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                    >
                      {/* Rating and Date Row */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-1">
                          {Array(5)
                            .fill()
                            .map((_, i) => (
                              <FaStar
                                key={i}
                                size={16}
                                className={
                                  i < review.stars
                                    ? "text-[#658C58]"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm">
                          {review.date}
                        </span>
                      </div>

                      {/* Review Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {review.title}
                      </h3>

                      {/* Review Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {review.description}
                      </p>

                      {/* Helpful Count */}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-gray-500 text-sm">
                          {review.useful} people found this useful
                        </span>
                        <button className="text-[#658C58] hover:text-[#507144] text-sm font-medium transition-colors">
                          Helpful
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More Reviews Button */}
                {/* {randomReviews.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <button className="bg-[#658C58] text-white px-8 py-3 rounded-lg hover:bg-[#507144] transition-colors duration-300 font-medium">
                      Show All Reviews
                    </button>
                  </div>
                )} */}
              </div>
              <FAQSection />
              {/* Details, About, Unique Features, Contact Info */}
              {/* 🔹 CONTACT INFO BOX */}
              <div className="mt-10 rounded-2xl border border-gray-300 p-8 shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-black">
                  Contact Info
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Column 1: Phone & Website */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-gray-100 rounded-full text-[#658C58]">
                        <FaPhoneAlt size={18} />
                      </span>
                      <span className="text-black font-medium">
                        +845-576-9038
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-gray-100 rounded-full text-[#658C58]">
                        <FaGlobe size={18} />
                      </span>
                      <span className="text-black font-medium">
                        RevoRent.com
                      </span>
                    </div>
                  </div>
                  {/* Column 2: Language & Timing */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-gray-100 rounded-full text-[#658C58]">
                        <FaLanguage size={18} />
                      </span>
                      <span className="text-black font-medium">
                        Language: English
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-gray-100 rounded-full text-[#658C58]">
                        <FaClock size={18} />
                      </span>
                      <span className="text-black font-medium">8am - 10pm</span>
                    </div>
                  </div>
                  {/* Column 3: Logo */}
                  <div className="flex justify-center md:justify-end">
                    <div className="flex items-center gap-2">
                      <FaHome className="text-[#658C58] text-6xl" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Keep your existing UI here unchanged */}
            </div>

            {/* RIGHT SIDEBAR */}

            <div className="w-full lg:w-[30%]">
              <div className="sticky top-10 bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Contact Us
                </h3>
                <p className="text-gray-600 mb-6">
                  Interested in this property? Reach out to schedule a visit or
                  request more details.
                </p>
                <Link href={"/apply"}>
                  <button className="w-full bg-[#658C58] text-white py-2 rounded-lg mb-3 hover:bg-[#507144] transition">
                    Request a Tour
                  </button>
                </Link>
                <Link href={"/apply"}>
                  <button className="w-full border border-[#658C58] text-[#658C58] py-2 rounded-lg hover:bg-[#658C58] hover:text-white transition">
                    Contact Agent
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function InfoBox({ title, value }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-gray-500 text-sm uppercase tracking-wide">{title}</p>
      <p className="text-gray-800 font-semibold text-lg">{value}</p>
    </div>
  );
}
