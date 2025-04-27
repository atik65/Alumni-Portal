import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import Input from "./Input";

// import Button from "./Button";
import { enqueueSnackbar } from "notistack";
import { Input, SelectInput, TextInput } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateJob } from "../../hooks/tanstack/useJobs";

const JobPostForm = ({ open, setOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { mutateAsync, isPending } = useCreateJob();

  // Formik setup
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      job_title: "",
      company: "",
      location: "",
      description: "",
      jobType: "Full-Time",
      experience: 0,
      salary: "",
      deadline: "",
      email: "",
    },
    validationSchema: Yup.object({
      job_title: Yup.string().required("Job title is required."),
      company: Yup.string().required("Company name is required."),
      location: Yup.string().required("Location is required."),
      description: Yup.string().required("Description is required."),
      jobType: Yup.string().required("Please select a job type."),
      experience: Yup.number()
        .min(0, "Experience cannot be negative.")
        .required("Experience is required."),
      salary: Yup.number()
        .min(0, "Salary must be a positive number.")
        .required("Salary is required."),
      deadline: Yup.date()
        .required("Deadline is required.")
        .typeError("Invalid date."),
      email: Yup.string()
        .email("Invalid email address.")
        .required("Contact email is required."),
    }),
    onSubmit: async (values) => {
      // console.log("values = ", values);
      // return;

      //           {
      //   "job_title": "test job",
      //   "company": "test company",
      //   "location": "test location",
      //   "description": "test description",
      //   "jobType": "Full-Time",
      //   "Deadline": "2024-12-02T06:31:24.637Z",
      //   "experience": 2,
      //   "salary": "20000",
      //   "email": "user@example.com"
      // }

      setIsSubmitting(true);

      try {
        const payload = {
          job_title: values.job_title,
          company: values.company,
          location: values.location,
          description: values.description,
          jobType: values.jobType,
          deadline: values.deadline,
          experience: values.experience,
          salary: values.salary,
          email: values.email,
        };

        // Simulate API call to create a job post
        const res = await mutateAsync(payload);

        enqueueSnackbar(res?.message || "Job posted successfully!", {
          variant: "default",
        });

        resetForm();
        setOpen(false);
      } catch (error) {
        enqueueSnackbar(error?.message || "Something went wrong.", {
          variant: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white rounded-lg p-5 dark:shadow-gray-900 bg-[--core-bg] dark:bg-[--sidebar-bg]">
      {/* Form Title */}
      {/* <div>
        <h1 className="text-xl md:text-xl lg:text-2xl font-semibold">
          Post a New Job
        </h1>
        <p className="mt-5 text-sm">
          Fill out the details below to post a job.
        </p>
      </div> */}

      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <Input
          name="job_title"
          placeholder="Job Title"
          value={values.job_title}
          onChange={handleChange}
          error={errors.job_title}
          touched={touched.job_title}
          className="mt-0"
        />

        {/* Company */}
        <Input
          name="company"
          placeholder="Company Name"
          value={values.company}
          onChange={handleChange}
          error={errors.company}
          touched={touched.company}
          className="mt-5"
        />

        {/* Location */}
        <Input
          name="location"
          placeholder="Job Location"
          value={values.location}
          onChange={handleChange}
          error={errors.location}
          touched={touched.location}
          className="mt-5"
        />

        {/* Description */}
        <TextInput
          id="description"
          name="description"
          placeholder="Job Description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          touched={touched.description}
          className="mt-5 min-h-28"
        />

        {/* Job Type */}
        <SelectInput
          name="jobType"
          value={values.jobType}
          onChange={(e) => setFieldValue("jobType", e.target.value)}
          options={[
            { value: "Full-Time", label: "Full-Time" },
            { value: "Part-Time", label: "Part-Time" },
            { value: "Remote", label: "Remote" },
            { value: "Intern", label: "Intern" },
          ]}
          error={errors.jobType}
          touched={touched.jobType}
          className="mt-5 dark:shadow-gray-900 bg-[--core-bg] dark:bg-[--sidebar-bg]"
        />

        {/* Experience */}
        <Input
          name="experience"
          type="number"
          placeholder="Experience (Years)"
          value={values.experience}
          onChange={handleChange}
          error={errors.experience}
          touched={touched.experience}
          className="mt-5"
        />

        {/* Salary */}
        <Input
          name="salary"
          type="number"
          placeholder="Salary (in BDT)"
          value={values.salary}
          onChange={handleChange}
          error={errors.salary}
          touched={touched.salary}
          className="mt-5"
        />

        {/* Deadline */}
        <Input
          name="deadline"
          type="date"
          placeholder="Application Deadline"
          value={values.deadline}
          onChange={handleChange}
          error={errors.deadline}
          touched={touched.deadline}
          className="mt-5"
        />

        {/* Email */}
        <Input
          name="email"
          type="email"
          placeholder="Contact Email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
          className="mt-5 border"
        />

        {/* Submit Button */}
        <Button
          id="post-job-btn"
          type="submit"
          disabled={isSubmitting || isPending}
          className="mt-5 w-full text-white bg-[--secondary-bg] hover:bg-[--light-bg] hover:text-[--base-text] duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : "Post Job"}
        </Button>
      </form>
    </div>
  );
};

export default JobPostForm;
