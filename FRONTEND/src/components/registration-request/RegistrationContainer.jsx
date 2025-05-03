"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import RegistrationForm from "./registration-form";
import {
  GraduationCap,
  Users,
  Building2,
  Globe,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import RegistrationRequestSlider from "./slider";
import { useRouter } from "next-nprogress-bar";

const RegistrationContainer = () => {
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
        <div className="relative z-10 order-1 lg:order-1 ">
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
              className="text-center lg:text-left cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="inline-block mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap size={32} className="text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 font-orbitron">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                  UAP Alumni Network
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Connect. Collaborate. Succeed.
              </p>
            </motion.div>

            {/* slider */}
            <RegistrationRequestSlider />

            {/* University Description */}
            <motion.div
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
            </motion.div>

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
          className="order-2 lg:order-2 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RegistrationForm />
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationContainer;
