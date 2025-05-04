"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ImageOff, ArrowRight } from "lucide-react";
import ImageZoomViewModal from "../shared/ImageZoomViewModal";

const EventCard = ({ index, title, date, location, image, link }) => {
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative rounded-xl overflow-hidden h-[320px] bg-[--core-bg] dark:bg-black shadow-md hover:shadow-lg dark:shadow-gray-900/30 border border-gray-100/20 dark:border-gray-800/50"
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[--secondary-bg] opacity-80"></div>

      {/* Event Image */}
      <div className="relative w-full h-40 overflow-hidden">
        {image ? (
          <div className="w-full h-full">
            <ImageZoomViewModal
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              imgURI={image}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-900">
            <ImageOff size={40} strokeWidth={1} className="text-gray-400" />
          </div>
        )}

        {/* Date badge */}
        <div className="absolute bottom-3 right-3 z-20 bg-white dark:bg-gray-800 text-[--secondary-bg] dark:text-[--secondary-bg] px-3 py-1 rounded-md text-xs font-medium shadow-md flex items-center gap-1.5">
          <Calendar size={12} />
          <span>{formatDate(date)}</span>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4 flex flex-col h-[calc(320px-160px)]">
        <h2 className="font-semibold text-lg mb-2 line-clamp-2 text-[--base-text] dark:text-white">
          {title}
        </h2>

        {/* Location */}
        <div className="flex items-center text-sm gap-2 text-[--base-text]/70 dark:text-white/70">
          <MapPin size={14} className="text-[--secondary-bg]" />
          <p className="line-clamp-1">{location}</p>
        </div>

        {/* Spacer */}
        <div className="flex-grow min-h-[10px]"></div>

        {/* View Details Button - Improved color */}
        <Link
          href={link}
          className="mt-2 text-sm font-medium bg-[--core-bg] dark:bg-gray-800 text-[--secondary-bg] dark:text-[--secondary-bg] border border-[--secondary-bg]/50 dark:border-[--secondary-bg]/50 rounded-md h-9 flex items-center justify-center group-hover:bg-[--secondary-bg]/10 dark:group-hover:bg-[--secondary-bg]/10 transition-colors duration-200"
        >
          <span>View Details</span>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowRight size={16} className="ml-2" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
