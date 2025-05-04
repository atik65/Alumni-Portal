"use client";

import React, { useState } from "react";
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
} from "../../components/ui/dropdown-menu";

import userAvatar from "../../../public/assets/user.jpg";
import Image from "next/image";
import Pagination from "../shared/Pagination";
import { useGetRoles, useGetUsers } from "../../hooks/tanstack/useAlumni";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";

const AllStudentsContainer = () => {
  const [offset, setOffSet] = useState(0);
  const limit = 10;

  const { data: users, isLoading } = useGetUsers({
    limit,
    offset,
    role: 1, // student
  });
  const { data: roles, isLoading: isRolesLoading } = useGetRoles();

  return (
    <section className="min-h-screen rounded-xl pt-10 bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E] p-6">
      <div className="container max-auto">
        {/* <div className="mb-10">
          <div className="flex gap-2 items-center justify-between">
            <h1 className="text-3xl font-bold mb-4 whitespace-nowrap">
              All Alumni and Students
            </h1>
          </div>
          <p className="text-md opacity-80 text-sm italic">
            Here you can see all alumni of UAP.
          </p>
        </div> */}

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold text-white md:text-4xl">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Our Sweet Students
            </span>
          </h1>
          <p className="mt-2 text-gray-400">
            Here you can see all students of UAP.
          </p>
        </div>

        {isLoading && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-5 gap-y-10 overflow-hidden">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => (
                <AlumniCardSkeleton key={i} index={index} />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 overflow-hidden ">
          {users?.results?.map((user, index) => (
            <StudentCard key={user?.id} index={index} user={user} />
          ))}

          {/* <AlumniCard /> */}
        </div>

        {/* pagination */}
        <div className="mt-5">
          <Pagination
            offset={offset}
            setOffSet={setOffSet}
            count={users?.count || 0}
            itemsPerPage={limit}
          />
        </div>
      </div>
    </section>
  );
};

export default AllStudentsContainer;

const StudentCard = ({ index, user }) => {
  const { data: roles, isLoading: isRolesLoading } = useGetRoles();

  // Function to get initials from name
  const getInitials = (firstName = "", lastName = "") => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full rounded-md shadow-lg dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-[--sidebar-bg-dark] dark:text-white  p-5"
    >
      <div className="flex items-top gap-5 ">
        <div className="w-20 shrink-0">
          {/* <Image
            src={userAvatar}
            alt="user"
            className=" h-20 w-20 rounded-full object-cover"
          /> */}

          <Avatar
            className={`h-20 w-20 relative ${
              isDark ? "border-4 border-black/20" : "border-4 border-white/80"
            }`}
          >
            <AvatarImage
              className="w-full object-cover object-top"
              src={user?.avatar || "/placeholder.svg"}
              alt={`${user?.first_name} ${user?.last_name}`}
            />
            <AvatarFallback
              className={`text-white text-2xl ${
                isDark
                  ? "bg-gradient-to-br from-violet-600 to-indigo-600"
                  : "bg-gradient-to-br from-blue-500 to-indigo-500"
              }`}
            >
              {getInitials(user?.first_name, user?.last_name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full">
          <h2 className="font-semibold">{user?.first_name}</h2>
          <h2 className="font-semibold">{user?.last_name}</h2>

          <p className="text-sm opacity-70 italic">{user?.role?.role_name}</p>
        </div>

        {/* user options */}
        <div className="w-3 ">
          <UserOptions user={user} index={index} />
        </div>
      </div>

      {/* description */}

      <div className="mt-5">
        <p className="text-sm h-12">
          {/* only show 80 characters */}
          {user?.description?.length > 80
            ? `${user?.description?.slice(0, 80)}...`
            : user?.description || "No description available"}
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
          id={index + "view-profile"}
          // href={"/portal/alumni-list/1"}
          href={`/portal/alumni-list/${user?.user?.id}`}
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

const UserOptions = ({ user, index }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          id={index + "options"}
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

        <Link
          target="_blank"
          className="cursor-pointer"
          href={`mailto:${user?.email}`}
        >
          <DropdownMenuItem id={index + "email"}>
            <Sparkles />
            Email
          </DropdownMenuItem>
        </Link>

        {/* <DropdownMenuItem>
          <Plus />
          Follow
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const AlumniCardSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="flex gap-5">
        <Skeleton className="h-16 w-16 flex-shrink-0 rounded-full" />
        <div className="w-full space-y-2">
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Skeleton className="h-8 rounded-md" />
      </div>

      <div className="flex justify-center gap-3">
        <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />
        <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />
        <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />
        <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-5">
        <Skeleton className="h-8 rounded-md" />
      </div>
    </div>
  );
};
