import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["User"],
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["User"],
    }),
  }),
});

// export const {  } = authApi;
// export const { useLoginMutation, useSignupMutation } = authApi;
