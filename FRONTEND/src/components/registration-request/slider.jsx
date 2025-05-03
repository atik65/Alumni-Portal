"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  Building2,
  Award,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const RegistrationRequestSlider = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Define slide content
  const slides = [
    {
      id: 1,
      title: "Welcome to UAP",
      description:
        "A leading institution for innovation and academic excellence",
      imagePath: "/assets/uap.jpeg",
      icon: <GraduationCap size={28} />,
      stats: [
        { value: "25,000+", label: "Alumni" },
        { value: "50+", label: "Years" },
      ],
    },
    {
      id: 2,
      title: "Campus Life",
      description:
        "Experience a vibrant community and state-of-the-art facilities",
      imagePath: "/assets/uap-1.jpeg",
      icon: <Building2 size={28} />,
      stats: [
        { value: "100+", label: "Clubs" },
        { value: "30+", label: "Buildings" },
      ],
    },
    {
      id: 3,
      title: "Global Network",
      description: "Connect with alumni across industries and continents",
      imagePath: "/assets/uap.jpeg", // Using the same image as a fallback
      icon: <Users size={28} />,
      stats: [
        { value: "120+", label: "Countries" },
        { value: "500+", label: "Partners" },
      ],
    },
    {
      id: 4,
      title: "Academic Excellence",
      description: "Recognized for outstanding research and teaching",
      imagePath: "/assets/uap-1.jpeg", // Using the same image as a fallback
      icon: <Award size={28} />,
      stats: [
        { value: "Top 5%", label: "Ranking" },
        { value: "200+", label: "Programs" },
      ],
    },
  ];

  useEffect(() => {
    // Set loaded state after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle navigation
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isAutoplay) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      setIsAutoplay(!isAutoplay);
    }
  };

  return (
    <div className="relative h-60 sm:h-96 w-full overflow-hidden rounded-2xl">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Swiper component */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full">
            {/* Image with overlay */}
            <div className="relative h-full w-full">
              <Image
                src={slide.imagePath || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeIndex}`}
                className="absolute inset-0 z-20 flex flex-col justify-end p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Icon with glowing effect */}
                <motion.div
                  className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.7)]"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {slide.icon}
                </motion.div>

                {/* Title with gradient text */}
                <h2 className="mb-2 font-orbitron text-3xl font-bold text-white md:text-4xl">
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </h2>

                {/* Description */}
                <p className="mb-6 max-w-md text-lg text-gray-300">
                  {slide.description}
                </p>

                {/* Stats */}
                {slide.stats && (
                  <div className="mb-4 flex flex-wrap gap-4">
                    {slide.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="backdrop-blur-md rounded-xl border border-gray-700 bg-black/30 p-3 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          duration: 0.5,
                        }}
                      >
                        <div className="text-xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-400">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3">
        {/* Pagination indicators */}
        <div className="mr-2 flex gap-1">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-purple-500" : "bg-gray-600"
              }`}
              animate={{
                width: index === activeIndex ? 24 : 16,
                opacity: index === activeIndex ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={goPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-purple-900/50"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-purple-900/50"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Autoplay toggle */}
        <button
          onClick={toggleAutoplay}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-black/50 text-white backdrop-blur-md transition-all ${
            isAutoplay ? "text-purple-400" : "text-gray-400"
          }`}
          aria-label={isAutoplay ? "Pause autoplay" : "Start autoplay"}
        >
          {isAutoplay ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>

      {/* Futuristic decorative elements */}
      <div className="absolute left-6 top-6 z-20 h-20 w-20 rounded-full border border-purple-500/30 opacity-30" />
      <div className="absolute right-20 top-20 z-20 h-12 w-12 rounded-full border border-blue-500/30 opacity-20" />
      <div className="absolute left-1/4 top-1/3 z-20 h-16 w-16 rounded-full border border-cyan-500/30 opacity-20" />
    </div>
  );
};

export default RegistrationRequestSlider;
