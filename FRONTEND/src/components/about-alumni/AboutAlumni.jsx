"use client";
import { motion } from "framer-motion";
import { User, Users, Trophy, Star, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"; // Update with your icon imports
import Link from "next/link";

const AboutAlumni = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-5 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white rounded-lg shadow-lg"
    >
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">About the Alumni Network</h1>
        <p className="text-lg opacity-70 mb-4">Connecting past and future generations of UAP alumni to build a stronger network.</p>
        <Link
          href="/portal/alumni-list"
          className="text-sm font-semibold bg-[--secondary-bg] dark:bg-[--secondary-bg-dark] text-white w-full rounded h-10 flex gap-2 items-center justify-center hover:bg-[--secondary-bg-dark] dark:hover:bg-[--secondary-bg] hover:text-white duration-200"
        >
          Explore Alumni Profiles
        </Link>
      </div>

      {/* Alumni Overview */}
      <div className="grid gap-10 md:grid-cols-2 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Alumni</h2>
          <p className="text-sm opacity-80">
            The University of Asia Pacific alumni network consists of thousands of passionate professionals
            who contribute significantly to industries globally. From software developers to business leaders,
            our alumni community is diverse and strong, continuously giving back to the university and society.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-[--secondary-bg] p-5 rounded-full">
            <Users size={60} className="text-white" />
          </div>
        </div>
      </div>

      {/* Key Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-8 text-center">
        <StatCard title="500+" icon={<User size={30} />} description="Alumni Members" />
        <StatCard title="150+" icon={<Trophy size={30} />} description="Awards Won" />
        <StatCard title="50+" icon={<Star size={30} />} description="Global Events" />
        <StatCard title="300+" icon={<Users size={30} />} description="Collaborations" />
      </div>

      {/* Alumni Testimonials Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">What Our Alumni Say</h2>
        <div className="flex justify-center gap-8">
          <Testimonial
            name="Atikul Islam"
            role="Software Developer"
            message="The UAP alumni network has been instrumental in connecting me with industry professionals and learning opportunities. It’s been a huge support for my career growth."
          />
          <Testimonial
            name="John Doe"
            role="Business Analyst"
            message="I’ve been able to collaborate with fellow alumni on several projects that have not only enhanced my skills but also created lasting professional relationships."
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-4">Follow Us on Social Media</h3>
        <div className="flex justify-center gap-5">
          <SocialMediaButton icon={<Facebook size={20} />} link="https://www.facebook.com/UAP.Bangladesh" />
          <SocialMediaButton icon={<Twitter size={20} />} link="https://twitter.com/UAP_BD" />
          <SocialMediaButton icon={<Linkedin size={20} />} link="https://www.linkedin.com/school/uap-bd/" />
          <SocialMediaButton icon={<Instagram size={20} />} link="https://www.instagram.com/uap.bd/" />
        </div>
      </div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ title, icon, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <div className="text-[--secondary-bg] dark:text-[--secondary-bg-dark] mb-3">{icon}</div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-70">{description}</p>
  </div>
);

// Testimonial Component
const Testimonial = ({ name, role, message }) => (
  <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md w-72">
    <p className="italic text-sm mb-3">"{message}"</p>
    <h4 className="font-semibold">{name}</h4>
    <p className="text-sm opacity-70">{role}</p>
  </div>
);

// Social Media Button Component (Reused)
const SocialMediaButton = ({ icon, link }) => (
  <button
    className="h-8 w-8 grid place-items-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
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

export default AboutAlumni;
