import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginCredentials, RegisterCredentials } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: "/user/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials: RegisterCredentials) => ({
        url: "/user/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({
        token,
        newPassword,
      }: {
        token: string;
        newPassword: string;
      }) => ({
        url: `/user/reset-password/${token}`,
        method: "POST",
        body: { newPassword },
      }),
    }),
    checkSession: builder.query({
      query: () => "/user/session",
    }),
    refreshSession: builder.mutation({
      query: () => ({
        url: "/refresh-session",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation, 
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCheckSessionQuery,
  useRefreshSessionMutation,
} = authApi;
