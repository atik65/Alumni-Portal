"use client";

import axiosRequest from "@/lib/axiosRequest";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// send otp

export const useSendOtp = () => {
  return useMutation({
    mutationKey: "sendOtp",
    mutationFn: async (body) =>
      await axiosRequest({
        url: `/send-otp/`,
        method: "POST",
        data: body,
      }),
  });
};

// signup

export const useRegister = () => {
  return useMutation({
    mutationKey: "signup",
    mutationFn: async (body) =>
      await axiosRequest({
        url: `/signup/`,
        method: "POST",
        data: body,
      }),
  });
};

// forget pass otp verify

export const useForgetPassOtpVerify = () => {
  return useMutation({
    mutationKey: "forgetPassOtpVerify",
    mutationFn: async (body) =>
      await axiosRequest({
        url: `/verify-otp/`,
        method: "POST",
        data: body,
      }),
  });
};

// forget pass change pass

export const useForgetPassChangePass = () => {
  return useMutation({
    mutationKey: "forgetPassChangePass",
    mutationFn: async (body) =>
      await axiosRequest({
        url: `/change-password/`,
        method: "POST",
        data: body,
      }),
  });
};

// password change

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationKey: "passwordChnage",
    mutationFn: async (body) =>
      await axiosRequest({
        url: `/password-change/`,
        method: "POST",
        data: body,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("userInfo");
    },
  });
};

// otp verify
export const useOtpVerify = () => {
  return useMutation({
    mutationKey: "OtpVerify",
    mutationFn: async (body) =>
      await axiosRequest({
        url: `/verify-sms-otp/`,
        method: "POST",
        data: body,
      }),
  });
};

export const useGetUserDetails = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () =>
      await axiosRequest({
        url: `/user-info/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("userInfo");
    },
  });
};
