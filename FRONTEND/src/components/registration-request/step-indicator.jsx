"use client";

import { motion } from "framer-motion";

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="mb-8 px-16 sm:px-16">
      <div className="flex justify-between items-center relative">
        {/* Progress bar background */}
        <div className="absolute h-1 w-full bg-gray-700 rounded-full" />

        {/* Animated progress bar */}
        <motion.div
          className="absolute h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />

        {/* Step indicators */}
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                index <= currentStep
                  ? "bg-gradient-to-r from-purple-500 to-blue-500"
                  : "bg-gray-700"
              }`}
              initial={{ scale: 0.8 }}
              animate={{
                scale: index === currentStep ? 1.1 : 1,
                boxShadow:
                  index === currentStep
                    ? "0 0 15px rgba(124,58,237,0.7)"
                    : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white text-sm font-bold">{index + 1}</span>
            </motion.div>
            <span className="absolute top-10 text-xs text-gray-400  sm:whitespace-nowrap">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
