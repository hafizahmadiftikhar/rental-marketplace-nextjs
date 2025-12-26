"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ModelCarousel({ models }) {
  if (!models || models.length === 0) return null;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const imagesPerSlide = 6;
  const totalSlides = Math.ceil(models.length / imagesPerSlide);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1 < totalSlides ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : totalSlides - 1));
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section className="w-full py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Explore Models
      </h2>

      <div className="relative w-full max-w-8xl mx-auto overflow-hidden">
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-7"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
            >
              {models
                .slice(
                  index * imagesPerSlide,
                  index * imagesPerSlide + imagesPerSlide
                )
                .map((model, i) => {
                  const imageUrl =
                    model.images?.[0]?.url || "/dummy-property.png";
                  return (
                    <div
                      key={`${index}-${i}`}
                      className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group scale-115"
                    >
                      <Image
                        src={imageUrl}
                        alt={model.modelName || "Model Image"}
                        fill
                        className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                      />

                      {/* Hover Overlay with Title and Description */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-xl flex flex-col justify-end p-4">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {(model.modelName || model.description) && (
                            <div className="bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 rounded-lg -mx-4 -mb-4">
                              {model.modelName && (
                                <h3 className="text-white font-bold text-sm md:text-base mb-1 line-clamp-1">
                                  {model.modelName}
                                </h3>
                              )}
                              {model.description && (
                                <p className="text-white/90 text-xs md:text-sm line-clamp-2">
                                  {model.description}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg z-20 backdrop-blur-sm border border-gray-200"
          aria-label="Previous models"
        >
          <FaChevronLeft size={18} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg z-20 backdrop-blur-sm border border-gray-200"
          aria-label="Next models"
        >
          <FaChevronRight size={18} />
        </button>

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-[#658C58] w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
