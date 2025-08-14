import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: ({ fullName, email, password }) => {
          return {
            url: "/signup",
            method: "POST",
            body: { fullName, email, password },
          };
        },
      }),
      login: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: "/login",
            method: "POST",
            body: { email, password },
          };
        },
      }),
      verifyOTP: builder.mutation({
        query: ({ email, otp }) => {
          return {
            url: "/verify-otp",
            method: "POST",
            body: { email, otp },
          };
        },
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation, useVerifyOTPMutation } =
  rootApi;

export default rootApi;
