"use client";

import React from "react";
// import { useGetEvent } from "@/hooks/tanstack/useEvents";
import { MapPin, Calendar } from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";
import { useGetEvent } from "../../hooks/tanstack/useEvents";

const EventList = () => {
  const { data, isLoading } = useGetEvent();

  if (isLoading) {
    return <EventListSkeleton />;
  }

  return (
    <div>
      <h2 className="font-semibold text-lg mb-6 text-gray-800 dark:text-white">
        Upcoming Events
      </h2>
      <div className="space-y-4">
        {data?.results.map((event) => (
          <div
            key={event.id}
            className="p-4 border border-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-[--sidebar-bg-dark] dark:hover:bg-[--sidebar-bg-dark]/80 rounded-lg shadow-md transition-all duration-200"
          >
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {event.event_name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              {event.description.length > 100
                ? `${event.description.slice(0, 100)}...`
                : event.description}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={14} className="text-[--secondary-bg]" />
                {new Date(event.date).toLocaleDateString()} at{" "}
                {new Date(event.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              {event.location && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={14} className="text-[--secondary-bg]" />
                  {event.location}
                </div>
              )}
              <span className="text-sm text-[--secondary-bg] font-medium">
                {event.event_type}
              </span>
            </div>
          </div>
        ))}
        {data?.results.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No upcoming events scheduled
          </div>
        )}
      </div>
    </div>
  );
};

const EventListSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-7 w-40 mb-6" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 border border-gray-200 bg-gray-50 dark:bg-[--sidebar-bg-dark] rounded-lg"
          >
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-full mb-3" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
