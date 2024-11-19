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
  // {
  //     "user": {
  //         "name": "Md. Atikul Islam Atik",
  //         "email": "21201063@uap-bd.edu",
  //         "image": "https://lh3.googleusercontent.com/a/ACg8ocJSOqmFzgTyGqSQsiPyfTcwvvrp6LPjQ6t9B2PM6dws0FxXANk=s96-c"
  //     },
  //     "expires": "2024-12-18T19:58:02.224Z",
  //     "accessToken": "ya29.a0AeDClZCiPvg8U8NgIH3noh_bXHOOo6I2rx8C7N0-9BLdmwwvfKiJODsnmvB66qByWId6ZkgCdxeCr5AQzFMfWFTzK2gYdHzbgcYU7gkiwIiAAsx4lWfI-Pf21fuz-ST7dYRZjAdtIL_CQkh_EPVwtWPuoPk-bI6ZANg9cr7eaCgYKAdwSARESFQHGX2MickK2S_SKh0gnBFIFQl0n1A0175",
  //     "provider": "google"
  // }

  return (
    <div className="container mx-auto min-h-[60vh] flex items-center">
      {/* preview user info */}

      <div className="mt-10 w-full">
        <div className="flex flex-col justify-center items-center">
          <Image
            height={200}
            width={200}
            className="w-32 h-32 rounded-full"
            src={session?.user?.image}
            alt="Profile"
          />
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
          <p className="text-gray-600">{session?.user?.email}</p>

          <button
            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sign Out
          </button>

          {/* create blog */}

          <Button
            className="mt-4"
            disabled={isPending}
            onClick={async () => {
              try {
                const res = await mutateAsync({
                  title:
                    "My First Blog from UAP Alumni Portal -- Frontend updated one",
                  content: "This is my first blog from UAP Alumni Portal",
                });

                enqueueSnackbar("Blog created successfully", {
                  variant: "default",
                });
              } catch (error) {
                console.log(error);

                enqueueSnackbar(error?.message || "Something went wrong", {
                  variant: "error",
                });
              }
            }}
          >
            Create Blog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
