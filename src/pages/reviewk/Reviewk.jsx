"use client";

import { useState, useEffect, useCallback } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  { id: 1, name: "Jessica R.", date: "2025-10-12", description: "Rivo.Rent made finding my dream apartment a breeze. The platform is smooth, reliable, and easy to use. Highly recommended!", stars: 5 },
  { id: 2, name: "Mark T.", date: "2025-09-22", description: "Fantastic experience! The listings are authentic, and the support team is super helpful.", stars: 4 },
  { id: 3, name: "Samantha L.", date: "2025-08-30", description: "I found a perfect 2-bedroom apartment within days. Rivo.Rent really simplifies renting.", stars: 5 },
  { id: 4, name: "David H.", date: "2025-07-15", description: "Excellent service, smooth interface, and real reviews. Makes online renting stress-free.", stars: 4 },
  { id: 5, name: "Olivia M.", date: "2025-06-28", description: "I love how detailed the property information is. Saved me a lot of time visiting wrong listings.", stars: 5 },
  { id: 6, name: "Ryan P.", date: "2025-05-19", description: "Very satisfied with Rivo.Rent. The search filters are perfect, and the website runs flawlessly.", stars: 4 },
  { id: 7, name: "Emily K.", date: "2025-04-11", description: "Found my apartment in no time! Rivo.Rent is intuitive and trustworthy.", stars: 5 },
  { id: 8, name: "James B.", date: "2025-03-02", description: "Highly recommend Rivo.Rent for anyone looking to rent. Smooth experience and great support.", stars: 5 },
];

export default function ReviewsAnimated() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const total = reviews.length;

  // Initialize component on client side
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const getVisibleReviews = useCallback(() => {
    if (!mounted) return reviews.slice(0, 2); // Default to 2 cards during SSR
    
    const count = isMobile ? 1 : 2;
    const displayed = [];
    for (let i = 0; i < count; i++) {
      displayed.push(reviews[(currentIndex + i) % total]);
    }
    return displayed;
  }, [currentIndex, total, isMobile, mounted]);

  const [visibleReviews, setVisibleReviews] = useState(() => reviews.slice(0, 2));

  // Handle resize and mobile detection
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  // Update visible reviews when dependencies change
  useEffect(() => {
    setVisibleReviews(getVisibleReviews());
  }, [currentIndex, isMobile, getVisibleReviews]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!mounted || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, total, mounted]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Don't render anything until mounted on client
  if (!mounted) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#658C58] mb-4">
            What Our Users Say
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Real feedback from real renters using Rivo.Rent
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 justify-center">
            {[1, 2].map((i) => (
              <div key={i} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg animate-pulse">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <div key={star} className="w-5 h-5 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 md:px-8 py-16 md:py-20">
      <div className="text-center mb-12 md:mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#658C58] mb-4"
        >
          What Our Users Say
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Real feedback from real renters using Rivo.Rent
        </motion.p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10 border border-gray-100 group"
          aria-label="Previous reviews"
        >
          <FaChevronLeft 
            className="text-[#658C58] group-hover:text-[#4a6c4a] transition-colors duration-300" 
            size={20} 
          />
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10 border border-gray-100 group"
          aria-label="Next reviews"
        >
          <FaChevronRight 
            className="text-[#658C58] group-hover:text-[#4a6c4a] transition-colors duration-300" 
            size={20} 
          />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`flex gap-4 md:gap-6 justify-center ${isMobile ? 'px-4' : ''}`}
            >
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={`${review.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex-shrink-0 bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer ${
                    isMobile ? 'w-full max-w-sm' : 'w-full max-w-md'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array(5).fill().map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <FaStar 
                          size={18} 
                          className={i < review.stars ? "text-yellow-400 drop-shadow-sm" : "text-gray-300"} 
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <motion.p 
                    className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{review.description}"
                  </motion.p>

                  {/* Reviewer Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {review.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(review.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-[#658C58] to-[#4a6c4a] rounded-full flex items-center justify-center text-white font-bold text-sm"
                      whileHover={{ scale: 1.1 }}
                    >
                      {review.name.charAt(0)}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 md:mt-12 gap-2">
          {reviews.slice(0, total - (isMobile ? 0 : 1)).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#658C58] w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {[
          { number: "4.8/5", label: "Average Rating" },
          { number: "500+", label: "Happy Renters" },
          { number: "98%", label: "Success Rate" },
          { number: "24/7", label: "Support" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="text-2xl md:text-3xl font-bold text-[#658C58] mb-1">
              {stat.number}
            </div>
            <div className="text-gray-600 text-sm md:text-base">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}