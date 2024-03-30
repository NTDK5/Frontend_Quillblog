
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
});

export const apiSlice = createApi({
  reducerPath: "api one",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

export const blogApi = createApi({
  reducerPath: "api two",
  baseQuery,
  tagTypes: ["blog"],
  endpoints: (builder) => ({}),
});
 
// const { reducer: apiReducer } = apiSlice;
// const { reducer: blogApiReducer } = blogApi;