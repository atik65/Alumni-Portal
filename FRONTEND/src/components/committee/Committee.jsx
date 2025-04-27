"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import userAvatar from "../../../public/assets/user.jpg";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Plus } from "lucide-react";

// Parent Component to render multiple cards
const CommitteeCards = () => {
  const members = [
    { id: 1, name: "John Doe", role: "President" },
    { id: 2, name: "Jane Smith", role: "General Secretary" },
    { id: 3, name: "Sam Wilson", role: "Finance Manager" },
    { id: 4, name: "Anna Brown", role: "Technical Lead" },
    { id: 5, name: "David Lee", role: "Project Manager" },
    { id: 6, name: "Michael Johnson", role: "Event Coordinator" },
  ];

  // Split members into groups
  const leaders = members.slice(0, 2); // First two cards
  const committeeMembers = members.slice(2); // Remaining members

  return (
    <div className="container mx-auto p-8">
      {/* Leaders Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {leaders.map((leader, index) => (
          <CommitteeCard key={leader.id} index={index} member={leader} />
        ))}
      </div>

      {/* Committee Members Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {committeeMembers.map((member, index) => (
          <CommitteeCard key={member.id} index={index + 2} member={member} />
        ))}
      </div>
    </div>
  );
};

// Committee Card Component
const CommitteeCard = ({ index, member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full rounded-md shadow-lg dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white p-5"
    >
      <div className="flex items-top gap-5">
        <div className="w-20 shrink-0">
          <Image
            src={userAvatar}
            alt="committee member"
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>
        <div className="w-full">
          <h2 className="font-semibold">{member.name}</h2>
          <h3 className="font-semibold text-sm text-[--secondary-text]">
            {index < 2 ? "Leader" : "Committee Member"}
          </h3>
          <p className="text-sm opacity-70 italic">{member.role}</p>
        </div>
        <div className="w-3">
          <UserOptions />
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <p className="text-sm">
          Responsible for organizing and coordinating events, including team
          meetings, logistics, and collaboration with various stakeholders.
        </p>
      </div>

      {/* Social media icons */}
      <div className="flex items-center gap-5 mt-5 justify-center">
        <SocialButton href="/" icon={Facebook} />
        <SocialButton href="/" icon={Twitter} />
        <SocialButton href="/" icon={Linkedin} />
        <SocialButton href="/" icon={Instagram} />
      </div>

      {/* View profile */}
      <div className="mt-5">
        <Link
          href={`/portal/committee-list/${member.id}`}
          className="text-sm font-semibold bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] w-full rounded h-10 flex gap-2 items-center justify-center hover:bg-[--secondary-bg] dark:hover:bg-[--secondary-bg] hover:text-white duration-200"
        >
          <span>View Profile</span>
          <Eye size={19} />
        </Link>
      </div>
    </motion.div>
  );
};

// User Options Component
const UserOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ml-auto w-full justify-end outline-none border-none"
        >
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
          <Sparkles /> Message
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Plus /> Follow
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Social Button Component for reuse
const SocialButton = ({ href, icon: Icon }) => {
  return (
    <button className="h-8 w-8 grid place-items-center rounded-full bg-gray-200">
      <Link href={href} target="_blank">
        <Icon className="text-[--secondary-bg]" size={20} />
      </Link>
    </button>
  );
};

export default CommitteeCards;
