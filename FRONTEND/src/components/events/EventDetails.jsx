"use client";
import { useGetEventDetails } from "../../hooks/tanstack/useEvents";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Tag,
  Clock,
  Share2,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next-nprogress-bar";
import { enqueueSnackbar } from "notistack";

const EventDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEventDetails(id);

  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Format time
  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "h:mm a");
    } catch (error) {
      return "";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const router = useRouter();

  const handleShare = () => {
    // copy event url to clipboard
    navigator.clipboard.writeText(window.location.href);
    enqueueSnackbar("Event URL copied to clipboard", {
      variant: "success",
      style: {
        backgroundColor: "#3b3b3b",
        color: "#fff",
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen container mx-auto px-5 rounded-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-purple-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-blue-400 animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen container mx-auto px-5 rounded-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Event Not Found</h2>
          <p className="text-gray-300 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className=" container mx-auto  rounded-xl overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
      {/* Hero Section */}
      <div className="relative lg:h-[40vh] h-[30vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>

        {/* Background Image */}
        <Image
          src={data?.result?.image || "/placeholder.svg?height=800&width=1200"}
          alt={data?.result?.event_name}
          fill
          className="object-cover"
          priority
        />

        {/* Animated Overlay Elements */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-[10%] left-[5%] w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute top-[30%] right-[15%] w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-[20%] left-[25%] w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-float"></div>
        </div>

        {/* Content */}
        <motion.div
          className="absolute bottom-0 left-0 w-full z-20 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto">
            <Badge
              variant="outline"
              className="mb-4 bg-white/10 backdrop-blur-sm border-none text-white px-4 py-1"
            >
              {data?.result?.event_type}
            </Badge>
            <h1 className=" text-2xl  sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-white drop-shadow-lg">
              {data?.result?.event_name}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-30">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:col-span-2">
            {/* Event Details Card */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
                  About This Event
                </h2>
                <p className="text-gray-200 leading-relaxed mb-8">
                  {data?.result?.description ||
                    "No description available for this event."}
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Button
                    onClick={() => {
                      enqueueSnackbar("Feature not available yet", {
                        variant: "warning",
                        style: {
                          backgroundColor: "#3b3b3b",
                          color: "#fff",
                        },
                      });
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-none text-white"
                  >
                    Register Now
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button>
                </div>
              </div>
            </motion.div>

            <Countdown itemVariants={itemVariants} date={data?.result?.date} />
          </div>

          {/* Event Info Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <h2 className="text-xl font-bold mb-6">Event Details</h2>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="font-medium">
                      {formatDate(data?.result?.date)}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="font-medium">
                      {formatTime(data?.result?.date)}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-pink-500/20 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-pink-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="font-medium">{data?.result?.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Tag className="h-5 w-5 text-green-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Event Type</p>
                    <p className="font-medium">{data?.result?.event_type}</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Button
                  onClick={() => {
                    enqueueSnackbar("Feature not available yet", {
                      variant: "warning",
                      style: {
                        backgroundColor: "#3b3b3b",
                        color: "#fff",
                      },
                    });
                  }}
                  variant="ghost"
                  className="w-full justify-between text-white hover:bg-white/10 group"
                >
                  <span className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    View Attendees
                  </span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          onClick={handleShare}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-0 shadow-lg hover:shadow-purple-500/50"
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite;
        }
        .animate-float {
          animation: float 12s infinite;
        }
      `}</style>
    </div>
  );
};

export default EventDetails;

const getTimeRemaining = (targetDate) => {
  const total = Date.parse(targetDate) - Date.now();
  const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
  const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
  const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);
  return { total, days, hours, minutes, seconds };
};

const Countdown = ({ itemVariants, date }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(date));

  useEffect(() => {
    if (!date) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(date));
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  // Memoize the countdown values for optimization
  const countdownUnits = useMemo(
    () => [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Minutes", value: timeLeft.minutes },
      { label: "Seconds", value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  return (
    <motion.div
      variants={itemVariants}
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Event Countdown</h2>
        <div className="grid grid-cols-4 gap-4">
          {countdownUnits.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">
                  {unit.value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-300">{unit.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
