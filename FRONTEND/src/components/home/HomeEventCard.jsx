"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next-nprogress-bar";

const HomeEventCard = ({ event }) => {
  // Define the color based on the event type
  const eventTypeColor = {
    "Music Event": "bg-blue-200 text-blue-600",
    "Campus Event": "bg-pink-200 text-pink-600",
    // Add more types as needed
  };

  const router = useRouter();

  return (
    <motion.div
      onClick={() => {
        router.push(`/portal/events/${event.id}`);
      }}
      key={event.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-center justify-between bg-white dark:bg-[#1a202c] border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4  shadow hover:shadow-md transition-all duration-200 cursor-pointer border-gradient "
    >
      {/* Left Section (Icon) */}
      <div className="flex  gap-x-4">
        {/* Event Image */}
        <div className="w-28 h-20 flex items-center justify-center  overflow-hidden">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.event_name}
              width={200}
              height={200}
              quality={100}
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              src={"/assets/noPhoto.png"}
              alt={event.event_name}
              width={200}
              height={200}
              quality={100}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Event Details */}

        <div>
          <div className="">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              {event.event_name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {event.location}
            </p>
          </div>

          <div className="mt-2">
            <p className="text-xs font-medium text-gray-800 dark:text-white">
              {new Date(event.date).toLocaleDateString()} at{" "}
              {new Date(event.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
          </div>
        </div>
      </div>

      {/* Right Section (Date and Time) */}
      <div className="flex items-center ">
        {/* <div className="text-right">
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            {new Date(event.date).toLocaleDateString()} at{" "}
            {new Date(event.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
        </div> */}

        {/* Arrow Icon */}
        <ArrowRight size={16} className="text-[--secondary-text]" />
      </div>
    </motion.div>
  );
};

export default HomeEventCard;
