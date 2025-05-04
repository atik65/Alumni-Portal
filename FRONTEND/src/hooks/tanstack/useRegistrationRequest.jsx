"use client";

import axiosRequest from "../../lib/axiosRequest";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetRegistrationRequests = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["registration-requests"],
    queryFn: async () =>
      await axiosRequest({
        url: `/registration-requests/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
  });
};

export const useCreateRegistrationRequest = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data) =>
      await axiosRequest({
        url: `/registration-requests/`,
        method: "POST",
        data: data,
        // headers: {
        //   Authorization: `Bearer ${session?.accessToken}`,
        // },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("registration-requests");
    },
  });
};

// approve registration request
export const useApproveRegistrationRequest = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data) =>
      await axiosRequest({
        url: `/registration-requests/${data.id}/approve/`,
        method: "PUT",
        data: data,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("registration-requests");
    },
  });
};

// reject registration request
export const useRejectRegistrationRequest = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data) =>
      await axiosRequest({
        url: `/registration-requests/${data.id}/reject/`,
        method: "PUT",
        data: data,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("registration-requests");
    },
  });
};