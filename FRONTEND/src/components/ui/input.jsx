import * as React from "react";

import { cn } from "../../lib/utils";

const Input = React.forwardRef(
  ({ className, error, touched, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          // className={cn(
          //   "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50 outline-none",
          //   className
          // )}
          className={cn(
            `flex h-10 w-full rounded-md border ${
              error && touched ? "border-red-500" : ""
            }  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 outline-none `,
            className
          )}
          ref={ref}
          {...props}
        />

        {/* show error message if any */}
        {error && touched && (
          <p className="text-xs px-2 text-red-500 absolute -top-2 left-2 bg-white">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

const TextInput = React.forwardRef(
  ({ className, error, touched, type, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          type={type}
          // className={cn(
          //   "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50 outline-none",
          //   className
          // )}
          className={cn(
            `flex h-10 w-full rounded-md border ${
              error && touched ? "border-red-500" : ""
            }  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 outline-none `,
            className
          )}
          ref={ref}
          {...props}
        />

        {/* show error message if any */}
        {error && touched && (
          <p className="text-xs px-2 text-red-500 absolute -top-2 left-2 bg-white">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

const SelectInput = React.forwardRef(
  ({ className, error, touched, options, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            `flex h-10 w-full rounded-md border ${
              error && touched ? "border-red-500" : ""
            } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50 outline-none`,
            className
          )}
          ref={ref}
          {...props}
        >
          {/* Render options dynamically */}
          <option value="" disabled hidden>
            Select an option
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Show error message if any */}
        {error && touched && (
          <p className="text-xs px-2 text-red-500 absolute -top-2 left-2 bg-white">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

export { Input, TextInput, SelectInput };
