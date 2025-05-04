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

const Login = () => {
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
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

// const Login = () => {
//   return (
//     <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 py-20  ">
//       <div className="order-2 lg:order-1">
//         <UniversityLogo
//           src="/assets/logo.png" // Replace with the actual path to your logo
//           altText="UAP Logo"
//           className="mb-9"
//         />
//         <LoginSignUpIntro />
//       </div>

//       {/* login form */}
//       <div className="order-1 lg:order-2 lg:mt-40">
//         <LoginForm />
//       </div>
//     </div>
//   );
// };

// export default Login;

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

export const LoginSignUpIntro = () => {
  return (
    <div className="h-full">
      <h1 className="text-base md:text-xl lg:text-2xl font-medium">
        {/* Discover all the latest trends */}
        <TypewriterEffectSmooth
          delay={1.2}
          words={[
            {
              text: "Reconnect",
            },
            {
              text: "With",
            },
            {
              text: "Your",
            },
            {
              text: "Alumni",
            },
            {
              text: "Network",
            },
          ]}
        />
      </h1>

      <p className="mt-7 text-sm">
        Stay connected and take advantage of the exclusive benefits our alumni
        portal offers:
      </p>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <IoCheckmark />
          <p className="text-sm">
            Build lasting connections with fellow alumni
          </p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <IoCheckmark />
          <p className="text-sm">
            Access career opportunities and mentorship programs
          </p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <IoCheckmark />
          <p className="text-sm">
            Stay updated with university news and events
          </p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <IoCheckmark />
          <p className="text-sm">Share your achievements and success stories</p>
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
          callbackUrl: `/`,
        });
        console.log("res = ", res);
        // return;
        if (res?.status != 200) {
          enqueueSnackbar(res?.error || "Email or Password wrong", {
            variant: "error",
          });
        }

        if (res?.status === 200) {
          enqueueSnackbar("Logged in successfully", {
            variant: "default",
          });

          router.push("/");
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

  // console.log("session = ", session);

  return (
    <div>
      {/* top description */}
      <div>
        {/* <h1 className="text-xl md:text-xl lg:text-5xl font-semibold pb-10">
        
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
        </h1> */}

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
        <Button
          id="login-button"
          disabled={isSubmitting}
          type="submit"
          className="mt-5 w-full bg-[--secondary-bg] hover:bg-[--light-bg] hover:text-[--secondary-bg-dark] duration-400 dark:text-[--base-text-dark] dark:hover:text-[--base-text]"
        >
          <span className="mr-2 font-medium">Login</span> <RiLoginCircleLine />
        </Button>
      </form>

      {/* login with google */}
      {/* <div>
        <Button
          onClick={() => {
            const res = signIn("google", {
              callbackUrl: "/portal",
            });
            console.log("res from google login = ", res);
          }}
          className="mt-3 w-full"
        >
          <span className="mr-2 font-medium">Continue with Google</span>{" "}
          <FcGoogle />
        </Button>
      </div> */}

      {/* Forgot Password */}
      {/* <div>
        <p className="text-sm mt-5">
          Forgot Password?{" "}
          <Link
            href={"/forgot-password"}
            className="text-primary font-semibold"
          >
            Click Here
          </Link>
        </p>
      </div> */}

      {/* don't have an account?  */}
      <div>
        <p className="text-sm mt-3">
          Don&apos;t have an account and you have UAP Email ?{" "}
          <Link
            id="signup"
            href={"/signup"}
            className="text-primary font-semibold dark:hover:text-[--secondary-bg] duration-200"
          >
            Sign Up
          </Link>
        </p>
        <p className="text-sm mt-3">
          Don&apos;t have an account and you are an Alumni don't have UAP Email
          ?{" "}
          <Link
            id="registration-request"
            href={"/registration-request"}
            className="text-primary font-semibold dark:hover:text-[--secondary-bg] duration-200"
          >
            Apply for an Account
          </Link>
        </p>
      </div>
    </div>
  );
};
