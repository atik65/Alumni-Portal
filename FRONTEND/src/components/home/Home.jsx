"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { Plus } from "lucide-react";
import { useCreatePost, useGetPosts } from "../../hooks/tanstack/usePosts";
import { useGetRoles, useGetUserInfo } from "../../hooks/tanstack/useAlumni";
import { useFormik } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import EventList from "./EventList";
import PostCard from "./PostCard";
import HomeLeft from "./HomeLeft";
import PostBox from "./PostBox";
const Home = () => {
  const { data: posts, isLoading } = useGetPosts();

  const { mutateAsync, isPending } = useCreatePost();

  const { values, errors, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        post: "",
      },
      validationSchema: Yup.object({
        post: Yup.string().required("Required"),
      }),
      onSubmit: (values) => {
        try {
          const res = mutateAsync(values);
          resetForm();

          enqueueSnackbar(res?.message || "Post created successfully", {
            variant: "default",
          });
        } catch (e) {
          enqueueSnackbar(e?.message || "Something went wrong", {
            variant: "error",
          });
        }
      },
    });

  return (
    <div className="container mx-auto xl:space-y-0 grid grid-cols-12 gap-5 py-8 pt-0  px-4 relative ">
      <div className="col-span-12 xl:col-span-3 lg:sticky lg:top-0 max-h-[88vh] overflow-y-auto">
        <HomeLeft />
      </div>
      {/* Left Side: Posts Section */}
      {/* <PostBox />  */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-12 xl:col-span-5 dark:bg-[--sidebar-bg-dark]   rounded-lg p-8 px-0 pt-0 "
      >
        {/* New Post Input */}
        <PostBox />

        {/* Example Posts */}
        <div className="space-y-6">
          {posts?.results?.map((post) => (
            <PostCard post={post} key={post?.id} />
          ))}
        </div>
      </motion.div>

      {/* Right Side: Events Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="col-span-12 xl:col-span-4 bg-white dark:bg-[--sidebar-bg-dark] p-6  rounded-lg shadow-md sticky top-0 max-h-[88vh] overflow-y-hidden overflow-x-hidden home-events px-4"
      >
        <EventList />
      </motion.div>
    </div>
  );
};

export default Home;
