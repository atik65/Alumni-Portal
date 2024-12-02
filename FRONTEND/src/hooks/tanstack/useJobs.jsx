"use client";

import axiosRequest from "@/lib/axiosRequest";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationKey: "createJob",
    mutationFn: async (body) =>
      await axiosRequest({
        url: `/jobs/`,
        method: "POST",
        data: body,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("jobs");
    },
  });
};
