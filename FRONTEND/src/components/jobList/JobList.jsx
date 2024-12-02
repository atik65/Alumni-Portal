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
} from "@/components/ui/dialog";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegClock,
} from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import JobPostForm from "./JobForm";
import { useGetJobs } from "@/hooks/tanstack/useJobs";

const JobPost = ({ job, index }) => {
  // {"json":{"id":12,"job_title":"d","company":"d","location":"d","description":"d","posted_date":"2024-12-02T14:00:34.966570+06:00","jobType":"Full-Time","deadline":"2024-12-30T00:00:00+06:00","experience":0,"salary":"10.00","email":"user@gmail.com"}}

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
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full rounded-lg shadow-lg dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl duration-300"
    >
      {/* Job Title and Type */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{job_title}</h2>
          <p className="text-sm italic text-[--secondary-bg]">{jobType}</p>
        </div>
        <div className="text-sm text-gray-500">
          Posted: {new Date(posted_date).toLocaleDateString()}
        </div>
      </div>

      {/* Company and Location */}
      <div className="flex items-center gap-5 mt-3 text-sm text-gray-700 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <FaBuilding className="text-[--secondary-bg]" />
          <p>{company || "N/A"}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-[--secondary-bg]" />
          <p>{location || "Remote"}</p>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-4">
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {description.length > 150
            ? `${description.slice(0, 150)}...`
            : description}
        </p>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-sm text-gray-800 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Experience:</span>
          <p>{experience} years</p>
        </div>
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-[--secondary-bg]" />
          <p>{salary} BDT</p>
        </div>
      </div>

      {/* Contact Email */}
      {email && (
        <div className="grid grid-cols-2 gap-3">
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Contact:</span>{" "}
            <a
              href={`mailto:${email}`}
              className="text-[--secondary-bg] underline"
            >
              {email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <FaRegClock className="text-[--secondary-bg]" />
            <p>Deadline: {new Date(deadline).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {/* View Details Button */}
      <div className="mt-5">
        <button
          // href={`/jobs/${job.id}`}
          onClick={() =>
            enqueueSnackbar("Job details will be available soon!", {
              variant: "default",
            })
          }
          className="text-sm font-semibold bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] w-full rounded-md h-10 flex gap-2 items-center justify-center hover:bg-[--secondary-bg] dark:hover:bg-[--secondary-bg] hover:text-white duration-200"
        >
          <span>View Details</span>
          <Eye size={20} />
        </button>
      </div>
    </motion.div>
  );
};

const JobPortal = () => {
  const jobs = [
    {
      id: 1,
      job_title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      description:
        "Develop and maintain scalable applications, ensuring performance and security.",
      jobType: "Full-Time",
      experience: 2,
      salary: "120000.00",
      posted_date: "2024-12-01T12:00:00Z",
      Deadline: "2024-12-31T23:59:59Z",
      email: "hr@google.com",
    },
    {
      id: 2,
      job_title: "UI/UX Designer",
      company: "Apple",
      location: "Cupertino, CA",
      description:
        "Design user-friendly interfaces for mobile and web platforms. Collaborate with product teams.",
      jobType: "Part-Time",
      experience: 3,
      salary: "80000.00",
      posted_date: "2024-11-20T12:00:00Z",
      Deadline: "2024-12-15T23:59:59Z",
      email: "careers@apple.com",
    },
    {
      id: 3,
      job_title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      description:
        "Lead cross-functional teams to deliver product features on time and within budget.",
      jobType: "Remote",
      experience: 4,
      salary: "150000.00",
      posted_date: "2024-12-02T10:00:00Z",
      Deadline: "2025-01-10T23:59:59Z",
      email: "jobs@microsoft.com",
    },
    {
      id: 4,
      job_title: "Data Scientist",
      company: "Meta",
      location: "Menlo Park, CA",
      description:
        "Analyze large datasets to derive actionable insights and support decision-making processes.",
      jobType: "Intern",
      experience: 0,
      salary: "50000.00",
      posted_date: "2024-12-01T09:00:00Z",
      Deadline: "2024-12-20T23:59:59Z",
      email: "internships@meta.com",
    },
    {
      id: 5,
      job_title: "Marketing Specialist",
      company: "Amazon",
      location: "New York, NY",
      description:
        "Develop and execute marketing campaigns to enhance brand visibility and customer engagement.",
      jobType: "Full-Time",
      experience: 2,
      salary: "70000.00",
      posted_date: "2024-11-25T08:00:00Z",
      Deadline: "2024-12-15T23:59:59Z",
      email: "marketing@amazon.com",
    },
    {
      id: 6,
      job_title: "Frontend Developer",
      company: "Tesla",
      location: "Austin, TX",
      description:
        "Implement responsive user interfaces for Tesla's web applications.",
      jobType: "Remote",
      experience: 1,
      salary: "90000.00",
      posted_date: "2024-11-30T15:00:00Z",
      Deadline: "2024-12-31T23:59:59Z",
      email: "frontend@tesla.com",
    },
  ];

  const { data, isLoading } = useGetJobs();

  return (
    <div className="container max-auto">
      {/* add  a job button */}
      <div className="mb-10">
        <div className="flex gap-2 items-center justify-between">
          <h1 className="text-3xl font-bold mb-4 whitespace-nowrap">
            Job Portal
          </h1>
          {/* 
          <button className="text-sm font-semibold bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white rounded h-10 flex gap-2 items-center justify-center hover:bg-[--light-bg] dark:hover:bg-[--light-bg-dark] hover:text-[--secondary-text] dark:hover:text-[--base-text-dark] duration-200 px-5">
            <span>Add Job</span>
            <Plus size={20} />
          </button> */}

          <AddJob />
        </div>
        <p className="text-md opacity-80">
          Browse a wide range of job opportunities on our job portal. Whether
          you're a student, a recent graduate, or a seasoned professional, we
          have the perfect job for you.
        </p>
      </div>

      {/* job form */}
      {/* <div>
        <JobPostForm />
      </div> */}

      {/* loading skeleton */}
      <div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-5 gap-y-10 overflow-hidden">
          

          </div>
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-5 gap-y-10 overflow-hidden">
        {/* <JobPost job={job} index={index} /> */}

        {data?.results?.map((job, index) => (
          <JobPost key={job.id} job={job} index={index} />
        ))}
      </div>
    </div>
  );
};

export default JobPortal;

export function AddJob() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <button className="text-sm font-semibold bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white rounded h-10 flex gap-2 items-center justify-center hover:bg-[--light-bg] dark:hover:bg-[--light-bg-dark] hover:text-[--secondary-text] dark:hover:text-[--base-text-dark] duration-200 px-5">
          <span>Add Job</span>
          <Plus size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] border-black bg-gray-100">
        <DialogHeader>
          <DialogTitle>Add a Job</DialogTitle>
          <DialogDescription>Add a job to your job portal.</DialogDescription>
        </DialogHeader>

        <JobPostForm open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
