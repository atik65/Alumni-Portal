"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosRequest from "@/lib/axiosRequest";
import { useSession } from "next-auth/react";

import { useQuery } from "@tanstack/react-query";


export const useGetEvent = () => {
      const queryClient = useQueryClient();
      const { data: session } = useSession();

      return useQuery({
            queryKey: ["event"],
            queryFn: async () =>
                  await axiosRequest({
                        url: `/events/`,
                        method: "GET",
                        headers: {
                              Authorization: `Bearer ${session?.accessToken}`,
                        },
                  }),
            onSuccess: () => {
                  queryClient.invalidateQueries(["events"]); // Re-fetch the event list after creation
            },
      });
};



export const useCreateEvent = () => {
      const queryClient = useQueryClient();
      const { data: session } = useSession();

      return useMutation({
            mutationKey: "createEvent",
            mutationFn: async (body) =>
                  await axiosRequest({
                        url: `/events/`,
                        method: "POST",
                        data: body,
                        headers: {
                              Authorization: `Bearer ${session?.accessToken}`,
                        },
                  }),
            onSuccess: () => {
                  queryClient.invalidateQueries(["events"]); // Re-fetch the event list after creation
            },
      });
};
