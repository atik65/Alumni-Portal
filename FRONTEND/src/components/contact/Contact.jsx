"use client";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react"; // Update with your icon imports
import Link from "next/link";

const Contact = () => {
      return (
            <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-5xl mx-auto p-6 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white rounded-lg shadow-lg"
            >
                  {/* Header Section */}
                  <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-2 text-[--secondary-bg]">Contact Us</h1>
                        <p className="text-lg opacity-80 mb-6">
                              We'd love to hear from you! Reach out to us for any inquiries or feedback.
                        </p>
                  </div>

                  {/* Contact Information Section */}
                  <div className="grid gap-10 lg:grid-cols-2 mb-10">
                        {/* Contact Details */}
                        <div>
                              <h3 className="text-2xl font-semibold mb-4 text-[--secondary-bg]">University Contact Details</h3>
                              <div className="space-y-6 text-sm opacity-80">
                                    <div className="flex items-center gap-3">
                                          <MapPin size={24} className="text-[--secondary-bg]" />
                                          <span>
                                                University of Asia Pacific, 74/A, Green Road, Dhaka 1205, Bangladesh
                                          </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                          <Phone size={24} className="text-[--secondary-bg]" />
                                          <span>+880 9613 803213</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                          <Mail size={24} className="text-[--secondary-bg]" />
                                          <span>
                                                <a
                                                      href="mailto:info@uap-bd.edu"
                                                      className="text-[--secondary-bg] hover:underline"
                                                >
                                                      info@uap-bd.edu
                                                </a>
                                          </span>
                                    </div>
                              </div>
                        </div>

                        {/* Social Media Links */}
                        <div>
                              <h3 className="text-2xl font-semibold mb-4 text-[--secondary-bg]">Follow Us</h3>
                              <div className="flex gap-6 justify-center">
                                    <SocialMediaButton icon={<Facebook size={24} />} link="https://www.facebook.com/UAP.Bangladesh" />
                                    <SocialMediaButton icon={<Twitter size={24} />} link="https://twitter.com/UAP_BD" />
                                    <SocialMediaButton icon={<Linkedin size={24} />} link="https://www.linkedin.com/school/uap-bd/" />
                                    <SocialMediaButton icon={<Instagram size={24} />} link="https://www.instagram.com/uap.bd/" />
                              </div>
                        </div>
                  </div>

                  {/* Contact Form Section */}
                  <div className="mt-12">
                        <h3 className="text-2xl font-semibold mb-6 text-[--secondary-bg]">Get in Touch</h3>
                        <form>
                              <div className="mb-6">
                                    <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                                    <input
                                          type="text"
                                          id="name"
                                          name="name"
                                          placeholder="Enter your full name"
                                          className="w-full p-4 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[--secondary-bg] focus:border-[--secondary-bg]"
                                          required
                                    />
                              </div>

                              <div className="mb-6">
                                    <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                                    <input
                                          type="email"
                                          id="email"
                                          name="email"
                                          placeholder="Enter your email"
                                          className="w-full p-4 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[--secondary-bg] focus:border-[--secondary-bg]"
                                          required
                                    />
                              </div>

                              <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium">Your Message</label>
                                    <textarea
                                          id="message"
                                          name="message"
                                          placeholder="Write your message here"
                                          rows="5"
                                          className="w-full p-4 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[--secondary-bg] focus:border-[--secondary-bg]"
                                          required
                                    ></textarea>
                              </div>

                              <div className="text-center">
                                    <button
                                          type="submit"
                                          className="w-full bg-[--secondary-bg] hover:bg-[--secondary-bg-dark] text-white font-semibold p-4 rounded-lg transition-colors"
                                    >
                                          Send Message
                                    </button>
                              </div>
                        </form>
                  </div>

                  {/* Footer Link */}
                  <div className="text-center mt-10">
                        <Link
                              href="https://www.uap-bd.edu/"
                              target="_blank"
                              className="text-sm text-[--secondary-bg] hover:underline"
                        >
                              Visit the University Website
                        </Link>
                  </div>
            </motion.div>
      );
};

// Social Media Button Component
const SocialMediaButton = ({ icon, link }) => (
      <button
            className="h-10 w-10 grid place-items-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
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

export default Contact;
