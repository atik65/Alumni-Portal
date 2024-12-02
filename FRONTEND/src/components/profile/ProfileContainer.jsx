"use client";
import { motion } from "framer-motion";
import { Image, Eye, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"; // Update with your icon imports
import Link from "next/link";

const ProfileContainer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 bg-[--core-bg] text-[--base-text] dark:bg-[--sidebar-bg-dark] py-6 dark:text-white rounded-lg shadow-lg"
    >
      {/* Header Section */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-28 h-28">
          <Image
            src="/path/to/avatar.jpg" // Replace with dynamic data or placeholder
            alt="Alumni Avatar"
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Md. Atikul Islam</h1>
          <h2 className="text-lg font-semibold opacity-70">Atik</h2>
          <p className="text-sm italic opacity-70">Software Developer</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p className="text-sm opacity-80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
          explicabo tenetur quidem at unde dolore perspiciatis, reprehenderit
          nihil laborum aliquam maiores dicta facilis labore similique!
        </p>
      </div>

      {/* Social Media Section */}
      <div className="flex items-center gap-5 mb-8 justify-center">
        <SocialMediaButton icon={<Facebook size={20} />} link="#" />
        <SocialMediaButton icon={<Twitter size={20} />} link="#" />
        <SocialMediaButton icon={<Linkedin size={20} />} link="#" />
        <SocialMediaButton icon={<Instagram size={20} />} link="#" />
      </div>

      {/* Contact Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
        <div className="text-sm">
          <p>Email: <a href="mailto:atikul@example.com" className="text-[--secondary-bg] hover:underline">atikul@example.com</a></p>
          <p>Phone: <span className="opacity-80">+123 456 7890</span></p>
          <p>Location: <span className="opacity-80">Dhaka, Bangladesh</span></p>
        </div>
      </div>

      {/* Profile Links */}
      <div>
        <Link
          href="/portal/alumni-list"
          className="text-sm font-semibold bg-[--secondary-bg] dark:bg-[--secondary-bg] text-[--core-bg] dark:text-[--base-text-dark] w-full rounded h-10 flex gap-2 items-center justify-center hover:bg-[--sidebar-bg-dark] dark:hover:text-[--base-text] hover:text-[--core-bg] dark:hover:bg-[--light-bg] transion-colors duration-200"
        >
          Back to Alumni List
          <Eye size={19} />
        </Link>
      </div>
    </motion.div>
  );
};

// Social Media Button Component
const SocialMediaButton = ({ icon, link }) => (
  <button
    className="h-8 w-8 grid place-items-center rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-400 transition-colors duration-200"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Link href={link} target="_blank">
      <div className="text-[--secondary-bg] dark:text-[--secondary-bg-dark]">
        {icon}
      </div>
    </Link>
  </button>
);
export default ProfileContainer;
