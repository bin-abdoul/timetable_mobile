import { createApi } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
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
  endpoints: (builder) => ({
    index: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});
