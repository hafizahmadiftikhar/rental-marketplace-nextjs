"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is the application process for renting an apartment?",
    answer:
      "The application process is simple: submit your rental application online, provide proof of income and identification, and once approved, sign the lease agreement. Our team is available to guide you every step of the way.",
  },
  {
    question: "Are pets allowed in these apartments?",
    answer:
      "Yes, most of our properties are pet-friendly. Some restrictions may apply regarding size and breed. Please check the property details for specific pet policies.",
  },
  {
    question: "What utilities are included in the rent?",
    answer:
      "Utilities vary by property. Typically, water and trash are included. Electricity, gas, and internet may be separate. Specific details are listed in each property description.",
  },
  {
    question: "Is there parking available for residents?",
    answer:
      "Yes, most apartments offer dedicated parking spaces or garages. Some properties may offer covered or reserved parking options. Check the property details for exact availability.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border transition-all duration-300 ${
                isOpen ? "border-[#658C58]" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition"
              >
                <span
                  className={`text-gray-800 font-semibold text-lg ${
                    isOpen ? "text-[#658C58]" : ""
                  }`}
                >
                  {faq.question}
                </span>
                <span className={`text-[#658C58]`}>
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: 500 }}
                    exit={{ opacity: 0, maxHeight: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-6 pb-6 text-gray-700 bg-gradient-to-r from-[#f0fdf4] to-white overflow-hidden rounded-b-2xl"
                  >
                    <p className="leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
