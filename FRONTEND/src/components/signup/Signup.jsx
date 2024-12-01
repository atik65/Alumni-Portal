"use client";

import React, { useEffect, useState } from "react";
import { LoginSignUpIntro } from "../login/Login";
import { Input } from "../ui/input";
import PasswordInput from "../ui/password-input";
import { Button } from "../ui/button";
import { RiLoginCircleLine } from "react-icons/ri";
import Link from "next/link";
import PhoneInputField from "../ui/phone-input";
import { IoIosPaperPlane } from "react-icons/io";
import { TypewriterEffectSmooth } from "../ui/typewritter-effect";
import { useFormik } from "formik";
import { signupSchema } from "@/validationSchema/authentication";
import { useRegister, useSendOtp } from "@/hooks/tanstack/useAuth";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import ProcessingPing from "../shared/ProcessingPing";
import { OtpTaker } from "../shared/OtpTaker";
import axiosRequest from "@/lib/axiosRequest";
import Image from "next/image";

const Signup = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 py-10">
      <div className="order-2 lg:order-1 lg:mt-20">
      <UniversityLogo
          src="/assets/logo.png" // Replace with the actual path to your logo
          altText="UAP Logo"
          className="mb-9"
        /> 

        <LoginSignUpIntro />
      </div>

      {/* signUp form */}
      <div className="order-1 lg:order-2 lg:mt-20">
        <SignUpForm />
      </div>
    </div>
  );
};

export const UniversityLogo = ({ src, altText = "University Logo", className = "" }) => {
  return (
    <div className={`flex items-center  justify-start pl-11 ${className}`}>
      <Image src={src} alt={altText} width={360} height={120} className="rounded" />
    </div>
  );
};



export default Signup;

const SignUpForm = () => {
  const { mutateAsync, isPending } = useRegister();
  const router = useRouter();

  const [isOtpSent, setIsOtpSent] = useState(false);

  const [isEmailAvailableError, setIsEmailAvailableError] = useState(
    "Email is not valid or already exists."
  );
  const [isPhoneAvailableError, setIPhoneAvailableError] = useState(
    "Phone is not valid or already exists."
  );

  const { mutateAsync: sendOtpMutateAsync, isPending: sendOtpIsPending } =
    useSendOtp();

  const sendOtp = async (body) => {
    try {
      await sendOtpMutateAsync(body);
      setIsOtpSent(true);
    } catch (error) {
      enqueueSnackbar(error?.message || "Something went wrong in sending otp", {
        variant: "error",
      });
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    resetForm,
    setFieldError,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      // otp: "1234",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      // payload for api
      const payload = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
        // profile: {
        //   phone_number: values.phone,
        // },
        // otp: values.otp,
      };

      try {
        const res = await mutateAsync(payload);

        enqueueSnackbar(res?.message || "Account created successfully", {
          variant: "default",
        });
        resetForm();
        router.push("/login");
      } catch (error) {
        enqueueSnackbar(error?.message || "Something went wrong", {
          variant: "error",
        });
      }
    },
  });

  // handle email existence check
  const handleCheckExistence = async (email = null) => {
    const currentEmail = email ? email : values?.email;

    //  check if it is not a valid email then return
    if (
      currentEmail?.includes("@") === false ||
      currentEmail?.includes(".") === false
    )
      return;

    try {
      const res = await axiosRequest({
        url: `/check-availability/${email ? email : values.email}/`,
        method: "GET",
      });

      setIsEmailAvailableError("");
      setFieldError("email", "");
      // console.log("check existence response = ", res);
    } catch (error) {
      // console.log(error);
      setFieldError("email", error?.message);
      setIsEmailAvailableError(error?.message);
      enqueueSnackbar(error?.message || "Error while checking existence", {
        variant: "error",
      });
    }
  };

  // handle phone existence check
  const handleCheckPhoneExistence = async (phone = null) => {
    // const { value, name } = e.target;

    // console.log("phone = ", phone);

    // if (errors.phone) return;

    const currentPhone = values?.phone;

    if (currentPhone?.length < 11) {
      return;
    }

    try {
      const res = await axiosRequest({
        url: `/check-availability/${values?.phone}/`,
        method: "GET",
      });

      setIPhoneAvailableError("");

      // console.log("check existence response = ", res);
      setFieldError("phone", "");
    } catch (error) {
      // console.log(error);
      // setFieldError("phone", error?.message);
      setIPhoneAvailableError(error?.message);
      enqueueSnackbar(error?.message || "Error while checking existence", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    // if (values.email) {
    //   handleCheckExistence(values.email);
    // }

    if (values.phone) {
      handleCheckPhoneExistence(values.phone);
    }
  }, [values.phone]);

  // console.log("values = ", values);

  return (
    <div>
      {/* top description */}
      <div>
        <h1 className="text-xl md:text-xl lg:text-2xl font-semibold">
          {/* Create your account now! */}
          <TypewriterEffectSmooth
            words={[
              {
                text: "Create",
              },
              {
                text: "your",
              },
              {
                text: "account",
              },
              {
                text: "now!",
              },
            ]}
          />
        </h1>

        <div className="mt-7">
          <p className="text-sm">
            Please enter your details to create your account
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* first name field */}
        <Input
          type="text"
          placeholder="Enter Your First Name"
          className="mt-5"
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          touched={touched?.firstName}
          error={errors?.firstName}
        />

        {/* last name field */}
        <Input
          type="text"
          placeholder="Enter Your Last Name"
          className="mt-5"
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          touched={touched?.lastName}
          error={errors?.lastName}
        />

        {/* email field */}
        <Input
          type="email"
          placeholder="Enter Your Email"
          className="mt-5"
          name="email"
          onChange={handleChange}
          value={values.email}
          touched={touched?.email}
          error={errors?.email}
        />

        {/* password field */}
        <PasswordInput
          placeholder="Enter Your Password"
          className="mt-5"
          name="password"
          onChange={handleChange}
          value={values.password}
          touched={touched?.password}
          error={errors?.password}
        />

        {/* confirm password field */}
        <PasswordInput
          placeholder="Confirm Password"
          className="mt-5"
          name="confirmPassword"
          onChange={handleChange}
          value={values.confirmPassword}
          touched={touched?.confirmPassword}
          error={errors?.confirmPassword}
        />

        {/* phone number */}
        {/* <div className="mt-5 relative ">
          <PhoneInputField
            onChange={(phone, country, e, formattedValue) => {
              setFieldValue("phone", phone);
              //   handleCheckPhoneExistence(phone);
            }}
            onBlur={() => {
              // handleCheckPhoneExistence;
            }}
            name="phone"
            value={values.phone}
            touched={touched?.phone}
            error={errors?.phone}
          /> */}

        {/* send otp button */}

        {/* {values?.phone?.length >= 13 && (
            <button
              disabled={errors?.phone}
              onClick={() =>
                sendOtp({
                  phone_or_email: values?.phone,
                })
              }
              type="button"
              className="absolute top-1 bottom-1 right-1 bg-black text-white px-2 flex items-center gap-1 justify-between rounded text-sm hover:bg-black/80 duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>
                <IoIosPaperPlane />
              </span>
              <span>Send OTP</span>
            </button>
          )}
        </div> */}

        {/* otp taker */}

        {/* TODO: not working now */}
        {isOtpSent && (
          <div className="flex gap-5 items-center mt-5">
            <p className="font-bold text-sm">Enter OTP</p>
            <div>
              <OtpTaker
                value={values.otp}
                touched={touched?.otp}
                error={errors?.otp}
                onChange={(value) => setFieldValue("otp", value)}
              />

              {/* show error message */}
              {errors?.otp && (
                <p className="text-red-500 text-xs mt-1">{errors?.otp}</p>
              )}
            </div>
          </div>
        )}

        {/* login button */}
        <Button disabled={isPending} type="submit" className="mt-5 w-full">
          {isPending ? (
            <ProcessingPing />
          ) : (
            <>
              <span className="mr-2 font-medium">Create Account</span>{" "}
              <RiLoginCircleLine />
            </>
          )}
        </Button>
      </form>

      {/* already have an account?  */}
      <div>
        <p className="text-sm mt-1">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
