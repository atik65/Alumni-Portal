"use client";

import React from "react";
// import { useGetEvent } from "@/hooks/tanstack/useEvents";
import { MapPin, Calendar } from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";
import { useGetEvent } from "../../hooks/tanstack/useEvents";
import HomeEventCard from "./HomeEventCard";

const EventList = () => {
  const { data, isLoading } = useGetEvent();

  if (isLoading) {
    return <EventListSkeleton />;
  }

  return (
    <div className="">
      <h2 className="font-semibold text-lg mb-6 text-gray-800 dark:text-white">
        Upcoming Events
      </h2>
      <div className="space-y-4 max-h-[88vh] overflow-y-auto overflow-x-hidden home-events pb-24 ">
        {data?.results.map((event) => (
          <HomeEventCard key={event.id} event={event} />
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
