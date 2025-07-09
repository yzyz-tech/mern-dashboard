import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Products"],
  endpoints: (build) => ({
    // 定义get请求，构建查询
    getUser: build.query({
      // 获取用户信息的 API
      query: (id) => `general/user/${id}`, // 接收用户ID，拼接成完整的接口路径
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetUserQuery, // 自动生成的hook
  useGetProductsQuery,
} = api;
