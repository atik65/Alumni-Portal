"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";
import { useCreateBlog } from "@/hooks/tanstack/useBlogs";
import { Button } from "../ui/button";
import { enqueueSnackbar } from "notistack";
import Image from "next/image";
const ProfileContainer = () => {
  const { data: session } = useSession();
  const { mutateAsync, isPending } = useCreateBlog();

  console.log("session = ", session);


  return (
    <div className="container mx-auto min-h-[60vh] flex items-center">
      {/* preview user info */}
      <div>
        {/* show user info */}

        <h1>
          Name: {session?.user?.user_info?.first_name}{" "}
          {session?.user?.user_info?.last_name}
          
        </h1>
      </div>
    </div>
  );
};

export default ProfileContainer;
