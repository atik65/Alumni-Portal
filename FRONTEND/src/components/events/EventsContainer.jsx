"use client";
import { motion } from "framer-motion";
import { useGetEvent } from "../../hooks/tanstack/useEvents";
import { AddEvent } from "./AddEvent";
import EventCard from "./EventCard";

const EventsContainer = () => {
  const { data, isLoading } = useGetEvent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="min-h-screen rounded-xl pt-10 bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E] p-6">
      <div className="container mx-auto w-full py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <AddEvent />
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="rounded-xl h-[380px] bg-gradient-to-br from-gray-100/5 to-gray-100/10 dark:from-gray-900/20 dark:to-gray-900/30 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {data?.results.map((event, index) => (
              <EventCard
                key={event.id}
                index={index}
                title={event?.event_name}
                date={event?.date}
                location={event?.location}
                image={event?.image}
                link={`/portal/events/${event?.id}`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EventsContainer;
