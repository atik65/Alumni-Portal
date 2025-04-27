"use client";

import React from "react";
import { MapPin, Calendar, ImageOff } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const HomeEventCard = ({ event }) => {
  return (
    <motion.div
      key={event.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex flex-col md:flex-row bg-white dark:bg-[--sidebar-bg-dark] border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Left Image */}
      <div className="relative w-full md:w-48 h-40 md:h-auto">
        {event?.image ? (
          <Image
            src={event.image || "/placeholder.jpg"}
            alt={event.event_name}
            fill
            className="object-cover object-center"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <ImageOff size={100} strokeWidth={1} />
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex flex-col p-4 justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            {event.event_name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            {event.description.length > 100
              ? `${event.description.slice(0, 100)}...`
              : event.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-gray-500 dark:text-gray-400 text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[--secondary-bg]" />
            <span>
              {new Date(event.date).toLocaleDateString()} at{" "}
              {new Date(event.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {event.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[--secondary-bg]" />
              <span>{event.location}</span>
            </div>
          )}

          <div className="mt-2">
            <span className="inline-block bg-[--secondary-bg]  dark:bg-gray-400 text-white dark:text-black px-2.5 py-1 rounded-full text-[10px] font-semibold">
              {event.event_type}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeEventCard;
