"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import PersonalInfoStep from "./steps/personal-info-step";
import AcademicInfoStep from "./steps/academic-info-step";
import ProfessionalInfoStep from "./steps/professional-info-step";
import SocialLinksStep from "./steps/social-links-step";
import ReviewStep from "./steps/review-step";
import StepIndicator from "./step-indicator";

// Form validation schemas
const personalInfoSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  dateOfBirth: Yup.date().nullable(),
  address: Yup.string().required("Address is required"),
  avatar: Yup.mixed(),
});

const academicInfoSchema = Yup.object({
  graduationYear: Yup.number().required("Graduation year is required"),
  batch: Yup.string().required("Batch is required"),
  department: Yup.string().required("Department is required"),
  studentId: Yup.string().required("Student ID is required"),
});

const professionalInfoSchema = Yup.object({
  currentCompany: Yup.string().required("Current company is required"),
  currentPosition: Yup.string().required("Current position is required"),
  experience: Yup.number().required("Years of experience is required"),
  skills: Yup.array().of(Yup.string()).min(1, "At least one skill is required"),
  interests: Yup.array().of(Yup.string()),
  achievements: Yup.string(),
});

const socialLinksSchema = Yup.object({
  facebook: Yup.string().url("Must be a valid URL"),
  twitter: Yup.string().url("Must be a valid URL"),
  linkedin: Yup.string()
    .url("Must be a valid URL")
    .required("LinkedIn is required"),
  instagram: Yup.string().url("Must be a valid URL"),
  cv: Yup.mixed(),
  nid: Yup.mixed(),
});

// Combined schema for all steps
const validationSchemas = [
  personalInfoSchema,
  academicInfoSchema,
  professionalInfoSchema,
  socialLinksSchema,
  Yup.object({
    confirmInfo: Yup.boolean().oneOf(
      [true],
      "You must confirm your information"
    ),
  }),
];

const steps = [
  "Personal Information",
  "Academic Information",
  "Professional Information",
  "Social Links",
  "Review & Submit",
];

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: null,
    address: "",
    avatar: null,

    // Academic Info
    graduationYear: "",
    batch: "",
    department: "",
    studentId: "",

    // Professional Info
    currentCompany: "",
    currentPosition: "",
    experience: "",
    skills: [],
    interests: [],
    achievements: "",

    // Social Links
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    cv: null,
    nid: null,

    // Review
    confirmInfo: false,
  };

  const finalHandleSubmit = async (values) => {
    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted with values:", values);

    // Here you would typically send the data to your backend
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    setSubmitting(false);
    // Show success message or redirect
    alert("Registration request submitted successfully!");
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <motion.div
        className="backdrop-blur-md bg-black/30 rounded-xl border border-gray-800 shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 md:p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[currentStep]}
            onSubmit={finalHandleSubmit}
            validateOnMount={false}
            validateOnChange={false}
            validateOnBlur={true}
          >
            {({
              isValid,
              validateForm,
              setFieldValue,
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 0 && (
                      <PersonalInfoStep
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    )}
                    {currentStep === 1 && <AcademicInfoStep />}
                    {currentStep === 2 && <ProfessionalInfoStep />}
                    {currentStep === 3 && <SocialLinksStep />}
                    {currentStep === 4 && <ReviewStep values={values} />}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                      currentStep === 0
                        ? "opacity-50 cursor-not-allowed bg-gray-700 text-gray-400"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                  >
                    <ChevronLeft size={18} />
                    Back
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={async () => {
                        const res = await validateForm();
                        const isActuallyValid = Object.keys(res).length === 0;

                        if (isActuallyValid) {
                          nextStep();
                        } else {
                          handleSubmit();
                        }
                      }}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting || !values.confirmInfo}
                      className={`px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                        submitting || !values.confirmInfo
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Check size={18} />
                          Submit Registration
                        </>
                      )}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
}
