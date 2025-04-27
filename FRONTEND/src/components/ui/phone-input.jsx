"use client";

import { cn } from "../../lib/utils";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputField = ({
  values,
  error,
  touched,
  setFieldValue,
  //   handleCheckPhoneExistence,
  className,
  ...props
}) => {
  return (
    <div>
      {/* phone */}
      <div
        className={`w-full  rounded-md border relative ${
          error && touched ? "border-red-500" : ""
        } px-1`}
      >
        {/* <div className="bg-red-600 h-20 w-full">
          <label htmlFor="phone" className=" text-sm">
            Phone
          </label> */}

        <PhoneInput
          {...props}
          autoFormat={false}
          countryCodeEditable={false}
          country={"bd"}
          //   onlyCountries={["bd"]}
          enableSearch={true}
          value={values?.phone}
          //   onChange={onChange}
          //   onBlur={onBlur}
          placeholder="Enter Phone Number"
          inputClass="w-full h-[40px] text-black outline-none bg-inherit border-none   placeholder:text-black"
          containerClass="w-full  border-none bg-inherit   outline-none "
          inputStyle={{
            width: "100%",
            height: "40px",
            outline: "none",
            backgroundColor: "inherit",
            border: "none",
          }}
          buttonStyle={{
            backgroundColor: "inherit",
            border: "none",
            width: "100px",
            hover: "none",
          }}
          dropdownStyle={{
            position: "absolute",
            top: -10,
            left: 0,
            right: 0,
            backgroundColor: "white",
            zIndex: 100,
            color: "black",
            border: "none",
            borderRadius: "5px 5px 5px 5px",
            padding: "0 0 0 10px",
          }}
        />

        {/* show error message if any */}
        {error && touched ? (
          <p className="text-xs px-2 text-red-500 absolute -top-2 left-2 bg-white">
            {error}
          </p>
        ) : null}
      </div>

      {/* </div> */}
    </div>
  );
};

export default PhoneInputField;
