"use client";

import axiosRequest from "@/lib/axiosRequest";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetBlogs = () => {
  //   const queryClient = useQueryClient();
  //   const { data: session } = useSession();

  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () =>
      await axiosRequest({
        url: `/blogs/`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${session?.accessToken}`,
        // },
      }),
    // onSuccess: () => {
    //   queryClient.invalidateQueries("blogs");
    // },
  });
};


// create blog

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationKey: "createBlog",
    mutationFn: async (body) =>
      await axiosRequest({
        url: `/blogs/`,
        method: "POST",
        data: body,
        // headers: {
        //   Authorization: `Bearer ${session?.accessToken}`,
        // },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });
};