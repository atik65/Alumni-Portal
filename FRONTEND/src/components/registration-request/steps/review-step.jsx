"use client";

import { useField } from "formik";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const SectionTitle = ({ title }) => (
  <h3 className="text-lg font-semibold text-purple-400 mt-6 mb-3 border-b border-gray-700 pb-2">
    {title}
  </h3>
);

const InfoItem = ({ label, value }) => {
  // Handle different value types
  let displayValue = value;

  if (value === null || value === undefined || value === "") {
    displayValue = <span className="text-gray-500 italic">Not provided</span>;
  } else if (Array.isArray(value)) {
    displayValue =
      value.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-1">
          {value.map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-purple-900/50 text-purple-200 border border-purple-700"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-gray-500 italic">None</span>
      );
  } else if (typeof value === "object" && value instanceof File) {
    displayValue = value.name;
  }

  return (
    <div className="mb-3">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-white">{displayValue}</div>
    </div>
  );
};

const ConfirmCheckbox = () => {
  const [field] = useField("confirmInfo");

  return (
    <div className="flex items-start mt-8 mb-4">
      <div className="flex items-center h-5">
        <input
          {...field}
          id="confirmInfo"
          type="checkbox"
          className="w-4 h-4 border border-gray-600 rounded bg-gray-800 focus:ring-3 focus:ring-purple-600"
        />
      </div>
      <label htmlFor="confirmInfo" className="ml-2 text-sm text-gray-300">
        I confirm that all the information provided is correct and accurate to
        the best of my knowledge.
      </label>
    </div>
  );
};

export default function ReviewStep({ values }) {
  return (
    <div className="max-h-[75vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
        Review Your Information
      </h2>

      <p className="text-gray-300 mb-6">
        Please review all the information you have provided before submitting
        your registration request.
      </p>

      <motion.div
        className="bg-gray-900/50 rounded-lg p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle title="Personal Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="First Name" value={values.firstName} />
          <InfoItem label="Last Name" value={values.lastName} />
          <InfoItem label="Email" value={values.email} />
          <InfoItem label="Phone" value={values.phone} />
          <InfoItem label="Date of Birth" value={values.dateOfBirth} />
          <InfoItem label="Address" value={values.address} />
        </div>

        <SectionTitle title="Academic Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Graduation Year" value={values.graduationYear} />
          <InfoItem label="Batch" value={values.batch} />
          <InfoItem label="Department" value={values.department} />
          <InfoItem label="Student ID" value={values.studentId} />
        </div>

        <SectionTitle title="Professional Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Current Company" value={values.currentCompany} />
          <InfoItem label="Current Position" value={values.currentPosition} />
          <InfoItem label="Years of Experience" value={values.experience} />
          <InfoItem label="Skills" value={values.skills} />
          <InfoItem label="Interests" value={values.interests} />
          <InfoItem label="Achievements" value={values.achievements} />
        </div>

        <SectionTitle title="Social Links & Documents" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Facebook" value={values.facebook} />
          <InfoItem label="Twitter" value={values.twitter} />
          <InfoItem label="LinkedIn" value={values.linkedin} />
          <InfoItem label="Instagram" value={values.instagram} />
          <InfoItem label="CV/Resume" value={values.cv} />
          <InfoItem
            label="Student ID or Certificate or Transcript"
            value={values.proofDocument}
          />
        </div>
      </motion.div>

      <ConfirmCheckbox />

      <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 text-sm text-gray-300">
        <p className="flex items-start">
          <Check
            size={18}
            className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
          />
          By submitting this form, you agree to our terms and conditions and
          privacy policy.
        </p>
      </div>
    </div>
  );
}
