"use client";

import React, { useState } from "react";
import PasswordInput from "../ui/password-input";
import { Input } from "../ui/input";
import { IoCheckmark } from "react-icons/io5";
import { Button } from "../ui/button";
import { RiLoginCircleLine } from "react-icons/ri";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewritter-effect";
import { useFormik } from "formik";
import { loginSchema } from "@/validationSchema/authentication";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 py-20  ">
      <div className="order-2 lg:order-1">
        <LoginSignUpIntro />
      </div>

      {/* login form */}
      <div className="order-1 lg:order-2">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

export const LoginSignUpIntro = () => {
  return (
    <div className="h-full">
      <h1 className="text-base md:text-xl lg:text-2xl font-medium">
        {/* Discover all the latest trends */}
        <TypewriterEffectSmooth
          delay={1.2}
          words={[
            {
              text: "Discover",
            },
            {
              text: "all",
            },
            {
              text: "the",
            },
            {
              text: "latest",
            },
            {
              text: "trends",
            },
          ]}
        />
      </h1>

      <p className="mt-7 text-sm">
        Get excited and explore the latest trends and styles with the help of
        our customized services:
      </p>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <IoCheckmark />
          <p className="text-sm">Stay up to date with the latest trends</p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <IoCheckmark />
          <p className="text-sm">Buy faster</p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <IoCheckmark />
          <p className="text-sm">Get exclusive offers and discounts</p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <IoCheckmark />
          <p className="text-sm">Save your favorite products</p>
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          // callbackUrl: `${window.location.origin}/dashboard`,
          callbackUrl: `/profile`,
        });
        // console.log("res = ", res);
        // return;
        if (res?.status != 200) {
          enqueueSnackbar("Email or Password wrong", {
            variant: "error",
          });
        }

        if (res?.status === 200) {
          enqueueSnackbar("Logged in successfully", {
            variant: "default",
          });

          router.push("/profile");
        }
      } catch (error) {
        // console.log("error = ", error);
        enqueueSnackbar(error.message | "Something went wrong.", {
          variant: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const { data: session } = useSession();

  console.log("session = ", session);

  return (
    <div>
      {/* top description */}
      <div>
        <h1 className="text-xl md:text-xl lg:text-2xl font-semibold">
          {/* Login to your account */}
          <TypewriterEffectSmooth
            words={[
              {
                text: "Login",
              },
              {
                text: "to",
              },
              {
                text: "your",
              },
              {
                text: "account",
              },
            ]}
          />
        </h1>

        <div className="mt-7">
          <p className="text-sm">Continue with your Email and Password </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* email field */}
        <Input
          type="email"
          placeholder="Enter Your Email"
          className="mt-5"
          name="email"
          onChange={handleChange}
          value={values.email}
          error={errors.email}
          touched={touched.email}
        />

        {/* password field */}
        <PasswordInput
          placeholder="Enter Your Password"
          className="mt-5"
          name="password"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
          touched={touched.password}
        />

        {/* login button */}
        <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
          <span className="mr-2 font-medium">Login</span> <RiLoginCircleLine />
        </Button>
      </form>

      {/* login with google */}
      <div>
        <Button
          onClick={() => {
            const res = signIn("google");
            console.log("res from google login = ", res);
          }}
          className="mt-3 w-full"
        >
          <span className="mr-2 font-medium">Continue with Google</span>{" "}
          <FcGoogle />
        </Button>
      </div>

      {/* Forgot Password */}
      <div>
        <p className="text-sm mt-5">
          Forgot Password?{" "}
          <Link
            href={"/forgot-password"}
            className="text-primary font-semibold"
          >
            Click Here
          </Link>
        </p>
      </div>

      {/* don't have an account?  */}
      <div>
        <p className="text-sm mt-3">
          Don&apos;t have an account?{" "}
          <Link href={"/signup"} className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
