"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils"; // Assuming you use this utility

const InputField = ({
  icon,
  label,
  required = false,
  id,
  name,
  type = "text",
  value = "",
  onChange = () => {},
  onBlur = () => {},
  touched = false,
  error = "",
  placeholder = "",
  className = "",
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (touched && error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [touched, error]);

  //   const showError = touched && error;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={cn(
          "relative rounded-lg overflow-hidden transition-all duration-300",
          isFocused
            ? "ring-2 ring-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]"
            : showError
            ? "ring-2 ring-red-500"
            : "ring-1 ring-gray-700"
        )}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            onBlur(e);
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-gray-900/50 text-white py-3 pl-10 pr-3 rounded-lg focus:outline-none",
            className
          )}
          {...rest}
        />
      </div>

      {showError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default InputField;
