"use client";

import React from "react";
import userAvatar from "../../../public/assets/user.jpg";
import Image from "next/image";
import { Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";

const AlumniProfile = () => {
  return (
    <div className="container mx-auto  xl:space-y-0  grid grid-cols-12 gap-5">
      {/* left side content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-12 xl:col-span-3 bg-[--core-bg] dark:bg-[--core-bg-dark] p-5 rounded-lg xl:h-[435px] xl:sticky top-0"
      >
        <ProfileIntro />
      </motion.div>

      {/* right side content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="col-span-12 xl:col-span-9 bg-[--core-bg] dark:bg-[--core-bg-dark] p-5 rounded-lg"
      >
        <ProfileContent />
      </motion.div>
    </div>
  );
};

export default AlumniProfile;

const ProfileIntro = () => {
  return (
    <div>
      {/* image and name */}
      <div className="grid grid-cols-12 gap-5 items-center">
        <div className="col-span-4">
          <Image
            src={userAvatar}
            alt="user"
            className=" h-20 w-20 rounded-full object-cover"
          />
        </div>
        <div className="col-span-8">
          <h2 className="font-semibold">Md. Atikul Islam Atik</h2>
          {/* <h2 className="font-semibold">Atik</h2> */}
          <p className="text-sm opacity-70 italic">Software Engineer</p>
        </div>
      </div>

      {/* user short info */}
      <div className="mt-5 space-y-2">
        {/* join date */}
        <div className="flex w-full">
          <p className="text-sm opacity-60 w-full">Joined:</p>
          <p className="font-bold text-sm text-gray-600 w-full flex justify-end dark:text-gray-300">
            3 Weeks ago
          </p>
        </div>

        {/* last seen */}
        <div className="flex w-full">
          <p className="text-sm opacity-60 w-full">Last Seen:</p>
          <p className="font-bold text-sm text-gray-600 w-full flex justify-end dark:text-gray-300">
            Yesterday
          </p>
        </div>

        {/* profile views */}
        <div className="flex w-full">
          <p className="text-sm opacity-60 w-full">Profile Views:</p>
          <p className="font-bold text-sm text-gray-600 w-full flex justify-end dark:text-gray-300">
            45
          </p>
        </div>

        {/* followers */}
        <div className="flex w-full">
          <p className="text-sm opacity-60 w-full">Followers:</p>
          <p className="font-bold text-sm text-gray-600 w-full flex justify-end dark:text-gray-300">
            109
          </p>
        </div>

        {/* followings */}
        <div className="flex w-full">
          <p className="text-sm opacity-60 w-full">Following:</p>
          <p className="font-bold text-sm text-gray-600 w-full flex justify-end dark:text-gray-300">
            16
          </p>
        </div>
      </div>

      {/* short description */}
      <div>
        <p className="text-sm mt-5 text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          qui totam deleniti optio recusandae explicabo laboriosam hic fuga vel?
        </p>

        {/* send message */}

        <div className="mt-5">
          <button
            id="message"
            onClick={() => {
              enqueueSnackbar("Message is Coming Soon", {
                variant: "default",
              });
            }}
            //   href={"/portal/alumni-list/1"}
            className=" text-sm font-semibold hover:bg-[--light-bg] dark:hover:bg-[--light-bg-dark] hover:text-[--secondary-text] hover:dark:text-[--base-text-dark] w-full rounded h-10 flex gap-2 items-center justify-center bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white duration-200" 
          >
            <span className="">Message</span>

            <Mail size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileContent = () => {
  const data = [
    {
      title: "Basic Information",
      infos: [
        { key: "Name", value: "Md. Atikul Islam Atik" },
        { key: "Gender", value: "Male" },
        { key: "Nationality", value: "Bangladeshi" },
        { key: "Date of Birth", value: "01/01/2000" },
        { key: "Religion", value: "Islam" },
      ],
    },

    {
      title: "Programs Completed at UAP",
      infos: [
        { key: "2021", value: "Bachelor of Science in CSE" },
        { key: "2022", value: "Master of Science in CSE" },
      ],
    },

    {
      title: "Contact Information",
      infos: [
        { key: "Current Address", value: "Dhaka, Bangladesh" },
        { key: "Email Address", value: "user@example.com" },
        { key: "Phone Number", value: "01700000000" },
        {
          key: "Website",
          value: "N/A",
        },
        {
          key: "Facebook",
          value: "Atik Hasan",
          link: "/",
        },
        {
          key: "Twitter",
          value: "Atik Hasan",
          link: "/",
        },
        {
          key: "Linkedin",
          value: "Atik Hasan",
          link: "/",
        },
      ],
    },
  ];

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg sm:text-xl">
        Alumni&apos;s Profile{" "}
      </h2>
      <p className="text-sm text-gray-600">
        This is all what we know about this Alumni
      </p>

      <div className="mt-5 ">
        {data?.map((info) => {
          return (
            <div key={info.title} className="mb-12">
              <h3 className="font-semibold text-lg mb-3">{info.title}</h3>

              <div className="space-y-2">
                {info?.infos?.map((item, index) => (
                  <div className="" key={index}>
                    <div className="flex flex-row gap-5">
                      <p className="w-full lg:w-1/3  text-gray-600 dark:text-gray-200 text-sm sm:text-base">
                        {item.key}
                      </p>

                      {item?.link && (
                        <Link
                          className="w-full sm:w-full "
                          target="_blank"
                          href={item?.link}
                        >
                          {/* <a target="_blank" rel="noreferrer"> */}
                          <p className="w-full sm:w-1/2 flex justify-start  text-gray-800 dark:text-gray-200 text-sm sm:text-base whitespace-nowrap underline hover:font-bold duration-150">
                            {item.value}
                          </p>
                          {/* </a> */}
                        </Link>
                      )}

                      {!item?.link && (
                        <p className="w-full sm:w-full    text-gray-800 dark:text-gray-200 text-sm sm:text-base ">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
