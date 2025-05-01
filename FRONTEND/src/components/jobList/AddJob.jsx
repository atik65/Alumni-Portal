"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import companyLogo from "/public/assets/logo.png";
import Link from "next/link";
import { Eye, Edit, Trash, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegClock,
} from "react-icons/fa";
import JobPostForm from "./JobForm";
import { useGetJobs } from "../../hooks/tanstack/useJobs";
import { Skeleton } from "../ui/skeleton";

function AddJob() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <button
          id="add-job"
          className="text-sm font-semibold bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white rounded h-10 flex gap-2 items-center justify-center hover:bg-[--light-bg] dark:hover:bg-[--light-bg] hover:text-[--secondary-text] dark:hover:text-[--base-text] duration-200 px-5"
        >
          <span>Add Job</span>
          <Plus size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] border-black bg-gray-100 dark:shadow-gray-900 bg-[--core-bg] dark:bg-[--sidebar-bg]">
        <DialogHeader>
          <DialogTitle>Add a Job</DialogTitle>
          <DialogDescription>Add a job to your job portal.</DialogDescription>
        </DialogHeader>

        <JobPostForm open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default AddJob;
