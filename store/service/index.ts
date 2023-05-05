import { axiosBaseQuery } from "@/utilities/common/axios-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

const tagTypes = {
  products: "Products",
} as const;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: Array.from(Object.values(tagTypes)),
  endpoints: () => ({}),
});
