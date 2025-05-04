import React from "react";
import { BarChart2, Users, Globe, Grid } from "lucide-react";
import Image from "next/image";

const HomeLeft = () => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
      {/* Image */}
      <div className="mb-4">
        <Image
          src="/assets/uap.jpeg"
          alt="Organization Building"
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Title and Deadline */}
      <div className="mb-2">
        <p className="text-gray-700 dark:text-gray-200 text-sm">
          Call for masters scholarships in Turkey, Deadline 31st July 2020
        </p>
      </div>

      {/* Read More Button */}
      <div className="mb-4">
        <button className="text-blue-500 dark:text-blue-400 font-semibold">
          Read More
        </button>
      </div>

      {/* Statistics Section */}
      <div className="flex flex-col gap-4">
        {/* New Members */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-gray-700 dark:text-gray-100 font-medium">
                New Members
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Joined 30 days ago
              </p>
            </div>
          </div>
          <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs font-medium">
            104
          </span>
        </div>

        {/* Active Members */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-gray-700 dark:text-gray-100 font-medium">
                Active members
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Seen this year
              </p>
            </div>
          </div>
          <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs font-medium">
            482
          </span>
        </div>

        {/* Latest Posts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-gray-700 dark:text-gray-100 font-medium">
                Latest Posts
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Posted this week
              </p>
            </div>
          </div>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium">
            74
          </span>
        </div>

        {/* All Profiles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-gray-700 dark:text-gray-100 font-medium">
                All profiles
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                All time
              </p>
            </div>
          </div>
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-1 rounded text-xs font-medium">
            309
          </span>
        </div>
      </div>

      {/* View Profiles Button */}
      {/* <div className="mt-4">
        <button className="bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-100 px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-300">
          View Profiles
        </button>
      </div> */}
    </div>
  );
};

export default HomeLeft;
