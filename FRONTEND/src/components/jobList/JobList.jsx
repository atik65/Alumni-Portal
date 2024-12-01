"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import companyLogo from "/public/assets/logo.png";
import Link from "next/link";
import { Eye, Facebook, Linkedin, Twitter } from "lucide-react";

const JobList = () => {
  return (
    <div className="container max-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-hidden">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
          <JobCard key={i} index={index} />
        ))}

        {/* <AlumniCard /> */}
      </div>
    </div>
  );
};

export default JobList;

const JobCard = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full rounded-md shadow-lg dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white p-5"
    >
      <div className="flex items-start gap-5">
        {/* Company Logo */}
        <div className="w-20 shrink-0">
          <Image
            src={companyLogo}
            alt="company logo"
            className="h-20 w-20 rounded-md object-cover"
          />
        </div>
        <div className="w-full">
          {/* Job Details */}
          <h2 className="font-semibold text-lg">Software Engineer</h2>
          <p className="text-sm opacity-80 italic">Google</p>
          <p className="text-sm opacity-70">Mountain View, CA</p>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          voluptate quae, autem perferendis incidunt libero ducimus.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-5 mt-5 justify-center">
        {/* Apply Now */}
        <button className="h-10 px-5 grid place-items-center rounded-full bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] font-semibold hover:bg-[--secondary-bg] hover:text-white dark:hover:bg-[--secondary-bg] duration-200">
          Apply Now
        </button>

        {/* Save Job */}
        <button className="h-10 px-5 grid place-items-center rounded-full bg-gray-200 dark:bg-gray-800 text-[--secondary-bg] hover:bg-[--secondary-bg] hover:text-white duration-200">
          Save Job
        </button>
      </div>

      {/* Share Job */}
      <div className="flex items-center gap-5 mt-5 justify-center">
        {/* Facebook */}
        <button className="h-8 w-8 grid place-items-center rounded-full bg-gray-200">
          <Link href="/" target="_blank">
            <Facebook className="text-[--secondary-bg]" size={20} />
          </Link>
        </button>
        {/* Twitter */}
        <button className="h-8 w-8 grid place-items-center rounded-full bg-gray-200">
          <Link href="/" target="_blank">
            <Twitter className="text-[--secondary-bg]" size={20} />
          </Link>
        </button>
        {/* LinkedIn */}
        <button className="h-8 w-8 grid place-items-center rounded-full bg-gray-200">
          <Link href="/" target="_blank">
            <Linkedin className="text-[--secondary-bg]" size={20} />
          </Link>
        </button>
      </div>

      {/* View Job Details */}
      <div className="mt-5">
        <Link
          href={"/portal/jobs/1"}
          className="text-sm font-semibold bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] w-full rounded h-10 flex gap-2 items-center justify-center hover:bg-[--secondary-bg] dark:hover:bg-[--secondary-bg] hover:text-white duration-200"
        >
          <span>View Details</span>
          <Eye size={19} />
        </Link>
      </div>
    </motion.div>
  );
};
