"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import noPhoto from "../../../public/assets/noPhoto.png";
import userPhoto from "../../../public/assets/user.jpg";
import { Plus } from "lucide-react";
import { useCreatePost, useGetPosts } from "../../hooks/tanstack/usePosts";
import { useGetRoles, useGetUserInfo } from "../../hooks/tanstack/useAlumni";
import { useFormik } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import EventList from "./EventList";

const PostCard = ({ post }) => {
  const { data: userInfo, isLoading } = useGetUserInfo(post?.created_by);

  // console.log("post created by ", post?.created_by);

  const { data: roles, isLoading: isRolesLoading } = useGetRoles();

  console.log("userinfo :>> ", userInfo);

  if (isLoading || isRolesLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-5 border border-gray-200 bg-gray-50 dark:bg-[--sidebar-bg-dark] rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        <Image
          src={userPhoto}
          alt="John Doe"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {/* {userInfo?.result?.first_name + " " + userInfo?.result?.last_name} */}
            {post?.created_by}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 italic">
            {
              roles?.results?.find((role) => role.id === userInfo?.result?.role)
                ?.role_name
            }
          </span>
        </div>
      </div>
      <p className="text-gray-600 mt-5 dark:text-gray-300">{post?.post}</p>
    </div>
  );
};

export default PostCard;
