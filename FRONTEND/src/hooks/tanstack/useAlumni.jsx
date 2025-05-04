"use client";

import axiosRequest from "../../lib/axiosRequest";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetRoles = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["roles"],
    queryFn: async () =>
      await axiosRequest({
        url: `/auth/roles/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("roles");
    },
  });
};

export const useGetUsers = ({ limit = 10, offset = 0, role = "" }) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["users", limit, offset, role],
    queryFn: async () =>
      await axiosRequest({
        url: `/auth/users/?limit=${limit}&offset=${offset}&role=${role}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useGetUserInfo = (id) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["user", id],
    queryFn: async () =>
      await axiosRequest({
        url: `/auth/users/${id}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("user", id);
    },
  });
};
