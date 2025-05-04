"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Mail,
  Phone,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useGetUserDetails } from "../../hooks/tanstack/useAuth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";
import { useTheme } from "next-themes";

const ProfileContainer = () => {
  const { data: userInfo, isLoading } = useGetUserDetails();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Function to get initials from name
  const getInitials = (firstName = "", lastName = "") => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Function to check if social media links exist
  const hasSocialMedia =
    userInfo &&
    (userInfo.facebook ||
      userInfo.twitter ||
      userInfo.linkedin ||
      userInfo.instagram);

  return (
    <div
      className={`min-h-screen w-full p-4 md:p-8 rounded-xl ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50"
      }`}
    >
      <AnimatePresence>
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto"
          >
            {/* Main Profile Card */}
            <Card
              className={`overflow-hidden ${
                isDark
                  ? "backdrop-blur-md bg-black/20 border-white/10"
                  : "backdrop-blur-md bg-white/70 border-black/5 shadow-xl"
              }`}
            >
              {/* Header with gradient banner */}
              <div
                className={`h-32 relative ${
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
              </div>

              <div className="px-6 pb-6 relative">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4 flex justify-between items-end">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div
                      className={`absolute inset-0 rounded-full blur-sm opacity-70 animate-pulse ${
                        isDark
                          ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                          : "bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400"
                      }`}
                      style={{ padding: "3px" }}
                    />
                    <Avatar
                      className={`h-32 w-32 relative ${
                        isDark
                          ? "border-4 border-black/20"
                          : "border-4 border-white/80"
                      }`}
                    >
                      <AvatarImage
                        className="w-full object-cover object-top"
                        src={userInfo?.avatar || "/placeholder.svg"}
                        alt={`${userInfo?.first_name} ${userInfo?.last_name}`}
                      />
                      <AvatarFallback
                        className={`text-white text-2xl ${
                          isDark
                            ? "bg-gradient-to-br from-violet-600 to-indigo-600"
                            : "bg-gradient-to-br from-blue-500 to-indigo-500"
                        }`}
                      >
                        {getInitials(userInfo?.first_name, userInfo?.last_name)}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>

                  <Badge
                    className={`border-0 py-1.5 ${
                      isDark
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                        : "bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white"
                    }`}
                  >
                    {userInfo?.role?.role_name || "Alumni"}
                  </Badge>
                </div>

                {/* Name and Title */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <h1
                    className={`text-3xl font-bold ${
                      isDark
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                        : "bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700"
                    }`}
                  >
                    {userInfo?.first_name} {userInfo?.last_name}
                  </h1>
                  <div className="flex flex-wrap gap-2 items-center mt-1">
                    {userInfo?.batch && (
                      <Badge
                        variant="outline"
                        className={
                          isDark
                            ? "text-gray-300 border-gray-700"
                            : "text-gray-700 border-gray-300"
                        }
                      >
                        Batch {userInfo.batch}
                      </Badge>
                    )}
                    {userInfo?.graduation_year && (
                      <Badge
                        variant="outline"
                        className={
                          isDark
                            ? "text-gray-300 border-gray-700"
                            : "text-gray-700 border-gray-300"
                        }
                      >
                        Class of {userInfo.graduation_year}
                      </Badge>
                    )}
                    {userInfo?.current_position && (
                      <p
                        className={
                          isDark
                            ? "text-gray-400 text-sm"
                            : "text-gray-600 text-sm"
                        }
                      >
                        {userInfo.current_position}
                        {userInfo?.current_company &&
                          ` at ${userInfo.current_company}`}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2 space-y-6"
                  >
                    {/* About Section */}
                    {userInfo?.description && (
                      <InfoSection title="About" isDark={isDark}>
                        <p
                          className={
                            isDark
                              ? "text-gray-300 leading-relaxed"
                              : "text-gray-700 leading-relaxed"
                          }
                        >
                          {userInfo.description}
                        </p>
                      </InfoSection>
                    )}

                    {/* Skills Section */}
                    {userInfo?.skills && (
                      <InfoSection title="Skills" isDark={isDark}>
                        <div className="flex flex-wrap gap-2">
                          {userInfo?.skills?.map((skill, index) => (
                            <Badge
                              key={index}
                              className={
                                isDark
                                  ? "bg-indigo-900/50 hover:bg-indigo-800/50 text-gray-200"
                                  : "bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                              }
                            >
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      </InfoSection>
                    )}

                    {/* Achievements Section */}
                    {userInfo?.achievements && (
                      <InfoSection title="Achievements" isDark={isDark}>
                        <p
                          className={
                            isDark
                              ? "text-gray-300 leading-relaxed"
                              : "text-gray-700 leading-relaxed"
                          }
                        >
                          {userInfo.achievements}
                        </p>
                      </InfoSection>
                    )}

                    {/* Interests Section */}
                    {userInfo?.interests && (
                      <InfoSection title="Interests" isDark={isDark}>
                        <div className="flex flex-wrap gap-2">
                          {userInfo?.interests?.map((interest, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className={
                                isDark
                                  ? "text-gray-300 border-gray-700"
                                  : "text-gray-700 border-gray-300"
                              }
                            >
                              {interest.trim()}
                            </Badge>
                          ))}
                        </div>
                      </InfoSection>
                    )}
                  </motion.div>

                  {/* Right Column */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Contact Card */}
                    <Card
                      className={
                        isDark
                          ? "bg-black/30 border-white/5 overflow-hidden"
                          : "bg-white/60 border-black/5 shadow-md overflow-hidden"
                      }
                    >
                      <CardContent className="p-4 space-y-4">
                        <h3
                          className={`text-lg font-semibold flex items-center gap-2 ${
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
                        </h3>

                        <div className="space-y-3">
                          {userInfo?.email && (
                            <ContactItem
                              icon={<Mail size={16} />}
                              label="Email"
                              isDark={isDark}
                            >
                              <a
                                href={`mailto:${userInfo.email}`}
                                className={
                                  isDark
                                    ? "text-blue-400 hover:text-blue-300 transition-colors"
                                    : "text-blue-600 hover:text-blue-700 transition-colors"
                                }
                              >
                                {userInfo.email}
                              </a>
                            </ContactItem>
                          )}

                          {userInfo?.phone && (
                            <ContactItem
                              icon={<Phone size={16} />}
                              label="Phone"
                              isDark={isDark}
                            >
                              <a
                                href={`tel:${userInfo.phone}`}
                                className={
                                  isDark
                                    ? "text-blue-400 hover:text-blue-300 transition-colors"
                                    : "text-blue-600 hover:text-blue-700 transition-colors"
                                }
                              >
                                {userInfo.phone}
                              </a>
                            </ContactItem>
                          )}

                          {userInfo?.address && (
                            <ContactItem
                              icon={<MapPin size={16} />}
                              label="Location"
                              isDark={isDark}
                            >
                              {userInfo.address}
                            </ContactItem>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Experience */}
                    {userInfo?.experience && (
                      <Card
                        className={
                          isDark
                            ? "bg-black/30 border-white/5 overflow-hidden"
                            : "bg-white/60 border-black/5 shadow-md overflow-hidden"
                        }
                      >
                        <CardContent className="p-4">
                          <h3
                            className={`text-lg font-semibold flex items-center gap-2 mb-3 ${
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
                            Experience
                          </h3>
                          <p
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {userInfo.experience} years
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Social Media */}
                    {hasSocialMedia && (
                      <Card
                        className={
                          isDark
                            ? "bg-black/30 border-white/5 overflow-hidden"
                            : "bg-white/60 border-black/5 shadow-md overflow-hidden"
                        }
                      >
                        <CardContent className="p-4">
                          <h3
                            className={`text-lg font-semibold flex items-center gap-2 mb-3 ${
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
                            Connect
                          </h3>
                          <div className="flex gap-3 flex-wrap">
                            {userInfo?.facebook && (
                              <SocialButton
                                icon={<Facebook size={18} />}
                                href={userInfo.facebook}
                                color={
                                  isDark
                                    ? "from-blue-600 to-blue-700"
                                    : "from-blue-500 to-blue-600"
                                }
                              />
                            )}
                            {userInfo?.twitter && (
                              <SocialButton
                                icon={<Twitter size={18} />}
                                href={userInfo.twitter}
                                color={
                                  isDark
                                    ? "from-sky-500 to-sky-600"
                                    : "from-sky-400 to-sky-500"
                                }
                              />
                            )}
                            {userInfo?.linkedin && (
                              <SocialButton
                                icon={<Linkedin size={18} />}
                                href={userInfo.linkedin}
                                color={
                                  isDark
                                    ? "from-blue-700 to-blue-800"
                                    : "from-blue-600 to-blue-700"
                                }
                              />
                            )}
                            {userInfo?.instagram && (
                              <SocialButton
                                icon={<Instagram size={18} />}
                                href={userInfo.instagram}
                                color={
                                  isDark
                                    ? "from-pink-600 to-purple-600"
                                    : "from-pink-500 to-purple-500"
                                }
                              />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                </div>

                {/* Back Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <Button
                    asChild
                    variant="outline"
                    className={
                      isDark
                        ? "bg-black/30 border-white/10 text-white hover:bg-white/10 hover:text-white"
                        : "bg-white/50 border-black/10 text-gray-800 hover:bg-black/5 hover:text-gray-900"
                    }
                  >
                    <Link href="/portal/alumni-list">
                      <ArrowLeft size={16} className="mr-2" />
                      Back to Alumni List
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Info Section Component
const InfoSection = ({ title, children, isDark }) => (
  <div className="space-y-2">
    <h3
      className={`text-lg font-semibold flex items-center gap-2 ${
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
      {title}
    </h3>
    <div className="pl-3">{children}</div>
  </div>
);

// Contact Item Component
const ContactItem = ({ icon, label, children, isDark }) => (
  <div className="flex items-start gap-2 text-sm">
    <div className={isDark ? "text-gray-400 mt-0.5" : "text-gray-500 mt-0.5"}>
      {icon}
    </div>
    <div>
      <p className={isDark ? "text-gray-500" : "text-gray-600"}>{label}</p>
      <div className={isDark ? "text-gray-300" : "text-gray-700"}>
        {children}
      </div>
    </div>
  </div>
);

// Social Media Button Component
const SocialButton = ({ icon, href, color }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br ${color} text-white shadow-lg`}
    >
      {icon}
    </motion.div>
  </Link>
);

// Loading Skeleton
const ProfileSkeleton = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <Card
        className={
          isDark
            ? "backdrop-blur-md bg-black/20 border border-white/10 overflow-hidden"
            : "backdrop-blur-md bg-white/70 border border-black/5 shadow-xl overflow-hidden"
        }
      >
        <div
          className={`h-32 relative ${
            isDark
              ? "bg-gradient-to-r from-violet-600/50 to-indigo-600/50"
              : "bg-gradient-to-r from-sky-400/50 to-indigo-400/50"
          }`}
        />

        <div className="px-6 pb-6 relative">
          <div className="relative -mt-16 mb-4 flex justify-between items-end">
            <Skeleton
              className={`h-32 w-32 rounded-full ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            />
            <Skeleton
              className={`h-6 w-24 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
            />
          </div>

          <Skeleton
            className={`h-10 w-64 mb-2 ${
              isDark ? "bg-gray-800" : "bg-gray-200"
            }`}
          />
          <Skeleton
            className={`h-5 w-40 mb-6 ${
              isDark ? "bg-gray-800" : "bg-gray-200"
            }`}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <Skeleton
                  className={`h-7 w-32 ${
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
                <Skeleton
                  className={`h-4 w-full ${
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
                <Skeleton
                  className={`h-4 w-full ${
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
                <Skeleton
                  className={`h-4 w-3/4 ${
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Skeleton
                  className={`h-7 w-32 ${
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton
                      key={i}
                      className={`h-6 w-20 ${
                        isDark ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card
                className={
                  isDark
                    ? "bg-black/30 border-white/5"
                    : "bg-white/60 border-black/5 shadow-md"
                }
              >
                <CardContent className="p-4 space-y-4">
                  <Skeleton
                    className={`h-7 w-48 ${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Skeleton
                          className={`h-5 w-5 ${
                            isDark ? "bg-gray-800" : "bg-gray-200"
                          }`}
                        />
                        <div className="space-y-1 flex-1">
                          <Skeleton
                            className={`h-4 w-20 ${
                              isDark ? "bg-gray-800" : "bg-gray-200"
                            }`}
                          />
                          <Skeleton
                            className={`h-4 w-full ${
                              isDark ? "bg-gray-800" : "bg-gray-200"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card
                className={
                  isDark
                    ? "bg-black/30 border-white/5"
                    : "bg-white/60 border-black/5 shadow-md"
                }
              >
                <CardContent className="p-4">
                  <Skeleton
                    className={`h-7 w-32 mb-3 ${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  />
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton
                        key={i}
                        className={`h-10 w-10 rounded-full ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Skeleton
              className={`h-10 w-40 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileContainer;
