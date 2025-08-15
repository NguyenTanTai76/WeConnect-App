import { logOut } from "@redux/slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // console.log({ store: getState() }); => là toàn bộ state hiện tại của Redux store
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithForceLogout = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logOut());
    // await persistor.purge();
    window.location.href = "/login";
  }

  return result;
};

const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithForceLogout,
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
      getAuthUser: builder.query({
        query: () => "/auth-user",
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useGetAuthUserQuery,
} = rootApi;

export default rootApi;
