"use client";

import Image from "next/image";
import manager1 from "../../../public/homeimages/manager11.jpeg";
import manager2 from "../../../public/homeimages/manager22.jpeg";
import manager3 from "../../../public/homeimages/manager33.jpeg";
import Link from "next/link";
import {
  FaBullseye,
  FaEye,
  FaCheckCircle,
  FaArrowRight,
  FaHome,
  FaHandshake,
  FaHeart,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2F5233] via-[#507144] to-[#658C58] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaHome className="text-[#a5d6a7]" />
            <span className="text-sm text-white/90">About RivoRent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            We're a local rental team focused on making your move easy. From
            quick responses to smooth tours and clear communication, we work
            hard to keep the entire process stress-free. Whether you're looking
            for your first place or your next place, we're here to help you feel
            confident every step of the way.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Mission */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
            <div className="w-14 h-14 bg-[#658C58]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#658C58] transition-colors">
              <FaBullseye className="text-2xl text-[#658C58] group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to offer quality rentals with a straightforward,
              hassle-free experience. We aim to connect great tenants with
              well-maintained homes while providing service that's reliable,
              respectful, and easy to work with.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
            <div className="w-14 h-14 bg-[#658C58]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#658C58] transition-colors">
              <FaEye className="text-2xl text-[#658C58] group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our vision is to build a community of renters who feel supported,
              valued, and at home. We're working toward a future where finding a
              great place to live is simple, transparent, and enjoyable for
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#658C58]/10 text-[#658C58] rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at RivoRent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaHandshake,
                title: "Trust",
                desc: "Building lasting relationships through honesty and transparency.",
              },
              {
                icon: FaHeart,
                title: "Care",
                desc: "Treating every tenant like family with personalized attention.",
              },
              {
                icon: FaShieldAlt,
                title: "Quality",
                desc: "Maintaining high standards for all our properties.",
              },
              {
                icon: FaUsers,
                title: "Community",
                desc: "Creating spaces where people feel at home.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#658C58] group transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#658C58]/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <value.icon className="text-2xl text-[#658C58] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-white mb-2 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/80 text-sm transition-colors">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#658C58]/10 text-[#658C58] rounded-full text-sm font-medium mb-4">
              Our History
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Journey
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-[#658C58]/30"></div>

            {/* Timeline Items */}
            {[
              {
                year: "1886",
                title: "Company Founded",
                desc: "RivoRent Inc. traces its roots back to 1886, when we began as a small family-run operation dedicated to providing dependable housing and fair rental practices in our community.",
              },
              {
                year: "1920s",
                title: "Growth in Residential Rentals",
                desc: "As the region expanded, so did we—adding multiple residential properties and becoming a trusted name for quality living spaces.",
              },
              {
                year: "1970s",
                title: "Modernization & Innovation",
                desc: "We embraced new standards in property management, introducing updated rental processes and expanding into multi-unit residential buildings.",
              },
              {
                year: "Today",
                title: "A Legacy of Service",
                desc: "With more than a century of experience, our commitment remains the same: offering reliable rentals, responsive service, and comfortable homes for every tenant.",
              },
            ].map((item, i) => (
              <div key={i} className="relative flex items-start gap-6 mb-10 last:mb-0 pl-12 md:pl-20">
                {/* Dot */}
                <div className="absolute left-2 md:left-6 w-5 h-5 bg-[#658C58] rounded-full border-4 border-white shadow-md z-10"></div>

                {/* Content */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex-1">
                  <span className="inline-block px-3 py-1 bg-[#658C58] text-white text-sm font-bold rounded-full mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#658C58]/10 text-[#658C58] rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to making your rental experience
              exceptional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jonathan Mercer",
                role: "Chief Executive Officer (CEO)",
                image: manager1,
              },
              {
                name: "Elena Bradford",
                role: "Director of Property Management",
                image: manager3,
              },
              {
                name: "Marcus Whitfield",
                role: "Chief Financial Officer (CFO)",
                image: manager2,
              },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-white/80 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-1 bg-[#658C58]/10 text-[#658C58] rounded-full text-sm font-medium mb-4">
                Why RivoRent?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We make renting simple and stress-free. Our listings are always
                up-to-date, our communication is quick, and we're here to help
                you find a place that actually feels right. No hassle, no
                guesswork—just an easy, straightforward rental experience.
              </p>

              <div className="space-y-4">
                {[
                  "Quick response times - usually within hours",
                  "Clear, honest communication at every step",
                  "Well-maintained properties you can trust",
                  "Flexible scheduling for tours",
                  "Simple, straightforward application process",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-[#658C58] flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "135+", label: "Years of Experience" },
                { value: "500+", label: "Properties Managed" },
                { value: "1000+", label: "Happy Tenants" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <p className="text-3xl md:text-4xl font-bold text-[#658C58] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-[#658C58] to-[#507144]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Let's chat! Whether you have questions or you're ready to start
            looking, our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/search">
              <button className="px-8 py-4 bg-white text-[#658C58] rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                Browse Properties
                <FaArrowRight />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#658C58] transition-all w-full sm:w-auto">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}