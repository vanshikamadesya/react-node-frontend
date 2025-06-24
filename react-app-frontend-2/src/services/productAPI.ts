import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { CreateProductData } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/product/getProducts',
      providesTags: ['Product'],
    }),
    searchProducts: builder.query({
      query: (params) => {
        const query = new URLSearchParams();
        if (params.search) query.set("search", params.search);
        if (params.minPrice !== undefined) query.set("minPrice", String(params.minPrice));
        if (params.maxPrice !== undefined) query.set("maxPrice", String(params.maxPrice));
        if (params.category) query.set("category", params.category);
        if (params.stock) query.set("stock", params.stock);
    
        return `/product/filterProducts?${query.toString()}`;
      },
      providesTags: ['Product'],
    }),
    
    getProductsByUserId: builder.query({
      query: (userId: string) => `/product/getProducts/${userId}`,
    }),
    getSingleProduct: builder.query({
      query: (id: string) => `/product/getProduct/${id}`,
    }),
    createProduct: builder.mutation({
      query: ({ userId, data }: { userId: string; data: FormData }) => ({
        url: `/product/createProduct/${userId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/product/editProduct/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/deleteProduct/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'], 
    }),
    
  }),
});

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductsByUserIdQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;