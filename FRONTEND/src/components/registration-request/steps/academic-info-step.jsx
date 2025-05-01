import { useField, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { GraduationCap, Users, Building2, BookOpen } from "lucide-react";
import { useState } from "react";

const InputField = ({ icon, ...props }) => {
  const [field, meta] = useField(props);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {props.label}{" "}
        {props.required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
          isFocused
            ? "ring-2 ring-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]"
            : meta.touched && meta.error
            ? "ring-2 ring-red-500"
            : "ring-1 ring-gray-700"
        }`}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
        <input
          {...field}
          {...props}
          className="w-full bg-gray-900/50 text-white py-3 pl-10 pr-3 rounded-lg focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            field.onBlur(e);
            setIsFocused(false);
          }}
        />
      </div>
      <ErrorMessage name={props.name}>
        {(msg) => (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs mt-1"
          >
            {msg}
          </motion.div>
        )}
      </ErrorMessage>
    </div>
  );
};

const SelectField = ({ icon, options, ...props }) => {
  const [field, meta] = useField(props);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {props.label}{" "}
        {props.required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
          isFocused
            ? "ring-2 ring-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]"
            : meta.touched && meta.error
            ? "ring-2 ring-red-500"
            : "ring-1 ring-gray-700"
        }`}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
        <select
          {...field}
          {...props}
          className="w-full bg-gray-900/50 text-white py-3 pl-10 pr-3 rounded-lg focus:outline-none appearance-none"
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            field.onBlur(e);
            setIsFocused(false);
          }}
        >
          <option value="" disabled>
            {props.placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <ErrorMessage name={props.name}>
        {(msg) => (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs mt-1"
          >
            {msg}
          </motion.div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default function AcademicInfoStep() {
  // Generate years for dropdown (from current year back to 1970)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1969 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  // Department options
  const departments = [
    { value: "computer_science", label: "Computer Science & Engineering" },
    { value: "electrical", label: "Electrical Engineering" },
    { value: "mechanical", label: "Mechanical Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "business", label: "Business Administration" },
    { value: "economics", label: "Economics" },
    { value: "physics", label: "Physics" },
    { value: "mathematics", label: "Mathematics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biology", label: "Biology" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
        Academic Information
      </h2>

      <SelectField
        id="graduationYear"
        name="graduationYear"
        label="Graduation Year"
        placeholder="Select your graduation year"
        required
        options={years}
        icon={<GraduationCap size={18} className="text-gray-400" />}
      />

      <InputField
        id="batch"
        name="batch"
        label="Batch"
        placeholder="Enter your batch (e.g., 2018-2022)"
        required
        icon={<Users size={18} className="text-gray-400" />}
      />

      <SelectField
        id="department"
        name="department"
        label="Department"
        placeholder="Select your department"
        required
        options={departments}
        icon={<Building2 size={18} className="text-gray-400" />}
      />

      <InputField
        id="studentId"
        name="studentId"
        label="Student ID"
        placeholder="Enter your student ID"
        required
        icon={<BookOpen size={18} className="text-gray-400" />}
      />
    </div>
  );
}
