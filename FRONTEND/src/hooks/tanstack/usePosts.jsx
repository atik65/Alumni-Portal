"use client";

import axiosRequest from "../../lib/axiosRequest";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetPosts = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      await axiosRequest({
        url: `/posts/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("jobs");
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data) =>
      await axiosRequest({
        url: `/posts/`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
};

// use Create Comment
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data) =>
      await axiosRequest({
        url: `/posts/${data.post}/comments/`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
};
