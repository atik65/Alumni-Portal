"use client";

import { useField, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  FileText,
  CreditCard,
  Upload,
} from "lucide-react";
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

const FileUpload = ({ name, label, icon, accept, required }) => {
  const [field, meta, helpers] = useField(name);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      helpers.setValue(file);
      setFileName(file.name);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col">
        <div className="border border-dashed border-gray-600 rounded-lg p-6 bg-gray-900/30 hover:bg-gray-800/30 transition-colors duration-300">
          <div className="flex flex-col items-center justify-center text-center">
            {icon}
            <p className="mt-2 text-sm text-gray-400">
              Drag and drop your file here, or
            </p>
            <label className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300">
              <Upload size={16} className="mr-2 text-purple-400" />
              <span className="text-gray-300 text-sm">Browse files</span>
              <input
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {fileName && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-purple-400"
              >
                {fileName}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default function SocialLinksStep() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
        Social Links & Documents
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="facebook"
          name="facebook"
          label="Facebook Profile"
          placeholder="https://facebook.com/username"
          icon={<Facebook size={18} className="text-gray-400" />}
        />

        <InputField
          id="twitter"
          name="twitter"
          label="Twitter Profile"
          placeholder="https://twitter.com/username"
          icon={<Twitter size={18} className="text-gray-400" />}
        />

        <InputField
          id="linkedin"
          name="linkedin"
          label="LinkedIn Profile"
          placeholder="https://linkedin.com/in/username"
          // required
          icon={<Linkedin size={18} className="text-gray-400" />}
        />

        <InputField
          id="instagram"
          name="instagram"
          label="Instagram Profile"
          placeholder="https://instagram.com/username"
          icon={<Instagram size={18} className="text-gray-400" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FileUpload
          name="cv"
          label="Upload CV/Resume"
          // accept=".pdf,.doc,.docx"
          accept=".pdf,.jpg,.jpeg,.png"
          icon={<FileText size={24} className="text-gray-400 mb-2" />}
        />

        <FileUpload
          required
          name="proofDocument"
          label="Upload Student ID or Certificate or Transcript"
          accept=".pdf,.jpg,.jpeg,.png"
          icon={<CreditCard size={24} className="text-gray-400 mb-2" />}
        />
      </div>
    </div>
  );
}
