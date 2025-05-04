"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useGetJob } from "../../hooks/tanstack/useJobs";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegClock,
  FaBriefcase,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const JobDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetJob(id);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={`min-h-screen w-full p-4 md:p-8 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50"
      }`}
    >
      <AnimatePresence>
        {isLoading ? (
          <JobDetailsSkeleton isDark={isDark} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card isDark={isDark}>
              {/* Header with animated banner */}
              <div
                className={`h-24 relative ${
                  isDark
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600"
                    : "bg-gradient-to-r from-sky-400 to-indigo-400"
                }`}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              <div className="px-6 pb-6">
                {/* Job Title and Badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative -mt-10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h1
                      className={`text-2xl font-bold ${
                        isDark
                          ? "bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                          : "bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700"
                      }`}
                    >
                      {data?.result.job_title}
                    </h1>
                    <div className="flex flex-wrap gap-2 items-center mt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? "bg-indigo-900/50 text-indigo-200 border border-indigo-800/50"
                            : "bg-indigo-100 text-indigo-800 border border-indigo-200/50"
                        }`}
                      >
                        {data?.result.jobType}
                      </span>
                      <p
                        className={
                          isDark
                            ? "text-gray-400 text-sm"
                            : "text-gray-600 text-sm"
                        }
                      >
                        Posted on{" "}
                        {new Date(
                          data?.result.posted_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Company and Location */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4 mb-6"
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                      isDark
                        ? "bg-black/30 border border-white/10"
                        : "bg-white/60 border border-black/5 shadow-sm"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDark
                          ? "bg-gradient-to-br from-purple-500/30 to-purple-500/10"
                          : "bg-gradient-to-br from-blue-400/30 to-blue-400/10"
                      }`}
                    >
                      <FaBuilding className="text-[--secondary-bg]" />
                    </div>
                    <div>
                      <p
                        className={
                          isDark
                            ? "text-gray-500 text-xs"
                            : "text-gray-600 text-xs"
                        }
                      >
                        Company
                      </p>
                      <p
                        className={
                          isDark
                            ? "text-white font-medium"
                            : "text-gray-900 font-medium"
                        }
                      >
                        {data?.result.company}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                      isDark
                        ? "bg-black/30 border border-white/10"
                        : "bg-white/60 border border-black/5 shadow-sm"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDark
                          ? "bg-gradient-to-br from-purple-500/30 to-purple-500/10"
                          : "bg-gradient-to-br from-blue-400/30 to-blue-400/10"
                      }`}
                    >
                      <FaMapMarkerAlt className="text-[--secondary-bg]" />
                    </div>
                    <div>
                      <p
                        className={
                          isDark
                            ? "text-gray-500 text-xs"
                            : "text-gray-600 text-xs"
                        }
                      >
                        Location
                      </p>
                      <p
                        className={
                          isDark
                            ? "text-white font-medium"
                            : "text-gray-900 font-medium"
                        }
                      >
                        {data?.result.location}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column - Description */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2"
                  >
                    <InfoSection title="Job Description" isDark={isDark}>
                      <p
                        className={
                          isDark
                            ? "text-gray-300 leading-relaxed whitespace-pre-wrap"
                            : "text-gray-700 leading-relaxed whitespace-pre-wrap"
                        }
                      >
                        {data?.result.description}
                      </p>
                    </InfoSection>
                  </motion.div>

                  {/* Right Column - Details */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Job Details Card */}
                    <Card
                      className={
                        isDark
                          ? "bg-black/30 border-white/5 overflow-hidden"
                          : "bg-white/60 border-black/5 shadow-md overflow-hidden"
                      }
                      isDark={isDark}
                      noPadding
                    >
                      <div className="p-4 space-y-4">
                        <h3
                          className={`text-lg font-semibold flex items-center gap-2 ${
                            isDark ? "text-white/90" : "text-gray-800"
                          }`}
                        >
                          <span
                            className={`h-5 w-1 rounded-full ${
                              isDark
                                ? "bg-gradient-to-b from-purple-500 to-blue-500"
                                : "bg-gradient-to-b from-blue-400 to-indigo-500"
                            }`}
                          ></span>
                          Job Details
                        </h3>

                        <div className="space-y-3">
                          <DetailItem
                            icon={<FaDollarSign size={16} />}
                            label="Salary"
                            value={`${data?.result.salary} BDT`}
                            isDark={isDark}
                          />
                          <DetailItem
                            icon={<FaBriefcase size={16} />}
                            label="Experience"
                            value={`${data?.result.experience} years`}
                            isDark={isDark}
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Important Dates Card */}
                    <Card
                      className={
                        isDark
                          ? "bg-black/30 border-white/5 overflow-hidden"
                          : "bg-white/60 border-black/5 shadow-md overflow-hidden"
                      }
                      isDark={isDark}
                      noPadding
                    >
                      <div className="p-4 space-y-4">
                        <h3
                          className={`text-lg font-semibold flex items-center gap-2 ${
                            isDark ? "text-white/90" : "text-gray-800"
                          }`}
                        >
                          <span
                            className={`h-5 w-1 rounded-full ${
                              isDark
                                ? "bg-gradient-to-b from-purple-500 to-blue-500"
                                : "bg-gradient-to-b from-blue-400 to-indigo-500"
                            }`}
                          ></span>
                          Important Dates
                        </h3>

                        <div className="space-y-3">
                          <DetailItem
                            icon={<FaRegClock size={16} />}
                            label="Posted Date"
                            value={new Date(
                              data?.result.posted_date
                            ).toLocaleDateString()}
                            isDark={isDark}
                          />
                          <DetailItem
                            icon={<FaRegClock size={16} />}
                            label="Application Deadline"
                            value={new Date(
                              data?.result.deadline
                            ).toLocaleDateString()}
                            isDark={isDark}
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Contact Card */}
                    <Card
                      className={
                        isDark
                          ? "bg-black/30 border-white/5 overflow-hidden"
                          : "bg-white/60 border-black/5 shadow-md overflow-hidden"
                      }
                      isDark={isDark}
                      noPadding
                    >
                      <div className="p-4 space-y-4">
                        <h3
                          className={`text-lg font-semibold flex items-center gap-2 ${
                            isDark ? "text-white/90" : "text-gray-800"
                          }`}
                        >
                          <span
                            className={`h-5 w-1 rounded-full ${
                              isDark
                                ? "bg-gradient-to-b from-purple-500 to-blue-500"
                                : "bg-gradient-to-b from-blue-400 to-indigo-500"
                            }`}
                          ></span>
                          Contact
                        </h3>

                        <div className="space-y-3">
                          <DetailItem
                            icon={<FaEnvelope size={16} />}
                            label="Email"
                            isDark={isDark}
                            isLink
                            href={`mailto:${data?.result.email}`}
                            value={data?.result.email}
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Apply Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/portal/job-list" className="flex-1">
                    <motion.button
                      className={`relative overflow-hidden group text-sm font-medium w-full rounded-full h-10 flex gap-2 items-center justify-center px-5 ${
                        isDark
                          ? "bg-black/30 border border-white/10 text-white hover:bg-white/10"
                          : "bg-white/50 border border-black/10 text-gray-800 hover:bg-black/5"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-2">
                        <FaArrowLeft size={14} />
                        <span>Back to Job List</span>
                      </span>
                    </motion.button>
                  </Link>

                  {/* <motion.button
                    className="relative overflow-hidden group text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full h-10 flex gap-2 items-center justify-center px-5 flex-1"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="relative flex items-center gap-2">
                      <span>Apply Now</span>
                      <FaEnvelope
                        size={14}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </span>
                  </motion.button> */}
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Card Component
const Card = ({ children, className = "", isDark, noPadding = false }) => (
  <div
    className={`rounded-xl overflow-hidden ${
      isDark
        ? "backdrop-blur-md bg-black/20 border border-white/10"
        : "backdrop-blur-md bg-white/70 border border-black/5 shadow-xl"
    } ${className}`}
  >
    {children}
  </div>
);

// Info Section Component
const InfoSection = ({ title, children, isDark }) => (
  <div className="space-y-3 mb-6">
    <h3
      className={`text-lg font-semibold flex items-center gap-2 ${
        isDark ? "text-white/90" : "text-gray-800"
      }`}
    >
      <span
        className={`h-5 w-1 rounded-full ${
          isDark
            ? "bg-gradient-to-b from-purple-500 to-blue-500"
            : "bg-gradient-to-b from-blue-400 to-indigo-500"
        }`}
      ></span>
      {title}
    </h3>
    <div className="pl-3">{children}</div>
  </div>
);

// Detail Item Component
const DetailItem = ({
  icon,
  label,
  value,
  isDark,
  isLink = false,
  href = "",
}) => (
  <div className="flex items-start gap-3 text-sm">
    <div
      className={`${
        isDark ? "text-[--secondary-bg] mt-0.5" : "text-[--secondary-bg] mt-0.5"
      }`}
    >
      {icon}
    </div>
    <div>
      <p className={isDark ? "text-gray-500" : "text-gray-600"}>{label}</p>
      {isLink ? (
        <a
          href={href}
          className={`font-medium ${
            isDark
              ? "text-[--secondary-bg] hover:underline"
              : "text-[--secondary-bg] hover:underline"
          }`}
        >
          {value}
        </a>
      ) : (
        <p
          className={
            isDark ? "text-gray-300 font-medium" : "text-gray-800 font-medium"
          }
        >
          {value}
        </p>
      )}
    </div>
  </div>
);

// Loading Skeleton
const JobDetailsSkeleton = ({ isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div
        className={`rounded-xl overflow-hidden ${
          isDark
            ? "backdrop-blur-md bg-black/20 border border-white/10"
            : "backdrop-blur-md bg-white/70 border border-black/5 shadow-xl"
        }`}
      >
        <div
          className={`h-24 relative ${
            isDark
              ? "bg-gradient-to-r from-violet-600/50 to-indigo-600/50"
              : "bg-gradient-to-r from-sky-400/50 to-indigo-400/50"
          }`}
        />

        <div className="px-6 pb-6 relative">
          <div className="relative -mt-10 mb-6">
            <Skeleton
              className={`h-8 w-64 mb-2 ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            />
            <Skeleton
              className={`h-5 w-40 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
            />
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <Skeleton
              className={`h-16 w-48 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            />
            <Skeleton
              className={`h-16 w-48 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <Skeleton
                className={`h-7 w-40 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
              />
              <Skeleton
                className={`h-4 w-full ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}
              />
              <Skeleton
                className={`h-4 w-full ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}
              />
              <Skeleton
                className={`h-4 w-full ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}
              />
              <Skeleton
                className={`h-4 w-3/4 ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}
              />
            </div>

            <div className="space-y-6">
              <div
                className={`p-4 rounded-xl ${
                  isDark
                    ? "bg-black/30 border-white/5"
                    : "bg-white/60 border-black/5 shadow-md"
                }`}
              >
                <Skeleton
                  className={`h-7 w-32 mb-4 ${
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Skeleton
                      className={`h-5 w-5 ${
                        isDark ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    />
                    <div className="space-y-1 flex-1">
                      <Skeleton
                        className={`h-4 w-20 ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                      <Skeleton
                        className={`h-4 w-full ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Skeleton
                      className={`h-5 w-5 ${
                        isDark ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    />
                    <div className="space-y-1 flex-1">
                      <Skeleton
                        className={`h-4 w-20 ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                      <Skeleton
                        className={`h-4 w-full ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl ${
                  isDark
                    ? "bg-black/30 border-white/5"
                    : "bg-white/60 border-black/5 shadow-md"
                }`}
              >
                <Skeleton
                  className={`h-7 w-40 mb-4 ${
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Skeleton
                      className={`h-5 w-5 ${
                        isDark ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    />
                    <div className="space-y-1 flex-1">
                      <Skeleton
                        className={`h-4 w-20 ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                      <Skeleton
                        className={`h-4 w-full ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Skeleton
              className={`h-10 w-full rounded-full ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            />
            <Skeleton
              className={`h-10 w-full rounded-full ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;
