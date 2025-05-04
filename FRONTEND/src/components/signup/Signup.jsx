// "use client";

// import React, { useEffect, useState } from "react";
// import { LoginSignUpIntro } from "../login/Login";
// import { Input } from "../ui/input";
// import PasswordInput from "../ui/password-input";
// import { Button } from "../ui/button";
// import { RiLoginCircleLine } from "react-icons/ri";
// import Link from "next/link";
// import PhoneInputField from "../ui/phone-input";
// import { IoIosPaperPlane } from "react-icons/io";
// import { TypewriterEffectSmooth } from "../ui/typewritter-effect";
// import { useFormik } from "formik";
// import { signupSchema } from "../../validationSchema/authentication";
// import { useRegister, useSendOtp } from "../../hooks/tanstack/useAuth";
// import { useRouter } from "next/navigation";
// import { enqueueSnackbar } from "notistack";
// import ProcessingPing from "../shared/ProcessingPing";
// import { OtpTaker } from "../shared/OtpTaker";
// import axiosRequest from "../../lib/axiosRequest";
// import Image from "next/image";

// const Signup = () => {
//   return (
//     <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 py-10">
//       <div className="order-2 lg:order-1 lg:mt-20">
//         <UniversityLogo
//           src="/assets/logo.png" // Replace with the actual path to your logo
//           altText="UAP Logo"
//           className="mb-9"
//         />

//         <LoginSignUpIntro />
//       </div>

//       {/* signUp form */}
//       <div className="order-1 lg:order-2 lg:mt-20">
//         <SignUpForm />
//       </div>
//     </div>
//   );
// };

"use client";
import { useRegister, useSendOtp } from "../../hooks/tanstack/useAuth";
import { signupSchema } from "../../validationSchema/authentication";

import React, { useState } from "react";
import PasswordInput from "../ui/password-input";
import { Input } from "../ui/input";
import { IoCheckmark } from "react-icons/io5";
import { Button } from "../ui/button";
import { RiLoginCircleLine } from "react-icons/ri";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewritter-effect";
import { useFormik } from "formik";
import { loginSchema } from "../../validationSchema/authentication";
import { signIn, useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Building2,
  Globe,
  ArrowRight,
} from "lucide-react";
import RegistrationRequestSlider from "../registration-request/slider";
import RegistrationForm from "../registration-request/registration-form";
import { useRouter } from "next-nprogress-bar";

const Signup = () => {
  const canvasRef = useRef(null);

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle properties
    const particlesArray = [];
    const numberOfParticles = 50;

    class Particle {
      x;
      y;
      size;
      speedX;
      speedY;
      color;

      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(${124 + Math.random() * 50}, ${
          58 + Math.random() * 50
        }, ${237 + Math.random() * 18}, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.offsetWidth) this.x = 0;
        else if (this.x < 0) this.x = canvas.offsetWidth;
        if (this.y > canvas.offsetHeight) this.y = 0;
        else if (this.y < 0) this.y = canvas.offsetHeight;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections between particles
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 58, 237, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8  h-[100vh] items-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      ></canvas>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative h-full">
        {/* Left Column - University Info */}
        <div className="relative z-10 order-2 lg:order-1 ">
          {/* <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: -1 }}
          ></canvas> */}

          <motion.div
            className="space-y-8 p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* University Logo and Heading */}
            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left"
            >
              <div
                onClick={() => router.push("/")}
                className="inline-block mb-4"
              >
                {/* <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap size={32} className="text-white" />
                </div> */}

                {/* plage logo */}
                <Image
                  src="/assets/logo.png"
                  alt="Plage Logo"
                  width={200}
                  height={200}
                  quality={100}
                  className="w-28 h-24"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 font-orbitron">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                  UAP Alumni Network
                </span>
              </h1>
              <h1 className="text-xl md:text-xl lg:text-3xl font-semibold  ">
                {/* Login to your account */}
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
              {/* <p className="text-xl text-gray-300">
                Connect. Collaborate. Succeed.
              </p> */}
            </motion.div>

            {/* slider */}
            <RegistrationRequestSlider />

            {/* University Description */}
            {/* <motion.div
              variants={itemVariants}
              className="backdrop-blur-md bg-black/20 rounded-xl p-6 border border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-4 text-white">
                Join Our Global Community
              </h2>
              <p className="text-gray-300 mb-4">
                Our alumni network connects graduates across industries and
                continents, providing exclusive access to career opportunities,
                mentorship programs, and lifelong learning resources.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-purple-900/40 text-purple-200 rounded-full text-sm border border-purple-800">
                  Networking Events
                </span>
                <span className="px-3 py-1 bg-blue-900/40 text-blue-200 rounded-full text-sm border border-blue-800">
                  Job Opportunities
                </span>
                <span className="px-3 py-1 bg-cyan-900/40 text-cyan-200 rounded-full text-sm border border-cyan-800">
                  Mentorship
                </span>
                <span className="px-3 py-1 bg-indigo-900/40 text-indigo-200 rounded-full text-sm border border-indigo-800">
                  Resources
                </span>
              </div>
            </motion.div> */}

            {/* CTA Button (Mobile Only) */}
            {/* <motion.div variants={itemVariants} className="lg:hidden">
              <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                Register Now
                <ArrowRight size={18} />
              </button>
            </motion.div> */}
          </motion.div>
        </div>

        {/* Right Column - Registration Form */}
        <motion.div
          className="order-2 lg:order-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SignUpForm />
        </motion.div>
      </div>
    </div>
  );
};

export const UniversityLogo = ({
  src,
  altText = "University Logo",
  className = "",
}) => {
  return (
    <div className={`flex items-center  justify-start pl-11 ${className}`}>
      <Image
        src={src}
        alt={altText}
        width={360}
        height={120}
        className="rounded"
      />
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
        {/* <h1 className="text-xl md:text-xl lg:text-2xl font-semibold">
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
        </h1> */}

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
        <Button
          id="create-account"
          disabled={isPending}
          type="submit"
          className="mt-5 w-full bg-[--secondary-bg] hover:bg-[--light-bg] hover:text-[--secondary-bg-dark] duration-400 dark:text-[--base-text-dark] dark:hover:text-[--base-text]"
        >
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
          <Link
            href={"/login"}
            className="text-primary font-semibold dark:hover:text-[--secondary-bg] duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
