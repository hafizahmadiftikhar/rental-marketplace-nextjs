"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaHeadset,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaChevronDown,
  FaWhatsapp,
  FaCommentDots,
  FaArrowRight,
} from "react-icons/fa";

// FAQ Data
const faqs = [
  {
    question: "How do I apply for a rental?",
    answer:
      "You can apply online by selecting the property you're interested in and completing our secure rental application. Once submitted, our team will review your information and contact you if any additional details are needed.",
  },
  {
    question: "What documents do I need?",
    answer: `Applicants are typically required to provide:
• A valid government-issued photo ID
• Proof of income (recent pay stubs, offer letter, or bank statements)
• Rental history and/or references
• Authorization for a background and credit check

Additional documentation may be requested depending on the property or situation.`,
  },
  {
    question: "How long does approval take?",
    answer:
      "Most applications are reviewed within 1–3 business days after all required information is submitted. In some cases, approval may take slightly longer if additional verification is needed.",
  },
  {
    question: "What is the application fee?",
    answer:
      "The application fee covers the cost of processing your application, including background and credit checks. The exact fee amount is clearly displayed before you submit your application and is non-refundable.",
  },
];

// FAQ Accordion Item Component
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-gray-50 hover:bg-[#658C58]/10 flex items-center justify-between text-left transition-colors"
      >
        <span className="text-gray-800 font-medium text-sm pr-4">
          {question}
        </span>
        <FaChevronDown
          className={`text-[#658C58] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="p-4 text-gray-600 text-sm whitespace-pre-line bg-white">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function Contact() {
  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      value: "(845) 576-9038",
      href: "tel:+18455769038",
      subtitle: "Call or Text",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "(646) 745-4567",
      href: "https://wa.me/16467454567",
      subtitle: "Fast Response",
      color: "from-green-500 to-green-600",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "Support@Rivo.Rent",
      href: "mailto:Support@Rivo.Rent",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FaClock,
      title: "Business Hours",
      value: "Mon - Fri: 8:00 AM - 10:00 PM",
      subtitle: "Sat: 10:00 AM - 4:00 PM",
      href: null,
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2F5233] via-[#507144] to-[#658C58] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaHeadset className="text-[#a5d6a7]" />
            <span className="text-sm text-white/90">We are Here to Help</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Have questions about renting? Need assistance with your application?
            Our team is ready to help you find your perfect home.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 -mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 group"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="text-white text-xl" />
                </div>
                <h3 className="text-sm text-gray-500 font-medium mb-1">
                  {item.title}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-gray-800 font-bold hover:text-[#658C58] transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-800 font-bold">{item.value}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left - BIG CONTACT BUTTONS (Replaced Form) */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Contact Us Directly
                </h2>
                <p className="text-gray-600">
                  Choose your preferred way to reach us!
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <FaClock className="text-[#658C58]" />
                  <span className="text-gray-700 text-sm">
                    <span className="font-semibold">Mon - Fri:</span> 8:00 AM - 10:00 PM | <span className="font-semibold">Sat:</span> 10:00 AM - 4:00 PM
                  </span>
                </div>
              </div>

              {/* Big Contact Buttons */}
              <div className="space-y-4">
                
                {/* WhatsApp Button - BIGGEST */}
                <a
                  href="https://wa.me/16467454567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaWhatsapp className="text-white text-4xl" />
                      </div>
                      <div className="text-white">
                        <p className="text-sm font-medium opacity-90">WhatsApp Us</p>
                        <p className="text-2xl md:text-3xl font-bold">(646) 745-4567</p>
                      </div>
                    </div>
                    <FaArrowRight className="text-white text-2xl opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </div>
                </a>

                {/* Call/Text Button */}
                <a
                  href="tel:+18455769038"
                  className="block w-full p-6 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#3B82F6] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaPhone className="text-white text-3xl" />
                      </div>
                      <div className="text-white">
                        <p className="text-sm font-medium opacity-90">Call or Text Us</p>
                        <p className="text-2xl md:text-3xl font-bold">(845) 576-9038</p>
                      </div>
                    </div>
                    <FaArrowRight className="text-white text-2xl opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </div>
                </a>

                {/* Email Button */}
                <a
                  href="mailto:Support@Rivo.Rent"
                  className="block w-full p-6 bg-gradient-to-r from-[#658C58] to-[#507144] hover:from-[#507144] hover:to-[#658C58] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaEnvelope className="text-white text-3xl" />
                      </div>
                      <div className="text-white">
                        <p className="text-sm font-medium opacity-90">Email Us</p>
                        <p className="text-xl md:text-2xl font-bold">Support@Rivo.Rent</p>
                      </div>
                    </div>
                    <FaArrowRight className="text-white text-2xl opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </div>
                </a>

              </div>

              {/* Quick Response Note */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#658C58]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCommentDots className="text-[#658C58]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Quick Response</p>
                    <p className="text-gray-600 text-sm mt-1">
                      WhatsApp is the fastest way to reach us! Our team responds during business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.436073562391!2d-81.69088768455387!3d41.49945797925128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830f07e7a89c6a5%3A0x5e6a6c4c1e4f5a5a!2s200%20Public%20Square%2C%20Cleveland%2C%20OH%2044114!5e0!3m2!1sen!2sus!4v1703836800000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2">
                    Visit Our Office
                  </h3>
                  <p className="text-gray-600 text-sm">
                    200 Public Square, Cleveland, OH 44114
                  </p>
                  <a
                    href="https://maps.google.com/?q=200+Public+Square+Cleveland+OH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#658C58] font-semibold text-sm mt-3 hover:underline"
                  >
                    Get Directions
                    <FaMapMarkerAlt />
                  </a>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <FAQItem
                      key={i}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-[#658C58] to-[#507144] rounded-2xl shadow-xl p-6 md:p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Connect With Us</h3>
                <p className="text-white/80 text-sm mb-6">
                  Follow us on social media for updates and rental tips.
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      icon: FaFacebookF,
                      href: "https://www.facebook.com/share/18DksJ81js/",
                    },
                    { icon: FaTwitter, href: "https://x.com/RivoRent" },
                    {
                      icon: FaInstagram,
                      href: "http://instagram.com/_rivorent",
                    },
                    {
                      icon: FaLinkedinIn,
                      href: "https://www.linkedin.com/in/rivo-rent-a1136139a",
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-white hover:text-[#658C58] rounded-xl flex items-center justify-center transition-all duration-300"
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}