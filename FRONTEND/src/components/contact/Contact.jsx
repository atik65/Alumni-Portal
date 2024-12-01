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
                  className="max-w-4xl mx-auto p-5 bg-[--core-bg] text-[--base-text] dark:bg-black dark:text-white rounded-lg shadow-lg"
            >
                  {/* Header Section */}
                  <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
                        <p className="text-lg opacity-70">We'd love to hear from you! Reach out to us for any inquiries.</p>
                  </div>

                  {/* Contact Information Section */}
                  <div className="grid gap-10 lg:grid-cols-2">
                        {/* Contact Details */}
                        <div>
                              <h3 className="text-lg font-semibold mb-4">University Contact Details</h3>
                              <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                          <MapPin size={20} className="text-[--secondary-bg]" />
                                          <span>
                                                University of Asia Pacific, 74/A, Green Road, Dhaka 1205, Bangladesh
                                          </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                          <Phone size={20} className="text-[--secondary-bg]" />
                                          <span>+880 9613 803213</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                          <Mail size={20} className="text-[--secondary-bg]" />
                                          <span>
                                                <a href="mailto:info@uap-bd.edu" className="text-[--secondary-bg] hover:underline">
                                                      info@uap-bd.edu
                                                </a>
                                          </span>
                                    </div>
                              </div>
                        </div>

                        {/* Social Media Links */}
                        <div>
                              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                              <div className="flex gap-5 justify-center">
                                    <SocialMediaButton icon={<Facebook size={20} />} link="https://www.facebook.com/UAP.Bangladesh" />
                                    <SocialMediaButton icon={<Twitter size={20} />} link="https://twitter.com/UAP_BD" />
                                    <SocialMediaButton icon={<Linkedin size={20} />} link="https://www.linkedin.com/school/uap-bd/" />
                                    <SocialMediaButton icon={<Instagram size={20} />} link="https://www.instagram.com/uap.bd/" />
                              </div>
                        </div>
                  </div>

                  {/* Contact Form Section */}
                  <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                        <form>
                              <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm">Full Name</label>
                                    <input
                                          type="text"
                                          id="name"
                                          name="name"
                                          className="w-full p-3 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                                          required
                                    />
                              </div>

                              <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm">Email Address</label>
                                    <input
                                          type="email"
                                          id="email"
                                          name="email"
                                          className="w-full p-3 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                                          required
                                    />
                              </div>

                              <div className="mb-4">
                                    <label htmlFor="message" className="block text-sm">Your Message</label>
                                    <textarea
                                          id="message"
                                          name="message"
                                          rows="4"
                                          className="w-full p-3 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                                          required
                                    ></textarea>
                              </div>

                              <div className="text-center">
                                    <button
                                          type="submit"
                                          className="w-full bg-[--secondary-bg] hover:bg-[--secondary-bg-dark] text-white font-semibold p-3 rounded-lg transition-colors"
                                    >
                                          Send Message
                                    </button>
                              </div>
                        </form>
                  </div>

                  {/* Footer Link */}
                  <div className="text-center mt-8">
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

// Social Media Button Component (Same as previous)
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

export default Contact;
