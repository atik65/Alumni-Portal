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

  // Stats data
  const stats = [
    {
      icon: <GraduationCap className="text-purple-500" size={24} />,
      value: "25,000+",
      label: "Alumni",
    },
    {
      icon: <Building2 className="text-blue-500" size={24} />,
      value: "50+",
      label: "Years of Excellence",
    },
    {
      icon: <Users className="text-cyan-500" size={24} />,
      value: "500+",
      label: "Companies Hiring",
    },
    {
      icon: <Globe className="text-indigo-500" size={24} />,
      value: "120+",
      label: "Countries Represented",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        "Joining the alumni network opened doors to opportunities I never imagined possible.",
      name: "Sarah Johnson",
      position: "Software Engineer at Google",
      year: "Class of 2018",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The connections I made through the alumni portal helped me secure my dream job.",
      name: "Michael Chen",
      position: "Product Manager at Microsoft",
      year: "Class of 2015",
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

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

            {/* Stats */}
            {/* <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-black/20 rounded-xl p-4 border border-gray-800 flex flex-col items-center text-center"
                >
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div> */}

            {/* Testimonial */}
            {/* <motion.div variants={itemVariants} className="relative">
              <div className="absolute -top-6 -left-2 text-6xl text-purple-600 opacity-30">
                "
              </div>
              <div className="backdrop-blur-md bg-black/20 rounded-xl p-6 border border-gray-800 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:block">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
                      <Image
                        src={testimonials[0].image || "/placeholder.svg"}
                        alt={testimonials[0].name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-300 italic mb-4">
                      {testimonials[0].quote}
                    </p>
                    <div>
                      <p className="font-semibold text-white">
                        {testimonials[0].name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonials[0].position} • {testimonials[0].year}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div> */}

            {/* CTA Button (Mobile Only) */}
            <motion.div variants={itemVariants} className="lg:hidden">
              <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                Register Now
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Registration Form */}
        <motion.div
          className="order-1 lg:order-2"
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
