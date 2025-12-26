"use client";

import Image from "next/image";
import heroImg from "../../../public/homeimages/heroimg.jpg";
import property1 from "../../../public/homeimages/property1.jpg";
import property2 from "../../../public/homeimages/property2.jpg";
import property3 from "../../../public/homeimages/property3.jpg";
import rentalsImg from "../../../public/homeimages/rentalsImg.jpg"; // add your new image
import rentalsImg1 from "../../../public/homeimages/rentalsImg1.jpg"; // add your new image
import rentalsImg3 from "../../../public/homeimages/rentalsImg2.jpg"; // add your new image
import manager1 from "../../../public/homeimages/manager1.jpg";
import manager2 from "../../../public/homeimages/manager2.jpg";
import manager3 from "../../../public/homeimages/manager3.jpg";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const properties = [
    {
      name: "Presidential Towers",
      address: "802 Avenue Street 123",
      rate: "$2000 - $10000",
      type: "2 Studios - 1 Bed",
      image: property2,
    },
    {
      name: "Skyline Residences",
      address: "450 Lakeview Drive",
      rate: "$2500 - $9000",
      type: "1 Studio - 2 Bed",
      image:
        "https://images1.apartments.com/i2/FmdTpPNM29QtDq6WDSHH8TT01fBFpu0_8iqKHG8kjZo/102/the-808-cleveland-chicago-il-building-photo.jpg?p=1",
    },
    {
      name: "Riverfront Apartments",
      address: "321 River Road",
      rate: "$1800 - $8000",
      type: "1 Studio - 1 Bed",
      image: property3,
    },
    {
      name: "Central Park Lofts",
      address: "123 Park Ave",
      rate: "$2200 - $9500",
      type: "2 Studios - 2 Bed",
      image: property1,
    },
  ];
  const handleClick = () => {
    router.push("/details");
  };
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Apartment</h1>
          <p className="text-lg mb-6">
            Explore the best rental properties in Cleveland, OH
          </p>
          {/* Search Bar */}
          <div className="flex justify-center mt-6">
            <div className="flex bg-white rounded-full shadow-xl overflow-hidden w-full max-w-md">
              <input
                type="text"
                placeholder="Search any property by postal code"
                className="flex-1 px-5 py-3 text-gray-700 focus:outline-none rounded-l-full"
              />
              <button className="bg-[#658C58] hover:bg-[#537247] text-white px-6 py-3 font-semibold rounded-r-full transition">
                Search
              </button>
            </div>
          </div>

          <button
            onClick={handleClick}
            className="bg-[#658C58] hover:bg-[#507144] px-6 py-3 rounded-xl font-semibold transition mt-6"
          >
            Explore Properties
          </button>
        </div>
      </section>
      {/* Explore Properties Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#658C58] text-center mb-10">
          Explore Rental Properties in Cleveland, OH
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((prop, index) => (
            <div
              key={index}
              className="flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition"
            >
              {/* Image */}
              <div className="w-full h-64 relative">
                <Image
                  src={prop.image}
                  alt={prop.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-2xl"
                />
              </div>

              {/* Text */}
              <div className="p-6 flex flex-col justify-center items-center text-center">
                <h3 className="text-xl font-bold mb-2">{prop.name}</h3>
                <p className="text-gray-600 mb-1">{prop.address}</p>
                <p className="text-gray-800 font-semibold mb-1">{prop.rate}</p>
                <p className="text-gray-500">{prop.type}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* The Most Rental Listings Section */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        {/* Main Heading */}
        <h2 className="text-3xl font-bold text-[#658C58] text-center mb-10">
          Easiest Rental Listings
        </h2>

        {/* Card Section */}
        <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-2xl overflow-hidden min-h-[300px]">
          {/* Left Column - Text */}
          <div className="md:w-1/2 w-full p-16 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              Renting Made Simple
            </h3>
            <p className="text-black mb-6">
              Browse the highest quality listings, apply online, sign your
              lease, and even pay your rent from any device.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="md:w-1/2 w-full h-80 md:h-auto relative">
            <Image
              src={rentalsImg}
              alt="Rental Listings"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
      {/* 2nd box */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        {/* Main Heading */}
        <h2 className="text-3xl font-bold text-[#658C58] text-center mb-4">
          The Perfect Place to Manage Your Property
        </h2>
        <p className="text-center text-gray-700 mb-12">
          Work with the best suite of property management tools on the market.
        </p>

        {/* First Box - Text Left, Image Right */}
        <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-2xl overflow-hidden mb-8 min-h-[300px]">
          {/* Left Column - Text */}
          <div className="md:w-1/2 w-full p-16 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              Advertise Your Rental
            </h3>
            <p className="text-black">
              Connect with more than 75 million renters looking for new homes
              using our comprehensive marketing platform.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="md:w-1/2 w-full h-80 md:h-auto relative">
            <Image
              src={rentalsImg1} // You can replace with a new image if needed
              alt="Advertise Rental"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Second Box - Image Left, Text Right */}
        <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-2xl overflow-hidden min-h-[300px]">
          {/* Left Column - Image */}
          <div className="md:w-1/2 w-full h-80 md:h-auto relative">
            <Image
              src={rentalsImg3} // You can replace with a new image if needed
              alt="Lease Online"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right Column - Text */}
          <div className="md:w-1/2 w-full p-16 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              Lease 100% Online
            </h3>
            <p className="text-black">
              Accept applications, process rent payments online, and sign
              digital leases all powered on a single platform.
            </p>
          </div>
        </div>
      </section>
      {/* third box */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        {/* Main Heading */}
        <h2 className="text-3xl font-bold text-[#658C58] text-center mb-4">
          Renting Made Easy for Residents and Property Managers
        </h2>
        <p className="text-center text-gray-700 mb-12">
          Our articles, guides, and videos help you through the process, start
          to finish.
        </p>

        {/* First Box - Text Left, Image Right */}
        <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-2xl overflow-hidden mb-8 min-h-[300px]">
          <div className="md:w-1/2 w-full p-16 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              Tips for Renters
            </h3>
            <p className="text-black">
              Find answers to all of your renting questions with the best
              renter’s guide in the galaxy.
            </p>
          </div>

          <div className="md:w-1/2 w-full h-80 md:h-auto relative">
            <Image
              src={manager1} // You can replace with a new image if needed
              alt="Advertise Rental"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Second Box - Image Left, Text Right */}
        <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-2xl overflow-hidden min-h-[300px]">
          <div className="md:w-1/2 w-full h-80 md:h-auto relative">
            <Image
              src={manager2} // You can replace with a new image if needed
              alt="Lease Online"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="md:w-1/2 w-full p-16 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              Property Manager Resources
            </h3>
            <p className="text-black">
              Stay up-to-date using our tips and guides on rent payments,
              leasing, management solutions, and more.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-2xl overflow-hidden mb-8 min-h-[300px]">
          <div className="md:w-1/2 w-full p-16 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              Take Us With You
            </h3>
            <p className="text-black">
              Keep johntherenter.com in the palm of your hand throughout your
              rental journey.
            </p>
          </div>

          <div className="md:w-1/2 w-full h-80 md:h-auto relative">
            <Image
              src={manager3} // You can replace with a new image if needed
              alt="Advertise Rental"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
