import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const backendUrl = "http://localhost:3000"; // Change this to your backend URL if needed

const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  prepareHeaders: async (headers, { getState }) => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Subject"],
  endpoints: (builder) => ({
    index: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});
