"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Send,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { enqueueSnackbar } from "notistack";

const Contact = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    enqueueSnackbar("Message is Sent", {
      variant: "default",
    });
  };

  return (
    <div
      className={`min-h-screen w-full p-4 md:p-8 rounded-xl ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50"
      }`}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-6xl mx-auto"
        >
          <Card isDark={isDark} className="overflow-hidden">
            {/* Hero Banner */}
            <div
              className={`relative h-48 ${
                isDark
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600"
                  : "bg-gradient-to-r from-sky-400 to-indigo-400"
              }`}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.2, 0.3, 0.2],
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")",
                  backgroundSize: "30px 30px",
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-block mb-4">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Get in Touch
                  </h1>
                  <p className="text-white/80 max-w-2xl mx-auto">
                    We value our alumni community. Reach out to us with your
                    queries, suggestions, or feedback.
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="px-6 py-8">
              {/* Contact Information and Social Media */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
              >
                {/* Contact Information */}
                <Card
                  className={
                    isDark
                      ? "bg-black/30 border-white/5 h-full"
                      : "bg-white/60 border-black/5 shadow-md h-full"
                  }
                  isDark={isDark}
                >
                  <div className="p-6">
                    <h2
                      className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
                        isDark ? "text-white/90" : "text-gray-800"
                      }`}
                    >
                      <span
                        className={`h-5 w-1 rounded-full ${
                          isDark
                            ? "bg-gradient-to-b from-purple-500 to-blue-500"
                            : "bg-gradient-to-b from-blue-400 to-indigo-500"
                        }`}
                      ></span>
                      Contact Information
                    </h2>

                    <div className="space-y-6">
                      <ContactItem
                        icon={<MapPin size={20} />}
                        title="Address"
                        content="University of Asia Pacific, 74/A, Green Road, Dhaka 1205, Bangladesh"
                        isDark={isDark}
                      />
                      <ContactItem
                        icon={<Phone size={20} />}
                        title="Phone"
                        content="+880 9613 803213"
                        isDark={isDark}
                      />
                      <ContactItem
                        icon={<Mail size={20} />}
                        title="Email"
                        content="info@uap-bd.edu"
                        isLink={true}
                        href="mailto:info@uap-bd.edu"
                        isDark={isDark}
                      />
                    </div>
                  </div>
                </Card>

                {/* Social Media Links */}
                <Card
                  className={
                    isDark
                      ? "bg-black/30 border-white/5 h-full"
                      : "bg-white/60 border-black/5 shadow-md h-full"
                  }
                  isDark={isDark}
                >
                  <div className="p-6">
                    <h2
                      className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
                        isDark ? "text-white/90" : "text-gray-800"
                      }`}
                    >
                      <span
                        className={`h-5 w-1 rounded-full ${
                          isDark
                            ? "bg-gradient-to-b from-purple-500 to-blue-500"
                            : "bg-gradient-to-b from-blue-400 to-indigo-500"
                        }`}
                      ></span>
                      Follow Us
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                      <SocialMediaCard
                        icon={<Facebook size={24} />}
                        name="Facebook"
                        link="https://www.facebook.com/UAP.Bangladesh"
                        isDark={isDark}
                      />
                      <SocialMediaCard
                        icon={<Twitter size={24} />}
                        name="Twitter"
                        link="https://twitter.com/UAP_BD"
                        isDark={isDark}
                      />
                      <SocialMediaCard
                        icon={<Linkedin size={24} />}
                        name="LinkedIn"
                        link="https://www.linkedin.com/school/uap-bd/"
                        isDark={isDark}
                      />
                      <SocialMediaCard
                        icon={<Instagram size={24} />}
                        name="Instagram"
                        link="https://www.instagram.com/uap.bd/"
                        isDark={isDark}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2
                  className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${
                    isDark ? "text-white/90" : "text-gray-800"
                  }`}
                >
                  <span
                    className={`h-5 w-1 rounded-full ${
                      isDark
                        ? "bg-gradient-to-b from-purple-500 to-blue-500"
                        : "bg-gradient-to-b from-blue-400 to-indigo-500"
                    }`}
                  ></span>
                  Send Us a Message
                </h2>

                <Card
                  className={
                    isDark
                      ? "bg-black/30 border-white/5"
                      : "bg-white/60 border-black/5 shadow-md"
                  }
                  isDark={isDark}
                >
                  <div className="p-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="full-name-contact"
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="full-name-contact"
                          name="name"
                          placeholder="Enter your full name"
                          className={`w-full p-3 rounded-lg border ${
                            isDark
                              ? "bg-black/30 border-white/20 text-white placeholder:text-gray-500"
                              : "bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none`}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          placeholder="Enter your email"
                          className={`w-full p-3 rounded-lg border ${
                            isDark
                              ? "bg-black/30 border-white/20 text-white placeholder:text-gray-500"
                              : "bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none`}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="write-message-contact"
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Your Message
                        </label>
                        <textarea
                          id="write-message-contact"
                          name="message"
                          placeholder="Write your message"
                          rows="5"
                          className={`w-full p-3 rounded-lg border ${
                            isDark
                              ? "bg-black/30 border-white/20 text-white placeholder:text-gray-500"
                              : "bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none`}
                          required
                        />
                      </div>
                      <motion.button
                        id="send-message-contact"
                        type="submit"
                        className="relative overflow-hidden group text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full h-12 flex gap-2 items-center justify-center px-6 w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <span className="relative flex items-center gap-2">
                          <span>Send Message</span>
                          <Send
                            size={16}
                            className="group-hover:translate-x-1 transition-transform duration-200"
                          />
                        </span>
                      </motion.button>
                    </form>
                  </div>
                </Card>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Card Component
const Card = ({ children, className = "", isDark }) => (
  <div
    className={`rounded-xl overflow-hidden ${
      isDark
        ? "backdrop-blur-md bg-black/20 border border-white/10"
        : "backdrop-blur-md bg-white/70 border border-black/5 shadow-xl"
    } ${className}`}
  >
    {children}
  </div>
);

// Contact Item Component
const ContactItem = ({
  icon,
  title,
  content,
  isDark,
  isLink = false,
  href = "",
}) => (
  <div className="flex items-start gap-4">
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isDark
          ? "bg-gradient-to-br from-purple-500/30 to-purple-500/10"
          : "bg-gradient-to-br from-blue-400/30 to-blue-400/10"
      }`}
    >
      <div className="text-[--secondary-bg]">{icon}</div>
    </div>
    <div>
      <p className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
        {title}
      </p>
      {isLink ? (
        <a
          href={href}
          className={`font-medium ${
            isDark
              ? "text-white hover:text-blue-400"
              : "text-gray-800 hover:text-blue-600"
          } transition-colors duration-200`}
        >
          {content}
        </a>
      ) : (
        <p
          className={
            isDark ? "text-white font-medium" : "text-gray-800 font-medium"
          }
        >
          {content}
        </p>
      )}
    </div>
  </div>
);

// Social Media Card Component
const SocialMediaCard = ({ icon, name, link, isDark }) => (
  <Link href={link} target="_blank" rel="noopener noreferrer">
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`p-4 rounded-xl flex items-center gap-3 ${
        isDark
          ? "bg-black/30 border border-white/10 hover:bg-white/5"
          : "bg-white/60 border border-black/5 hover:bg-black/5"
      } transition-colors duration-200`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isDark
            ? "bg-gradient-to-br from-purple-500/30 to-purple-500/10"
            : "bg-gradient-to-br from-blue-400/30 to-blue-400/10"
        }`}
      >
        <div className="text-[--secondary-bg]">{icon}</div>
      </div>
      <span
        className={
          isDark ? "text-white font-medium" : "text-gray-800 font-medium"
        }
      >
        {name}
      </span>
      <ArrowRight size={16} className="ml-auto text-gray-400" />
    </motion.div>
  </Link>
);

export default Contact;
