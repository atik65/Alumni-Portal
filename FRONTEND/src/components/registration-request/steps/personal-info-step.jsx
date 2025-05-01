"use client";

import { useField, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, MapPin, Upload } from "lucide-react";
import { useState } from "react";
// import InputField from "../InputField";

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

const AvatarUpload = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      helpers.setValue(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Profile Picture
      </label>
      <div className="flex items-center space-x-4">
        <div
          className={`w-20 h-20 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center border-2 ${
            preview ? "border-purple-500" : "border-gray-700"
          }`}
        >
          {preview ? (
            <img
              src={preview || "/placeholder.svg"}
              alt="Avatar preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={32} className="text-gray-400" />
          )}
        </div>
        <label className="cursor-pointer flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <Upload size={18} className="mr-2 text-purple-400" />
          <span className="text-gray-300">Choose file</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default function PersonalInfoStep({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="firstName"
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          required
          icon={<User size={18} className="text-gray-400" />}
        />

        {/* first name */}
        {/* <InputField
          id="firstName"
          name="firstName"
          label="First Name"
          icon={<User size={18} className="text-gray-400" />}
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.firstName}
          error={errors.firstName}
          required
        /> */}

        <InputField
          id="lastName"
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          required
          icon={<User size={18} className="text-gray-400" />}
        />
      </div>

      <InputField
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email address"
        required
        icon={<Mail size={18} className="text-gray-400" />}
      />

      <InputField
        id="phone"
        name="phone"
        label="Phone Number"
        placeholder="Enter your phone number"
        required
        icon={<Phone size={18} className="text-gray-400" />}
      />

      <InputField
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        label="Date of Birth"
        icon={<Calendar size={18} className="text-gray-400" />}
      />

      <InputField
        id="address"
        name="address"
        label="Address"
        placeholder="Enter your address"
        required
        icon={<MapPin size={18} className="text-gray-400" />}
      />

      <AvatarUpload name="avatar" />
    </div>
  );
}
