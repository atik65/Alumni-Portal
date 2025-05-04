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
          className="relative overflow-hidden group text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full h-10 flex gap-2 items-center justify-center px-5 disabled:cursor-not-allowed disabled:opacity-50"
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
