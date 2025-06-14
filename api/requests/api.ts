import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: config?.apiUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});