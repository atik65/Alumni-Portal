"use client";
import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useGetJob } from "../../hooks/tanstack/useJobs";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegClock,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";

const JobDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetJob(id);

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  const job = data?.result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-[--core-bg] dark:bg-black rounded-lg shadow-lg dark:shadow-gray-900 border border-gray-200 dark:border-gray-700"
    >
      {/* Header Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-3xl font-bold text-[--base-text] dark:text-white mb-2">
          {job.job_title}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <FaBuilding className="text-[--secondary-bg]" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[--secondary-bg]" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-[--secondary-bg]" />
            <span>{job.jobType}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 space-y-6">
        {/* Job Description */}
        <div>
          <h2 className="text-xl font-semibold text-[--base-text] dark:text-white mb-3">
            Job Description
          </h2>
          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[--base-text] dark:text-white">
              Job Details
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaDollarSign className="text-[--secondary-bg]" />
                <div>
                  <p className="font-medium text-[--base-text] dark:text-white">Salary</p>
                  <p className="text-gray-600 dark:text-gray-400">{job.salary} BDT</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaBriefcase className="text-[--secondary-bg]" />
                <div>
                  <p className="font-medium text-[--base-text] dark:text-white">Experience</p>
                  <p className="text-gray-600 dark:text-gray-400">{job.experience} years</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[--base-text] dark:text-white">
              Important Dates
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaRegClock className="text-[--secondary-bg]" />
                <div>
                  <p className="font-medium text-[--base-text] dark:text-white">Posted Date</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(job.posted_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaRegClock className="text-[--secondary-bg]" />
                <div>
                  <p className="font-medium text-[--base-text] dark:text-white">Application Deadline</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(job.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-[--base-text] dark:text-white mb-4">
            Contact Information
          </h2>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-[--secondary-bg]" />
            <a
              href={`mailto:${job.email}`}
              className="text-[--secondary-bg] hover:underline"
            >
              {job.email}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const JobDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[--core-bg] dark:bg-black rounded-lg shadow-lg">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-40 w-full mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
