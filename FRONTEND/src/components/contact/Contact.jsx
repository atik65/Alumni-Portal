"use client";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-8 dark:shadow-gray-900 bg-[--core-bg] text-[--base-text] dark:bg-[--sidebar-bg] dark:text-white rounded-lg shadow-lg"
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-600 dark:text-[--base-text-dark]">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          We value our alumni community. Reach out to us with your queries,
          suggestions, or feedback.
        </p>
      </div>

      {/* Contact Information and Social Media */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-[--base-text-dark]">
            Contact Information
          </h2>
          <div className="flex items-center gap-4">
            <MapPin size={28} className="text-blue-600" />
            <span>
              University of Asia Pacific, 74/A, Green Road, Dhaka 1205,
              Bangladesh
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Phone size={28} className="text-blue-600" />
            <span>+880 9613 803213</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={28} className="text-blue-600" />
            <a
              href="mailto:info@uap-bd.edu"
              className="hover:underline text-blue-600"
            >
              info@uap-bd.edu
            </a>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-[--base-text-dark]">Follow Us</h2>
          <div className="flex gap-6">
            {[
              {
                icon: <Facebook size={28} />,
                link: "https://www.facebook.com/UAP.Bangladesh",
              },
              {
                icon: <Twitter size={28} />,
                link: "https://twitter.com/UAP_BD",
              },
              {
                icon: <Linkedin size={28} />,
                link: "https://www.linkedin.com/school/uap-bd/",
              },
              {
                icon: <Instagram size={28} />,
                link: "https://www.instagram.com/uap.bd/",
              },
            ].map(({ icon, link }, idx) => (
              <SocialMediaButton key={idx} icon={icon} link={link} />
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 dark:text-[--base-text-dark]">
          Send Us a Message
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name-contact"
              name="name"
              placeholder="Enter your full name"
              className="w-full mt-2 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Message
            </label>
            <textarea
              id="write-message-contact"
              name="message"
              placeholder="Write your message"
              rows="5"
              className="w-full mt-2 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>
          {/* send message */}

        <div className="mt-5">
          <button
            id="send-message-contact"
            onClick={() => {
              enqueueSnackbar("Message is Sent", {
                variant: "default",
              });
            }}
            //   href={"/portal/alumni-list/1"}
            className=" text-sm font-semibold hover:bg-[--light-bg] dark:hover:bg-[--light-bg-dark] hover:text-[--secondary-text] hover:dark:text-[--base-text-dark] w-full rounded h-10 flex gap-2 items-center justify-center bg-[--secondary-bg] dark:bg-[--secondary-bg] text-white duration-200" 
          >
            <span className="">Send Message</span>

            <Mail size={17} />
          </button>
        </div>
        </form>
      </div>
    </motion.div>
  );
};

const SocialMediaButton = ({ icon, link }) => (
  <Link href={link} target="_blank">
    <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200">
      <div className="text-blue-600 dark:text-blue-400">{icon}</div>
    </div>
  </Link>
);

export default Contact;
