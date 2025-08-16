import { login, logOut } from "@redux/slices/authSlice";
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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Nếu accessToken hết hạn
  if (
    result?.error?.status === 401
    //  && result?.data?.message === "Token has expired."
  ) {
    const refreshToken = api.getState().auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult?.data?.accessToken) {
        // Cập nhật lại Redux store
        api.dispatch(
          login({
            accessToken: refreshResult.data.accessToken,
            refreshToken,
          }),
        );

        // Retry request ban đầu với accessToken mới
        result = await baseQuery(args, api, extraOptions);
      } else {
        // RefreshToken cũng fail → logout
        api.dispatch(logOut());
        window.location.href = "/login";
        return refreshResult;
      }
    } else {
      api.dispatch(logOut());
      window.location.href = "/login";
    }
  }

  return result;
};

const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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
      refreshToken: builder.mutation({
        query: (refreshToken) => {
          return {
            url: "/refresh-token",
            method: "POST",
            body: { refreshToken },
          };
        },
      }),
      getAuthUser: builder.query({
        query: () => "/auth-user",
      }),
      createPost: builder.mutation({
        query: (formData) => {
          return {
            url: "/posts",
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: ["Posts"], // sau khi thêm Post làm mới danh sách
      }),
      getPosts: builder.query({
        query: ({ limit, offset } = {}) => {
          return {
            url: "/posts",
            // method: "GET"
            params: { limit, offset },
          };
        },
        providesTags: ["Posts"], // Gán nhãn "Posts" để nhớ danh sách
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useRefreshTokenMutation,
  useGetAuthUserQuery,
  useCreatePostMutation,
  useGetPostsQuery,
} = rootApi;

export default rootApi;
