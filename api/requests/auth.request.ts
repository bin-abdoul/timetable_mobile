import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<unknown, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["User"],
    }),
    signup: builder.mutation<
      unknown,
      {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string;
        address: string;
        gender: string;
        birthdate: string;
      }
    >({
      query: (credentials) => ({
        url: "/auth/create-account",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
