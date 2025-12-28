"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaUser,
  FaHeadset,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaChevronDown,
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      value: "(845) 576-9038",
      href: "tel:+18455769038",
      subtitle: "We call this number (845) 576-9038",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "Support@Rivo.Rent",
      subtitle: "We reply within 24 hours",
      href: "mailto:Support@Rivo.Rent",
      color: "from-green-500 to-green-600",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Office",
      value: "200 Public Square",
      subtitle: "Cleveland, OH 44114",
      href: "https://maps.google.com/?q=200+Public+Square+Cleveland+OH",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FaClock,
      title: "Business Hours",
      value: "Mon - Fri: 8:00 AM - 10:00 PM",
      subtitle: "Sat: 10:00 AM - 4:00 PM ",
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
            {/* Left - Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we will get back to you as soon as
                  possible.
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-semibold">
                      Message Sent!
                    </p>
                    <p className="text-green-600 text-sm">
                      We will get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="name"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658C58] focus:border-transparent text-gray-800 bg-gray-50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="email"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658C58] focus:border-transparent text-gray-800 bg-gray-50"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658C58] focus:border-transparent text-gray-800 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="subject"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658C58] focus:border-transparent text-gray-800 bg-gray-50 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="rental">Rental Question</option>
                      <option value="application">Application Help</option>
                      <option value="maintenance">Maintenance Request</option>
                      <option value="payment">Payment Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="message"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658C58] focus:border-transparent text-gray-800 bg-gray-50 resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#658C58] to-[#507144] hover:from-[#507144] hover:to-[#658C58] text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right - Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.1234567890123!2d-81.6937!3d41.5002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830f07e0f7d4745%3A0x5d9a4a2e8c7e1234!2s200%20Public%20Square%2C%20Cleveland%2C%20OH%2044114!5e0!3m2!1sen!2sus!4v1234567890123"
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