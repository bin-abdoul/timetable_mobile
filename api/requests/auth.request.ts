import { api } from "./api";

interface User {
  _id: string;
  firstName: string;
  surName: string;
  email: string;
  phoneNumber: string;
  role: 'Admin' | 'User' | 'Moderator';
  gender: string;
  address: string;
  dob: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<unknown, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation<
      unknown,
      {
        email: string;
        password: string;
        firstName: string;
        surName: string;
        phoneNumber: string;
        address: string;
        gender: string;
        dob: string;
        role: string;
      }
    >({
      query: (credentials) => ({
        url: "/auth/create-account",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  })
});

export const { useLoginMutation, useSignupMutation} = authApi;
