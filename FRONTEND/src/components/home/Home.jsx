"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import noPhoto from "../../../public/assets/noPhoto.png";
import userPhoto from "../../../public/assets/user.jpg";
import { Plus } from "lucide-react";

const Home = () => {
  return (
    <div className="container mx-auto xl:space-y-0 grid grid-cols-12 gap-6 py-8 px-4">
      {/* Left Side: Posts Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-12 xl:col-span-8 dark:bg-[--sidebar-bg-dark]  rounded-lg p-8 pt-0 "
      >
        {/* New Post Input */}
        <div className="mb-6">
          <textarea
            placeholder="What's on your mind?"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 dark:bg-[--sidebar-bg-dark] dark:text-white"
          ></textarea>
          <div className="flex justify-end w-full">
            <button className="text-sm mt-3  font-semibold bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white rounded h-10 flex gap-2 items-center justify-center hover:bg-[--light-bg] dark:hover:bg-[--light-bg-dark] hover:text-[--secondary-text] dark:hover:text-[--base-text-dark] duration-200 px-5 pe-3 uppercase">
              <span>Publish Now</span>
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Example Posts */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((post) => (
            <div className="p-5 border border-gray-200 bg-gray-50 dark:bg-[--sidebar-bg-dark] rounded-lg shadow-md">
              <div className="flex items-center gap-3">
                <Image
                  src={userPhoto}
                  alt="John Doe"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    John Doe
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Student
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mt-5 dark:text-gray-300">
                Excited to announce my new blog post on Next.js best practices!
                Learn how to optimize your Next.js code for performance and
                scalability.
              </p>
              <div className="mt-3 flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <span>👍 24</span>
                {/* <span>💬 1 Comment</span>
              <span>🔄 3 Shares</span> */}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Side: Events Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="col-span-12 xl:col-span-4 bg-white dark:bg-[--sidebar-bg-dark] p-6 rounded-lg shadow-lg"
      >
        <h2 className="font-semibold text-lg mb-6 text-gray-800 dark:text-white">
          Upcoming Events
        </h2>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 bg-gray-50 dark:bg-[--sidebar-bg-dark] rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Hackathon 2024
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join us for an exciting coding challenge!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              March 10th, 10:00 AM
            </p>
          </div>
          <div className="p-4 border border-gray-200 bg-gray-50 dark:bg-[--sidebar-bg-dark] rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Annual Tech Meetup
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Network with tech enthusiasts and professionals.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              April 25th, 5:00 PM
            </p>
          </div>
          <div className="p-4 border border-gray-200 bg-gray-50 dark:bg-[--sidebar-bg-dark] rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Design Thinking Workshop
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore innovative design solutions.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              May 15th, 2:00 PM
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
