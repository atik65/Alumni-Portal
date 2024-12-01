"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import companyLogo from "/public/assets/logo.png";
import Link from "next/link";
import { Eye, Edit, Trash } from "lucide-react";

const JobPortal = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      job_title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      description: "Responsible for developing scalable web applications.",
      jobType: "Full-Time",
      posted_date: "2024-12-01",
      deadline: "2025-01-01",
      experience: 2,
      salary: 120000.0,
    },
    {
      id: 2,
      job_title: "UI/UX Designer",
      company: "Apple",
      location: "Cupertino, CA",
      description: "Design intuitive user interfaces and experiences.",
      jobType: "Part-Time",
      posted_date: "2024-11-20",
      deadline: "2024-12-15",
      experience: 3,
      salary: 80000.0,
    },
    {
      id: 3,
      job_title: "Web Developer",
      company: "Apple",
      location: "Cupertino, CA",
      description: "Design intuitive user interfaces and experiences.",
      jobType: "Part-Time",
      posted_date: "2024-11-20",
      deadline: "2024-12-15",
      experience: 3,
      salary: 80000.0,
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    job_title: "",
    company: "",
    location: "",
    description: "",
    jobType: "Full-Time",
    experience: "",
    salary: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [viewingJob, setViewingJob] = useState(null); // For the job modal

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update job
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setJobs(
        jobs.map((job) =>
          job.id === formData.id ? { ...formData, id: job.id } : job
        )
      );
      setIsEditing(false);
    } else {
      setJobs([...jobs, { ...formData, id: Date.now() }]);
    }
    setFormData({
      id: null,
      job_title: "",
      company: "",
      location: "",
      description: "",
      jobType: "Full-Time",
      experience: "",
      salary: "",
    });
  };

  // Delete job
  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // Edit job
  const handleEdit = (job) => {
    setFormData(job);
    setIsEditing(true);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-5">Job Portal</h1>

      {/* Job Form */}
      <form
        onSubmit={handleSubmit}
        className="p-5 border rounded-md shadow-md mb-10 dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Job" : "Add New Job"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            placeholder="Job Title"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="Experience (Years)"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            placeholder="Salary"
            className="p-2 border rounded"
            required
          />
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Job Description"
          className="p-2 border rounded w-full mt-4"
          rows={4}
          required
        ></textarea>
        <button
          type="submit"
          className="mt-3 text-sm font-semibold bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] w-1/5 rounded h-10 flex items-center justify-center hover:bg-[--secondary-bg] dark:hover:bg-[--secondary-bg] hover:text-white duration-200"
        >
          {isEditing ? "Update Job" : "Add Job"}
        </button>
      </form>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] text-b">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full rounded-md shadow-lg dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white p-5"
          >
            <div className="flex items-center gap-4">
              <Image
                src={companyLogo}
                alt={job.company}
                className="h-20 w-20 object-cover rounded-md"
              />
              <div>
                <h2 className="font-semibold text-lg">{job.job_title}</h2>
                <p className="text-sm opacity-80">{job.company}</p>
                <p className="text-sm opacity-70">{job.location}</p>
                <p className="text-sm">{job.jobType}</p>
              </div>
            </div>
            {/* Truncated Description */}
            <p className="mt-4 text-sm line-clamp-2">{job.description}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(job)}
                className="mt-3 text-sm font-semibold bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] w-1/3 rounded h-10 flex items-center justify-center hover:bg-[--secondary-bg] dark:hover:bg-[--secondary-bg] hover:text-white duration-200"
              >
                <Edit size={16} className="mr-2" /> Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                className="mt-3 text-sm font-semibold bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] w-1/3 rounded h-10 flex items-center justify-center dark:hover:bg-red-600 hover:bg-red-600 hover:text-white duration-200"

              >
                <Trash size={16} className="mr-2" /> Delete
              </button>
              <button
                onClick={() => setViewingJob(job)}
                className="mt-3 text-sm font-semibold bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] w-1/3 rounded h-10 flex items-center justify-center hover:bg-[--secondary-bg] dark:hover:bg-[--secondary-bg] hover:text-white duration-200"
              >
                <Eye size={16} className="mr-2" /> View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>     
      {/* Modal for Viewing Job Details */}
      {viewingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-[--core-bg-dark] p-5 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold">{viewingJob.job_title}</h2>
            <p className="text-sm text-gray-500">{viewingJob.company}</p>
            <p className="text-sm mb-4">{viewingJob.location}</p>
            <p className="text-sm mb-2">
              <strong>Type:</strong> {viewingJob.jobType}
            </p>
            <p className="text-sm mb-2">
              <strong>Experience:</strong> {viewingJob.experience} years
            </p>
            <p className="text-sm mb-2">
              <strong>Salary:</strong> ${viewingJob.salary.toLocaleString()}
            </p>
            <p className="mt-4">{viewingJob.description}</p>
            <button
              onClick={() => setViewingJob(null)}
              className="mt-3 text-sm font-semibold bg-[--light-bg] dark:bg-[--light-bg-dark] text-[--secondary-text] dark:text-[--base-text-dark] w-1/3 rounded h-10 flex items-center justify-center hover:bg-[--secondary-bg] dark:hover:bg-[--secondary-bg] hover:text-white duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPortal;
