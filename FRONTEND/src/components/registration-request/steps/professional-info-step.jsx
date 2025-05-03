"use client";

import { useField, ErrorMessage, useFormikContext } from "formik";
import { motion } from "framer-motion";
import {
  Briefcase,
  Award,
  Clock,
  Lightbulb,
  Heart,
  Trophy,
  X,
  Plus,
} from "lucide-react";
import { useState, useRef } from "react";

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

const TextareaField = ({ icon, ...props }) => {
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
        <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none">
          {icon}
        </div>
        <textarea
          {...field}
          {...props}
          className="w-full bg-gray-900/50 text-white py-3 pl-10 pr-3 rounded-lg focus:outline-none min-h-[100px]"
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

const TagInput = ({ name, label, icon, placeholder, required }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleAddTag = () => {
    if (inputValue.trim() !== "" && !field.value.includes(inputValue.trim())) {
      const newTags = [...field.value, inputValue.trim()];
      setFieldValue(name, newTags);
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = field.value.filter((tag) => tag !== tagToRemove);
    setFieldValue(name, newTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      field.value.length > 0
    ) {
      const newTags = [...field.value];
      newTags.pop();
      setFieldValue(name, newTags);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`flex flex-wrap items-center gap-2 p-2 rounded-lg bg-gray-900/50 transition-all duration-300 ${
          isFocused
            ? "ring-2 ring-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]"
            : meta.touched && meta.error
            ? "ring-2 ring-red-500"
            : "ring-1 ring-gray-700"
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center pl-2 pointer-events-none">{icon}</div>

        {field.value.map((tag) => (
          <motion.span
            key={tag}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-purple-900/50 text-purple-200 border border-purple-700"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-purple-300 hover:text-white"
            >
              <X size={14} />
            </button>
          </motion.span>
        ))}

        <div className="flex-1 min-w-[100px]">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={field.value.length === 0 ? placeholder : ""}
            className="w-full bg-transparent text-white py-1 px-2 focus:outline-none"
          />
        </div>
      </div>

      {inputValue && (
        <button
          type="button"
          onClick={handleAddTag}
          className="mt-2 flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
        >
          <Plus size={14} /> Add "{inputValue}"
        </button>
      )}

      <ErrorMessage name={name}>
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

export default function ProfessionalInfoStep() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
        Professional Information
      </h2>

      <InputField
        id="currentCompany"
        name="currentCompany"
        label="Current Company"
        placeholder="Enter your current company"
        // required
        icon={<Briefcase size={18} className="text-gray-400" />}
      />

      <InputField
        id="currentPosition"
        name="currentPosition"
        label="Current Position"
        placeholder="Enter your current position"
        // required
        icon={<Award size={18} className="text-gray-400" />}
      />

      <InputField
        id="experience"
        name="experience"
        type="number"
        label="Years of Experience"
        placeholder="Enter years of experience"
        required
        min="0"
        icon={<Clock size={18} className="text-gray-400" />}
      />

      <TagInput
        name="skills"
        label="Skills"
        placeholder="Type a skill and press Enter"
        required
        icon={<Lightbulb size={18} className="text-gray-400" />}
      />

      <TagInput
        name="interests"
        label="Interests"
        placeholder="Type an interest and press Enter"
        icon={<Heart size={18} className="text-gray-400" />}
      />

      <TextareaField
        id="achievements"
        name="achievements"
        label="Achievements"
        placeholder="Enter your notable achievements"
        icon={<Trophy size={18} className="text-gray-400" />}
      />
    </div>
  );
}
