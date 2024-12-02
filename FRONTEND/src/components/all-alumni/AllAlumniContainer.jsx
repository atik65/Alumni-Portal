"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronsUpDown,
  EllipsisVertical,
  Eye,
  Facebook,
  Instagram,
  Linkedin,
  Plus,
  Sparkles,
  Twitter,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import userAvatar from "../../../public/assets/user.jpg";
import Image from "next/image";
import Pagination from "../shared/Pagination";

const AllAlumniContainer = () => {
  return (
    <div className="container max-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-hidden">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
          <AlumniCard key={i} index={index} />
        ))}

        {/* <AlumniCard /> */}
      </div>

      {/* pagination */}
      <div className="mt-5">
        <Pagination
          offset={0}
          setOffSet={() => { }}
          count={20}
          itemsPerPage={8}
        />
      </div>
    </div>
  );
};

export default AllAlumniContainer;

const AlumniCard = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full rounded-md shadow-lg dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-[--sidebar-bg-dark] dark:text-white  p-5"
    >
      <div className="flex items-top gap-5 ">
        <div className="w-20 shrink-0">
          <Image
            src={userAvatar}
            alt="user"
            className=" h-20 w-20 rounded-full object-cover"
          />
        </div>
        <div className="w-full">
          <h2 className="font-semibold">Md. Atikul Islam</h2>
          <h2 className="font-semibold">Atik</h2>

          <p className="text-sm opacity-70 italic">Student</p>
        </div>

        {/* user options */}
        <div className="w-3 ">
          <UserOptions />
        </div>
      </div>

      {/* description */}

      <div className="mt-5">
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae magni
          cupiditate tenetur voluptas ipsa numquam odit eos consequuntur
        </p>
      </div>

      {/* social media icons */}

      <div className="flex items-center gap-5 mt-5 justify-center ">
        {/* facebook */}
        <button
          className="h-8 w-8 grid place-items-center rounded-full bg-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 transition-colors duration-200"
          target="_blank"
        >
          <Link href="/" target="_blank">
            <Facebook className="text-[--secondary-bg]" size={20} />
          </Link>
        </button>

        {/* twitter */}
        <button
          className="h-8 w-8 grid place-items-center rounded-full bg-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 transition-colors duration-200"
          target="_blank"
        >
          <Link href="/" target="_blank">
            <Twitter className="text-[--secondary-bg]" size={20} />
          </Link>
        </button>

        {/* linkedin */}
        <button
          className="h-8 w-8 grid place-items-center rounded-full bg-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 transition-colors duration-200"
          target="_blank"
        >
          <Link href="/" target="_blank">
            <Linkedin className="text-[--secondary-bg]" size={20} />
          </Link>
        </button>

        {/* instagram */}
        <button
          className="h-8 w-8 grid place-items-center rounded-full bg-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 transition-colors duration-200"
          target="_blank"
        >
          <Link href="/" target="_blank">
            <Instagram className="text-[--secondary-bg]" size={20} />
          </Link>
        </button>
      </div>

      {/* view profile */}
      <div className="mt-5">
        <Link
          href={"/portal/alumni-list/1"}
          className=" text-sm font-semibold bg-[--secondary-bg] dark:bg-[--secondary-bg] text-[--base-text-dark] dark:text-[--base-text-dark] w-full rounded h-10 flex gap-2 items-center justify-center hover:bg-[--light-bg] dark:hover:bg-[--light-bg] hover:text-[--secondary-text] dark:hover:text-[--secondary-text] duration-200"
        >
          <span className="">View Profile</span>

          <Eye size={19} />
        </Link>
      </div>
    </motion.div>
  );
};

// user options

const UserOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ml-auto w-full justify-end outline-none border-none"
        >
          {/* <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">test</span>
              <span className="truncate text-xs">test test</span>
            </div> */}
          <EllipsisVertical className="ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Options
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <Sparkles />
          Message
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Plus />
          Follow
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
