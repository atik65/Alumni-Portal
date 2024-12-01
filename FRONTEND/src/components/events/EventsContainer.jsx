"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Eye } from "lucide-react";
import eventImage from "../../../public/assets/event.webp";

const EventsContainer = () => {
  const events = [
    {
      title: "Alumni Meetup 2024",
      date: "December 15, 2024",
      location: "UAP Auditorium, Dhaka",
      image: eventImage,
      link: "/portal/events/1",
    },
    {
      title: "Tech Talk: AI in 2024",
      date: "January 10, 2025",
      location: "Main Hall, UAP",
      image: eventImage,
      link: "/portal/events/2",
    },
    {
      title: "CSE Alumni Workshop",
      date: "February 5, 2025",
      location: "Lab 301, UAP",
      image: eventImage,
      link: "/portal/events/3",
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="w-full  p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard
            key={index}
            index={index}
            title={event.title}
            date={event.date}
            location={event.location}
            image={event.image}
            link={event.link}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsContainer;

const EventCard = ({ index, title, date, location, image, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-md shadow-lg dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white overflow-hidden"
    >
      {/* Event Image */}
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          style={{ borderBottom: "4px solid var(--secondary-bg)" }}
        />
      </div>

      {/* Event Details */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="font-semibold text-lg">{title}</h2>

        {/* Date and Location */}
        <div className="flex items-center text-sm gap-2 text-opacity-70">
          <Calendar size={16} className="text-[--secondary-bg]" />
          <p>{date}</p>
        </div>
        <div className="flex items-center text-sm gap-2 text-opacity-70">
          <MapPin size={16} className="text-[--secondary-bg]" />
          <p>{location}</p>
        </div>

        {/* View Details */}
        <Link
          href={link}
          className="mt-3 text-sm font-semibold bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] w-full rounded h-10 flex items-center justify-center hover:bg-[--secondary-bg] dark:hover:bg-[--secondary-bg] hover:text-white duration-200"
        >
          <span>View Details</span>
          <Eye size={19} className="ml-2" />
        </Link>
      </div>
    </motion.div>
  );
};
