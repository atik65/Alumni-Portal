"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useGetJobs } from "../../hooks/tanstack/useJobs";
import { Skeleton } from "../ui/skeleton";
import JobPost from "./JobPost";
import AddJob from "./AddJob";
import { useGetUserDetails } from "../../hooks/tanstack/useAuth";

const JobPortal = () => {
  const { data, isLoading } = useGetJobs();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { data: userInfo, isLoading: isUserLoading } = useGetUserDetails();

  return (
    <div
      className={`min-h-screen w-full p-4 md:p-8 rounded-xl ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50"
      }`}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`mb-8 p-6 rounded-lg ${
              isDark
                ? "backdrop-blur-md bg-black/20 border-white/10"
                : "backdrop-blur-md bg-white/70 border-black/5 shadow-md"
            }`}
          >
            <div className="flex gap-2 items-center justify-between mb-3">
              <h1
                className={`text-2xl font-bold whitespace-nowrap ${
                  isDark
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                    : "bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700"
                }`}
              >
                Job Portal
              </h1>

              {/* id ==2 means Alumni */}
              {userInfo?.role?.id == 2 && <AddJob />}
            </div>
            <p
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Browse a wide range of job opportunities on our job portal.
              Whether you're a student, a recent graduate, or a seasoned
              professional, we have the perfect job for you.
            </p>
          </motion.div>

          {/* Job listings */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <JobCardSkeleton key={i} isDark={isDark} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data?.results?.map((job, index) => (
                <JobPost key={job.id} job={job} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default JobPortal;

export const JobCardSkeleton = ({ isDark }) => {
  return (
    <div
      className={`p-4 rounded-lg space-y-3 ${
        isDark
          ? "backdrop-blur-md bg-black/20 border border-white/10"
          : "backdrop-blur-md bg-white/70 border border-black/5 shadow-sm"
      }`}
    >
      <div className="flex justify-between items-start">
        <Skeleton
          className={`h-6 w-2/3 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
        />
        <Skeleton
          className={`h-5 w-1/4 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
        />
      </div>

      <div className="flex gap-3 mt-2">
        <Skeleton
          className={`h-7 w-7 rounded-full ${
            isDark ? "bg-gray-800" : "bg-gray-200"
          }`}
        />
        <div className="space-y-1 flex-1">
          <Skeleton
            className={`h-3 w-16 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          />
          <Skeleton
            className={`h-4 w-24 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          />
        </div>

        <Skeleton
          className={`h-7 w-7 rounded-full ${
            isDark ? "bg-gray-800" : "bg-gray-200"
          }`}
        />
        <div className="space-y-1 flex-1">
          <Skeleton
            className={`h-3 w-16 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          />
          <Skeleton
            className={`h-4 w-24 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          />
        </div>
      </div>

      <div>
        <Skeleton
          className={`h-3 w-20 mb-1 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
        />
        <Skeleton
          className={`h-[60px] w-full ${
            isDark ? "bg-gray-800" : "bg-gray-200"
          }`}
        />
      </div>

      <div className="flex gap-3">
        <Skeleton
          className={`h-7 w-7 rounded-full ${
            isDark ? "bg-gray-800" : "bg-gray-200"
          }`}
        />
        <div className="space-y-1 flex-1">
          <Skeleton
            className={`h-3 w-16 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          />
          <Skeleton
            className={`h-4 w-24 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          />
        </div>

        <Skeleton
          className={`h-7 w-7 rounded-full ${
            isDark ? "bg-gray-800" : "bg-gray-200"
          }`}
        />
        <div className="space-y-1 flex-1">
          <Skeleton
            className={`h-3 w-16 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          />
          <Skeleton
            className={`h-4 w-24 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          />
        </div>
      </div>

      <Skeleton
        className={`h-9 w-full rounded-full ${
          isDark ? "bg-gray-800" : "bg-gray-200"
        }`}
      />
    </div>
  );
};
