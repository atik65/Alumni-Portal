// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Eye, Edit, Trash } from "lucide-react";

// import {
//   FaBuilding,
//   FaMapMarkerAlt,
//   FaDollarSign,
//   FaRegClock,
// } from "react-icons/fa";
// ;

// const JobPost = ({ job, index }) => {
//   // {"json":{"id":12,"job_title":"d","company":"d","location":"d","description":"d","posted_date":"2024-12-02T14:00:34.966570+06:00","jobType":"Full-Time","deadline":"2024-12-30T00:00:00+06:00","experience":0,"salary":"10.00","email":"user@gmail.com"}}

//   const {
//     job_title,
//     company,
//     location,
//     description,
//     posted_date,
//     jobType,
//     deadline,
//     experience,
//     salary,
//     email,
//   } = job;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 100 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       className="w-full rounded-lg shadow-lg dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl duration-300"
//     >
//       {/* Job Title and Type */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-xl font-semibold">{job_title}</h2>
//           <p className="text-sm italic text-[--secondary-bg]">{jobType}</p>
//         </div>
//         <div className="text-sm text-gray-500">
//           Posted: {new Date(posted_date).toLocaleDateString()}
//         </div>
//       </div>

//       {/* Company and Location */}
//       <div className="flex items-center gap-5 mt-3 text-sm text-gray-700 dark:text-gray-400">
//         <div className="flex items-center gap-2">
//           <FaBuilding className="text-[--secondary-bg]" />
//           <p>{company || "N/A"}</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <FaMapMarkerAlt className="text-[--secondary-bg]" />
//           <p>{location || "Remote"}</p>
//         </div>
//       </div>

//       {/* Job Description */}
//       <div className="mt-4">
//         <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
//           {description.length > 100
//             ? `${description.slice(0, 100)}...`
//             : description}
//         </p>
//       </div>

//       {/* Job Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-sm text-gray-800 dark:text-gray-300">
//         <div className="flex items-center gap-2">
//           <span className="font-semibold">Experience:</span>
//           <p>{experience} years</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <FaDollarSign className="text-[--secondary-bg]" />
//           <p>{salary} BDT</p>
//         </div>
//       </div>

//       {/* Contact Email */}
//       {email && (
//         <div className="grid grid-cols-2 gap-3">
//           <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
//             <span className="font-semibold">Contact:</span>{" "}
//             <a
//               href={`mailto:${email}`}
//               className="text-[--secondary-bg] underline"
//             >
//               {email}
//             </a>
//           </div>

//           <div className="flex items-center gap-2">
//             <FaRegClock className="text-[--secondary-bg]" />
//             <p>Deadline: {new Date(deadline).toLocaleDateString()}</p>
//           </div>
//         </div>
//       )}

//       {/* View Details Button */}
//       <div className="mt-5">
//         <Link
//           href={`/portal/job-list/${job.id}`}
//           // onClick={() =>
//           //   enqueueSnackbar("Job details will be available soon!", {
//           //     variant: "default",
//           //   })
//           // }
//           className="text-sm font-semibold bg-[--secondary-bg] dark:bg-[--secondary-bg] text-[--base-text-dark] hover:text-[--base-text] hover:bg-[--light-bg]  dark:text-[--base-text-dark] w-full rounded-md h-10 flex gap-2 items-center justify-center  dark:hover:bg-[--light-bg] dark:hover:text-[--base-text] duration-200"
//         >
//           <span>View Details</span>
//           <Eye size={20} />
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// export default JobPost;

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye } from "lucide-react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegClock,
} from "react-icons/fa";

const JobPost = ({ job, index }) => {
  const {
    job_title,
    company,
    location,
    description,
    posted_date,
    jobType,
    deadline,
    experience,
    salary,
    email,
  } = job;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="w-full rounded-lg overflow-hidden bg-[--core-bg] dark:bg-black/20 border border-gray-100 dark:border-gray-800/50 hover:border-[--secondary-bg]/30 shadow-sm hover:shadow-md duration-300 group"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-[--base-text] dark:text-white">
            {job_title}
          </h2>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{new Date(posted_date).toLocaleDateString()}</span>
            <span className="inline-block px-2 py-0.5 rounded-full bg-[--secondary-bg]/10 text-[--secondary-bg] border border-[--secondary-bg]/20">
              {jobType}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Company and Location */}
        <div className="flex flex-wrap gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[--secondary-bg]/10">
              <FaBuilding className="text-[--secondary-bg] text-xs" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Company
              </p>
              <p className="text-sm font-medium text-[--base-text] dark:text-white">
                {company || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[--secondary-bg]/10">
              <FaMapMarkerAlt className="text-[--secondary-bg] text-xs" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Location
              </p>
              <p className="text-sm font-medium text-[--base-text] dark:text-white">
                {location || "Remote"}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Description
          </p>
          <div className="h-[60px] overflow-hidden">
            <p className="text-sm text-[--base-text] dark:text-gray-200 leading-relaxed">
              {description.length > 80 ? (
                <>
                  {description.slice(0, 80)}
                  <span className="text-[--secondary-bg]">...</span>
                </>
              ) : (
                description
              )}
            </p>
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[--secondary-bg]/10">
              <span className="text-[--secondary-bg] text-xs font-medium">
                {experience}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Experience
              </p>
              <p className="text-sm font-medium text-[--base-text] dark:text-white">
                {experience} years
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[--secondary-bg]/10">
              <FaDollarSign className="text-[--secondary-bg] text-xs" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Salary</p>
              <p className="text-sm font-medium text-[--base-text] dark:text-white">
                {salary} BDT
              </p>
            </div>
          </div>
        </div>

        {/* Contact and Deadline */}
        {email && (
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Contact
              </p>
              <a
                href={`mailto:${email}`}
                className="text-sm font-medium text-[--secondary-bg] hover:underline"
              >
                {email}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[--secondary-bg]/10">
                <FaRegClock className="text-[--secondary-bg] text-xs" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Deadline
                </p>
                <p className="text-sm font-medium text-[--base-text] dark:text-white">
                  {new Date(deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Button */}
        <Link href={`/portal/job-list/${job.id}`}>
          <motion.button
            className="relative overflow-hidden group text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full h-9 flex gap-2 items-center justify-center px-4 w-full"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="relative flex items-center gap-2">
              <span>View Details</span>
              <Eye
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default JobPost;
