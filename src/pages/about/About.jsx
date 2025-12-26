"use client";

import Image from "next/image";
import manager1 from "../../../public/homeimages/manager11.jpeg"; // replace with your images
import manager2 from "../../../public/homeimages/manager22.jpeg";
import manager3 from "../../../public/homeimages/manager33.jpeg";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-8 py-16">
      {/* Hero / Intro Section */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#658C58] mb-4">
          About Us
        </h1>
        <p className="text-black text-lg md:text-xl">
          Building modern, fast, and responsive web applications with passion,
          creativity, and expertise. We deliver solutions that empower
          businesses and delight users.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-[#658C58] mb-4">
            Our Mission
          </h2>
          <p className="text-black">
            To create high-quality, modern web applications that provide
            seamless experiences and solve real-world problems for our clients.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-[#658C58] mb-4">Our Vision</h2>
          <p className="text-black">
            To become a leading web development company recognized for
            innovation, performance, and user-centric design worldwide.
          </p>
        </div>
      </section>

      {/* Our History / Timeline */}
      <section className="max-w-6xl mx-auto mb-16 px-4">
        <h2 className="text-3xl font-bold text-[#658C58] text-center mb-10">
          Our Journey
        </h2>

        <div className="relative border-l-4 border-[#658C58] pl-12">
          {/* Timeline Item */}
          <div className="mb-12 relative">
            <div className="absolute -left-7 top-0 w-6 h-6 bg-[#658C58] rounded-full border-4 border-white"></div>
            <h3 className="text-xl font-semibold text-black mb-1">
              1886 - Company Founded
            </h3>
            <p className="text-gray-700">
              RivoRent Inc. traces its roots back to 1886, when we began as a
              small family-run operation dedicated to providing dependable
              housing and fair rental practices in our community.
            </p>
          </div>

          <div className="mb-12 relative">
            <div className="absolute -left-7 top-0 w-6 h-6 bg-[#658C58] rounded-full border-4 border-white"></div>
            <h3 className="text-xl font-semibold text-black mb-1">
              1920s - Growth in Residential Rentals
            </h3>
            <p className="text-gray-700">
              As the region expanded, so did we—adding multiple residential
              properties and becoming a trusted name for quality living spaces.
            </p>
          </div>

          <div className="mb-12 relative">
            <div className="absolute -left-7 top-0 w-6 h-6 bg-[#658C58] rounded-full border-4 border-white"></div>
            <h3 className="text-xl font-semibold text-black mb-1">
              1970s - Modernization & Innovation
            </h3>
            <p className="text-gray-700">
              We embraced new standards in property management, introducing
              updated rental processes and expanding into multi-unit residential
              buildings.
            </p>
          </div>
          <div className="mb-12 relative">
            <div className="absolute -left-7 top-0 w-6 h-6 bg-[#658C58] rounded-full border-4 border-white"></div>
            <h3 className="text-xl font-semibold text-black mb-1">
              Today - A Legacy of Service
            </h3>
            <p className="text-gray-700">
              With more than a century of experience, our commitment remains the
              same: offering reliable rentals, responsive service, and
              comfortable homes for every tenant.
            </p>
          </div>
        </div>
      </section>

      {/* Team / Core Members */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-[#658C58] text-center mb-10">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Member 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
              <Image
                src={manager1}
                alt="Jonathan Mercer"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3 className="text-xl font-bold text-black mb-1">
              Jonathan Mercer
            </h3>
            <p className="text-gray-700">Chief Executive Officer (CEO)</p>
          </div>

          {/* Member 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
              <Image
                src={manager3}
                alt="Elena Bradford"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3 className="text-xl font-bold text-black mb-1">
              Elena Bradford
            </h3>
            <p className="text-gray-700">Director of Property Management</p>
          </div>

          {/* Member 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
              <Image
                src={manager2}
                alt="Marcus Whitfield"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3 className="text-xl font-bold text-black mb-1">
              Marcus Whitfield
            </h3>
            <p className="text-gray-700">Chief Financial Officer (CFO)</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto text-center bg-[#658C58] text-white p-12 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="mb-6">
          We make renting simple and stress-free. Our listings are always
          up-to-date, our communication is quick, and we’re here to help you
          find a place that actually feels right. No hassle, no guesswork—just
          an easy, straightforward rental experience.
        </p>
        <button className="bg-white text-[#658C58] font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition">
          Get in Touch
        </button>
      </section>
    </div>
  );
}
